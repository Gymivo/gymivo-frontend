# 04 — Accessibility (WCAG AA)

**استاندارد:** WCAG 2.1 سطح AA

---

## 1. کنتراست رنگ (حداقل 4.5:1)

### ترکیب‌های تست‌شده

| زمینه | متن | کنتراست | وضعیت |
|-------|-----|---------|-------|
| زرد `#ECFB6D` | مشکی `#212121` | 8.9:1 | ✅ PASS |
| مشکی `#212121` | زرد `#ECFB6D` | 8.9:1 | ✅ PASS |
| سفید `#FFFFFF` | مشکی `#212121` | 15.8:1 | ✅ PASS |
| مشکی `#212121` | سفید `#FFFFFF` | 15.8:1 | ✅ PASS |

> ⚠️ **احتیاط:** زرد روشن `#ECFB6D` روی سفید `#FFFFFF` کنتراست کافی **ندارد**. متن روی زرد باید حتماً مشکی باشد، نه سفید.

---

## 2. RTL (راست‌به‌چپ)

### قواعد کلیدی

1. **از CSS Logical Properties استفاده کن، نه left/right:**
```css
/* ✅ درست */
margin-inline-start: 16px;
padding-inline-end: 8px;

/* ❌ غلط (در RTL خراب می‌شود) */
margin-left: 16px;
padding-right: 8px;
```

2. **آیکون‌ها سمت راست متن قرار می‌گیرند** (برعکس LTR)

3. **فلش‌ها آینه می‌شوند:** فلش «بازگشت» در RTL به سمت راست اشاره می‌کند

4. **جهت اعداد لاتین:** برای `@username`، شماره تلفن و کد از `dir="ltr"` استفاده کن

5. **Flexbox:** از `flexDirection: "row-reverse"` برای چیدمان افقی RTL استفاده کن

---

## 3. کیبورد ناوبری

- همه عناصر تعاملی باید فوکوس قابل مشاهده داشته باشند
- ترتیب Tab باید منطقی باشد (راست به چپ در RTL)
- `:focus-visible` برای نمایش حلقه فوکوس
- مودال‌ها باید Escape و focus trap داشته باشند

---

## 4. اسکرین‌ریدر

- از کلاس `.sr-only` برای متن مخفی از دید اما قابل خواندن:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- `alt` معنادار برای همه تصاویر
- `aria-label` برای دکمه‌های آیکون-فقط
- `role` و `aria-expanded` برای accordion (مثل FAQ)

---

## 5. ساختار معنایی HTML

- از تگ‌های `<header>`, `<main>`, `<nav>`, `<footer>` استفاده کن
- سلسله‌مراتب صحیح heading (h1 → h2 → h3)
- فرم‌ها: `<label>` مرتبط با input

---

## 6. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

> همه انیمیشن‌ها (ripple، slide، fade) باید این را رعایت کنند.

---

## 7. چک‌لیست نهایی

- [ ] کنتراست ≥ 4.5:1
- [ ] RTL با logical properties
- [ ] فوکوس کیبورد قابل مشاهده
- [ ] `alt` / `aria-label` کامل
- [ ] `prefers-reduced-motion` پشتیبانی
- [ ] ساختار معنایی HTML
- [ ] تاچ‌تارگت حداقل 44×44px
