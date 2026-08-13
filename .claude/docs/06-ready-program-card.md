# 06 — Ready Program Card (برنامه‌های آماده)

**مرجع:** `docs/design/ready-program-card-design.md`
**وضعیت:** Approved — برای پیاده‌سازی

---

## 1. چیست؟

برنامه‌های آماده، برنامه‌های تمرینی غیرشخصی‌سازی‌شده هستند که در داشبورد به ورزشکارانی که هنوز مربی اختصاصی ندارند نمایش داده می‌شود. در Phase 1 **static** هستند (از بک‌اند `suggestedPlans` می‌آیند).

---

## 2. ساختار کارت (۶ المان)

```
┌─────────────────────────────────────────┐
│  [مبتدی]                    [♡ ذخیره]   │  ← Badge + Save روی عکس
│                                         │
│     ┌─────────────────────────┐         │
│     │       HERO IMAGE        │         │  ← 16:9, 170px
│     │    (gradient پایین)      │         │
│     └─────────────────────────┘         │
│                                         │
│  برنامه چربی‌سوزی ۴ هفته‌ای             │  ← 18px, Vazirmatn 700
│                                         │
│  🕐 ۴ هفته · ۳x/هفته · ۴۵ دقیقه         │  ← 13px, Vazirmatn 400
│  🏋️ بدون تجهیزات                        │  ← 13px, Vazirmatn 400
│                                         │
│  [کاهش وزن] [قدرتی]                     │  ← pills 10-12px
└─────────────────────────────────────────┘
```

---

## 3. مشخصات دقیق

| المان | سایز | فونت | رنگ |
|-------|------|------|-----|
| کارت عرض | `280px` | — | — |
| کارت ارتفاع | `~340px` | — | — |
| کارت radius | `16px` | — | `--radius-xl` |
| کارت bg | — | — | `rgba(255,255,255,0.7)` + blur(12px) |
| کارت border | — | — | `1px rgba(255,255,255,0.5)` |
| کارت shadow | — | — | `0px 2px 8px rgba(0,0,0,0.06)` |
| عکس ارتفاع | `170px` | — | 16:9 |
| عکس overlay | — | — | مشکی gradient 0%→60% پایین |
| عنوان | 18px | 700 | `#212121` |
| ردیف زمان | 13px | 400 | `#6E6E6E` |
| تجهیزات | 13px | 400 | `#6E6E6E` |
| پدینگ محتوا | `12px` | — | — |
| فاصله عمودی | `8px` | — | — |
| فاصله تگ‌ها | `6px` | — | — |

---

## 4. Badge سطح (Difficulty)

| سطح | فارسی | رنگ BG |
|-----|-------|--------|
| Beginner | مبتدی | `#4CAF50` (سبز) |
| Intermediate | متوسط | `#FF9800` (نارنجی) |
| Advanced | پیشرفته | `#F44336` (قرمز) |

پوزیشن: `top: 10px, right: 10px` (RTL) — absolute روی عکس

---

## 5. تگ‌های هدف (Taxonomy استاندارد)

`کاهش وزن` `افزایش وزن` `قدرتی` `استقامتی` `چربی‌سوزی` `انعطاف‌پذیری` `بدنسازی` `کراسفیت` `HIIT` `ریکاوری`

---

## 6. تجهیزات (Taxonomy استاندارد)

`بدون تجهیزات` `دمبل` `کش` `زیرانداز` `بارفیکس` `کامل (باشگاه)`

> **بدون تجهیزات** با رنگ سبز `#4CAF50` نمایش داده شود (سیگنال مثبت).

---

## 7. دیتای MVP (۳ برنامه اول)

| عنوان | تگ‌ها | سطح | مدت | جلسات/هفته | مدت جلسه | تجهیزات |
|-------|-------|-----|-----|-----------|----------|---------|
| برنامه چربی‌سوزی ۴ هفته‌ای | کاهش وزن, چربی‌سوزی | متوسط | ۴ هفته | ۳x | ۴۵ دقیقه | بدون تجهیزات |
| برنامه قدرت و عضله‌سازی | قدرتی, بدنسازی | مبتدی | ۶ هفته | ۴x | ۶۰ دقیقه | دمبل |
| برنامه تمرین در خانه | استقامتی, کاهش وزن | مبتدی | ۴ هفته | ۳x | ۳۰ دقیقه | بدون تجهیزات |

### شکل API (از BACKEND-01)

```json
{
  "id": "uuid",
  "title": "برنامه چربی‌سوزی",
  "description": "کاهش وزن در ۳۰ روز",
  "imageUrl": "/images/plans/workout1.jpg",
  "tag": "ویژه",
  "level": "beginner"
}
```

> ⚠️ **نکته برای بک‌اند:** مدل فعلی فقط `tag` و `level` دارد ولی برای کارت کامل، این فیلدها هم لازم می‌شود: `durationWeeks`, `sessionsPerWeek`, `sessionLengthMin`, `equipment`, `goals[]`. این را با علی سلیمانی (بک‌اند) هماهنگ کن.

---

## 8. کانتکست نمایش در داشبورد

- **عنوان سکشن:** «برنامه‌های پیشنهادی»
- **چیدمان:** Horizontal scroll carousel
- **تعداد قابل مشاهده:** ۳-۵ کارت
- **تپ:** رفتن به صفحه جزئیات تمرین
- **Loading:** Skeleton card (مستطیل خاکستری پالس‌دار)
- **Empty:** این سکشن همیشه پر است (static در Phase 1)

---

## 9. پرامپت‌های کاور (AI Image Generation)

### Cover #1 — چربی‌سوزی
```
A high-intensity fitness workout scene, side profile of an athletic person performing a dynamic movement with sweat, dramatic lighting from above, dark carbon background (#212121), a subtle neon lime yellow (#ECFB6D) glow accent on the edges, modern minimal cinematic photography style, shallow depth of field, 16:9 aspect ratio, moody and powerful atmosphere, gym environment with fogged glass surfaces reflecting light, professional athletic wear, no text, no logos --ar 16:9 --style raw --v 6
```

### Cover #2 — قدرت و عضله‌سازی
```
Close-up of a person gripping a barbell with chalked hands, intense focus, raw strength aesthetic, dramatic side lighting creating deep shadows, dark carbon tones (#212121) throughout, subtle lime yellow (#ECFB6D) rim light on the knuckles and equipment, frosted glass reflection in the background, cinematic color grading, minimal composition, 16:9 aspect ratio, strong contrast, no text, no logos, hyperrealistic --ar 16:9 --style raw --v 6
```

### Cover #3 — تمرین در خانه
```
A bright modern minimalist home interior, person doing a bodyweight push-up or plank on a yoga mat near a large window with soft natural light, one small accent element in neon lime yellow (#ECFB6D) like a water bottle or resistance band, clean aesthetic, dark charcoal (#212121) floor or wall, warm and inviting but still athletic mood, shallow depth of field, 16:9 aspect ratio, no text, no logos, editorial photography style --ar 16:9 --style raw --v 6
```

> بعد از تولید، یک gradient overlay مشکی از پایین (0% → 60%) در Figma/CSS اضافه کن.

---

## 10. Figma Export Notes

1. کامپوننت: `Card/ReadyProgram`
2. واریانت‌ها: ۳ (هر برنامه) + skeleton
3. لایه عکس: `cover-image` با clip به radius بالا
4. لایه overlay: `image-overlay` مشکی gradient
5. متن‌ها: Auto Layout
6. تگ‌ها: Auto Layout row، wrap در صورت نیاز
7. کل کارت یک frame قابل تپ (نه زیر-دکمه)
