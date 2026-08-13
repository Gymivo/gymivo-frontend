# 05 — Code Conventions & Tailwind Mapping

**بر اساس کد موجود در `gymivo-frontend` (مرور شده در 2026-08-06)**

---

## 1. Stack فعلی

| لایه | تکنولوژی |
|------|----------|
| Framework | Next.js 16 (App Router) |
| زبان | TypeScript |
| استایل | Tailwind CSS 3.4 + PostCSS |
| UI Library | MUI v7 (Material UI) + MUI Icons |
| انیمیشن | framer-motion |
| Charts | react-circular-progressbar |
| Picker | react-multi-date-picker (تقویم شمسی) |
| Slider | swiper |

---

## 2. نگاشت توکن‌ها به Tailwind

### وضعیت فعلی `tailwind.config.js`

```js
colors: {
  primary: {
    0: "#FDFFF0", 100: "#F9FFC5", 200: "#F4FF9A",
    300: "#ECFB6D", 400: "#D0DE59", 500: "#B4C147",
    600: "#98A437", 700: "#7D8629", 800: "#61691D",
    900: "#464C12",
  },
  neutral: {
    white: "#FFFFFF", ligher: "#E0E0E0", light: "#D5D5D5",
    gray: "#949494", dark: "#6E6E6E", darker: "#212121",
  },
}
```

### استفاده در کلاس‌ها

| توکن دیزاین | کلاس Tailwind |
|-------------|---------------|
| زرد اصلی | `bg-primary-300` |
| زرد روشن (hover) | `bg-primary-200` |
| مشکی | `bg-neutral-darker` / `text-neutral-darker` |
| خاکستری تیره | `text-neutral-dark` |
| خاکستری میانی | `text-neutral-gray` |
| خاکستری روشن | `bg-neutral-light` |
| پس‌زمینه روشن | `bg-neutral-ligher` |

> **غلط املایی موجود:** `ligher` به‌جای `lighter`. فعلاً به همین شکل استفاده می‌شود — اگر تصحیح می‌کنی، همه ارجاع‌ها را همزمان تغییر بده.

---

## 3. مشکلات شناخته‌شده در کد موجود (باید اصلاح شوند)

### 3.1 ناسازگاری neutral
کد از **دو سیستم neutral** مخلوط استفاده می‌کند:
- `neutral-gray` / `neutral-dark` (سفارشی — درست)
- `neutral-500` / `neutral-50` / `neutral-100` (پیش‌فرض Tailwind — نادرست)

**مثال از کد:** `SearchBox.tsx` از `bg-neutral-50`, `text-neutral-700`, `text-neutral-400` استفاده می‌کند که در config تعریف نشده‌اند (به پالت پیش‌فرض Tailwind fallback می‌شوند).

**راه‌حل:** همه را به توکن‌های سفارشی `neutral-*` تبدیل کن.

### 3.2 رنگ‌های سمانتیک تعریف نشده‌اند
`success`, `error`, `warning`, `info` در tailwind.config نیستند. اضافه کن:

```js
success: { DEFAULT: "#4CAF50", light: "#81C784", dark: "#388E3C" },
warning: { DEFAULT: "#FF9800", light: "#FFB74D", dark: "#F57C00" },
error:   { DEFAULT: "#F44336", light: "#E57373", dark: "#D32F2F" },
info:    { DEFAULT: "#2196F3", light: "#64B5F6", dark: "#1976D2" },
```

### 3.3 فونت فقط وزن ۴۰۰
`globals.css` فقط `Vazirmatn-Regular` را لود می‌کند. برای وزن‌های ۵۰۰-۹۰۰ باید فایل‌ها اضافه شود:

```css
@font-face {
  font-family: "Vazirmatn";
  src: url("/fonts/Vazirmatn-Bold.woff2") format("woff2");
  font-weight: 700;
}
```

یا از فایل variable font (اگر موجود) استفاده کن.

### 3.4 عرض موبایل ناسازگار
- `layout.tsx`: `max-w-[390px]`
- برخی صفحات (language، edit profile): `max-w-[450px]`

**راه‌حل:** یکدست کن. پیشنهاد `390px` استاندارد موبایل.

---

## 4. الگوهای کد استاندارد (از کد موجود)

### 4.1 ساختار صفحه (داخل اپ)

```tsx
"use client";

import { useRouter } from "next/navigation";
import DashboardFooter from "@/components/DashboardFooter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SomePage() {
  const router = useRouter();

  return (
    <div className="relative bg-gradient-to-b from-neutral-200 to-gray-100 ... max-w-[450px]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-black/10 transition">
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>
        <h1 className="text-lg font-bold text-neutral-darker">عنوان صفحه</h1>
        <div className="w-10" />
      </header>

      <main className="px-4 pb-24">
        {/* محتوا */}
      </main>

      <DashboardFooter />
    </div>
  );
}
```

### 4.2 Header استاندارد (back + title + action)
سه ستون: دکمه back | عنوان وسط | spacer یا دکمه action

### 4.3 فیلد فرم RTL

```tsx
<TextField
  fullWidth
  sx={{
    direction: "rtl",
    "& .MuiOutlinedInput-root": {
      flexDirection: "row-reverse",
      borderRadius: "14px",
      backgroundColor: "white",
    },
    "& .MuiInputBase-input": { textAlign: "right", px: 1.5, py: 1.5 },
  }}
/>
```

---

## 5. ساختار فایل‌ها

```
app/
  layout.tsx          ← ریشه (lang=fa dir=rtl)
  globals.css         ← تیلویند + فونت
  page.tsx            ← لندینگ
  welcome/            ← ورود/ثبت‌نام
  dashboard/          ← داشبورد + زیرصفحات
    profile/
    language/
    faq/
    ...
  plans/              ← برنامه‌ها (در حال توسعه)
  coach/              ← مربی
  analyse/            ← تحلیل

components/
  Button.tsx          ← دکمه reusable
  Header.tsx          ← هدر لندینگ
  Footer.tsx          ← فوتر لندینگ
  DashboardFooter.tsx ← ناوبری پایین اپ
  SearchBox.tsx       ← سرچ
  Carousel.tsx        ← اسلایدر

public/
  fonts/              ← Vazirmatn
  svg/                ← آیکون‌ها (دکمه، هدر، فوتر، پروفایل)
  dashboard/          ← تصاویر داشبورد
  landing/            ← تصاویر لندینگ
```

---

## 6. قواعد نام‌گذاری

- **کامپوننت:** PascalCase — `DashboardFooter`, `SearchBox`
- **صفحه:** PascalCase — `DashboardPage`, `ProfilePage`
- **فایل:** مطابق کامپوننت — `page.tsx` در هر دایرکتوری route
- **کلاس Tailwind:** kebab-case
- **توکن رنگ:** `primary-300`, `neutral-darker`

---

## 7. کامیت مسیج

```bash
[feat] ساخت صفحه زبان
[fix] اصلاح ناسازگاری neutral-500
[design] اعمال دیزاین کارت برنامه آماده
[refactor] یکدست‌سازی توکن‌های رنگی
```
