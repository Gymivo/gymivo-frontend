# Gymivo — Frontend Handoff Pack

این بسته شامل راهنمای کامل دیزاین، برندینگ و استانداردهای پیاده‌سازی برای تیم فرانت‌اند است.

**مخاطب:** علی شیخ‌بهایی (Frontend Developer)
**نسخه:** v1.0
**تاریخ:** 2026-08-06
**وضعیت:** آماده ادغام در ریپو

---

## 📂 فایل‌های این بسته

| فایل | محتوا | اهمیت |
|------|-------|-------|
| [`01-design-system.md`](01-design-system.md) | دیزاین‌سیستم کامل: رنگ‌ها، تایپوگرافی، اسپیسینگ، ریدیس، سایه، breakpoints | ⭐⭐⭐ حیاتی |
| [`02-brand-voice.md`](02-brand-voice.md) | لحن برند، اصول کپی‌رایتینگ فارسی، الگوهای پیام (خطا/موفقیت/خالی) | ⭐⭐⭐ حیاتی |
| [`03-component-guide.md`](03-component-guide.md) | مشخصات کامپوننت‌ها: دکمه، فرم، کارت، ناوبری + ریپل افکت | ⭐⭐ مهم |
| [`04-accessibility.md`](04-accessibility.md) | WCAG AA، RTL، کنتراست، کیبورد، اسکرین‌ریدر | ⭐⭐ مهم |
| [`05-code-conventions.md`](05-code-conventions.md) | ساختار Tailwind، نگاشت توکن‌ها، الگوهای کد موجود، نکات فنی | ⭐⭐⭐ حیاتی |
| [`06-ready-program-card.md`](06-ready-program-card.md) | اسپک کامل کارت برنامه‌های آماده + پرامپت‌های کاور | ⭐⭐ مهم |

---

## 🚀 شروع سریع

**توصیه‌شده:** از ترتیب زیر بخوان:

1. `01-design-system.md` — پایه رنگ و تایپوگرافی
2. `05-code-conventions.md` — چطور توکن‌ها را در Tailwind نگاشت کنم
3. `02-brand-voice.md` — لحن و متن فارسی
4. `03-component-guide.md` — کامپوننت‌های استاندارد
5. `04-accessibility.md` — قواعد دسترسی‌پذیری
6. `06-ready-program-card.md` — کارت برنامه‌های آماده (تسک فعلی)

---

## 🔗 منابع اصلی

- **Brand Bible:** `bussiness/Gymivo_Brand_Bible_v1.html`
- **دیزاین‌سیستم:** `bussiness/Branding_UX_UI_Data.html`
- **اسپک فیگما:** `docs/design/figma-design-system-spec.md`
- **PRD کامل:** `tasks/PRD-MVP.html`

---

## ⚠️ نکات مهم (خلاصه)

1. **فقط وزن ۴۰۰ فونت Vazirmatn لود شده** — برای عنوان‌ها وزن ۷۰۰ نیاز است. فایل‌های weight مختلف را اضافه کن.
2. **رنگ‌های سمانتیک (success/warning/error/info) در tailwind.config تعریف نشده‌اند** — باید اضافه شوند.
3. **ناسازگاری نام‌گذاری neutral** — کد موجود از `neutral-500` (پالت پیش‌فرض Tailwind) و `neutral-gray` (پالت سفارشی) به‌طور مخلوط استفاده می‌کند. باید یکدست شود.
4. **RTL** — از CSS logical properties استفاده کن، نه `left`/`right`.
5. **اعداد فارسی** — همه اعداد کاربر-محور فارسی (۴ نه 4).
