/**
 * Jalali ⇄ Gregorian conversion, based on the well-known jalaali algorithm
 * (jalaali-js, MIT). The profile API speaks Gregorian ISO dates on the wire
 * (birthDate: "yyyy-MM-dd") while the date picker is Jalali — this is the bridge.
 *
 * Reference vectors (Jalali ↔ Gregorian):
 *   1375/1/1  ↔ 1996/3/20 · 1400/1/1 ↔ 2021/3/21 · 1403/1/1 ↔ 2024/3/20
 */

const div = (a: number, b: number) => ~~(a / b);
const mod = (a: number, b: number) => a - ~~(a / b) * b;

function jalCal(jy: number) {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262,
    2324, 2394, 2456, 3178,
  ];
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  let jm = 0;
  let jump = 0;
  for (let i = 1; i < bl; i++) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  let n = jy - jp;
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  let leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;
  return { leap, gy, march };
}

function g2d(gy: number, gm: number, gd: number) {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn: number) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

function j2d(jy: number, jm: number, jd: number) {
  const r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn: number) {
  const gy = d2g(jdn).gy;
  let jy = gy - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gy, 3, r.march);
  let jd: number;
  let jm: number;
  let k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return { jy, jm, jd };
    }
    k -= 186;
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return { jy, jm, jd };
}

/** Jalali date → Gregorian { year, month, day }. */
export function jalaliToGregorian(jy: number, jm: number, jd: number) {
  return d2g(j2d(jy, jm, jd));
}

/** Gregorian date → Jalali { year, month, day }. */
export function gregorianToJalali(gy: number, gm: number, gd: number) {
  return d2j(g2d(gy, gm, gd));
}

/** "1996-03-20" → { jy, jm, jd }. */
export function parseGregorianIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return gregorianToJalali(y, m, d);
}

/** { jy, jm, jd } → "1996-03-20" (the profile API's wire format). */
export function toGregorianIso(jy: number, jm: number, jd: number) {
  const { gy, gm, gd } = jalaliToGregorian(jy, jm, jd);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${gy}-${pad(gm)}-${pad(gd)}`;
}

export const JALALI_MONTH_NAMES = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

/** Jalali month index (1-12) for a Persian month name like «فروردین». */
export function jalaliMonthIndex(monthName: string) {
  return JALALI_MONTH_NAMES.indexOf(monthName) + 1;
}

/** ISO-8601 UTC timestamp → { jy, jm, jd, monthName }, for «۲۰ تیر ۱۴۰۴» labels. */
export function jalaliPartsFromIso(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const { jy, jm, jd } = gregorianToJalali(y, m, d);
  return { jy, jm, jd, monthName: JALALI_MONTH_NAMES[jm - 1] };
}

/** Whether a Jalali year is a leap year (esfand has 30 days). */
export function isJalaliLeapYear(jy: number) {
  return jalCal(jy).leap === 1;
}

/** Length of a Jalali month (months 1-6: 31, 7-11: 30, esfand: 29/30). */
export function jalaliMonthLength(jy: number, jm: number) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isJalaliLeapYear(jy) ? 30 : 29;
}

/**
 * Clamps a picked day into the month's real length — the picker offers days 1-31 for
 * every month, but some months are shorter.
 */
export function clampJalaliDay(jy: number, jm: number, jd: number) {
  return Math.min(jd, jalaliMonthLength(jy, jm));
}
