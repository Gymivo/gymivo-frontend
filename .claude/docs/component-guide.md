# 03 — Component Guide

**مرجع:** `docs/design/figma-design-system-spec.md` + کد موجود در `components/`

---

## 1. Button System

### واریانت‌ها

| واریانت | پس‌زمینه | متن | کاربرد |
|---------|-----------|------|--------|
| `primary` | `#ECFB6D` | `#212121` | CTA اصلی |
| `black` | `#212121` | `#FFFFFF` | دکمه ثانویه تیره |
| `white` | `#FFFFFF` | `#212121` | دکمه روی زمینه تیره |
| `disabled` | `#D5D5D5` | `#949494` | غیرفعال |

### سایزها (از `components/Button.tsx` موجود)

| سایز | عرض | ارتفاع | فونت |
|------|-----|--------|------|
| `cta` | 220px | 40px | 16px |
| `sm` | 104px | 32px | 12px |
| `md` | 112px | 40px | 14px |
| `lg` | 140px | 48px | 16px |
| `xl` | 148px | 56px | 16px |
| `huge` | 228px | 96px | 20px |

### حالت‌ها
Default → Hover → Active/Pressed → Focus → Disabled → Loading

### Arrow Support
- `arrow="left"` / `arrow="right"` / `arrow="none"`
- در RTL فلش‌ها آینه می‌شوند
- آیکون فلش از `public/svg/button/` لود می‌شود

> ✅ کامپوننت `Button` از قبل ساخته شده و کامل است. استفاده مجدد کن، دوباره نساز.

---

## 2. Form System

### TextField (با MUI)

```tsx
<TextField
  fullWidth
  direction="rtl"
  error={!!errors.field}
  helperText={errors.field}
  sx={{
    direction: "rtl",
    "& .MuiOutlinedInput-root": {
      flexDirection: "row-reverse",
      borderRadius: "14px",
      backgroundColor: "white",
    },
    "& .MuiInputBase-input": {
      textAlign: "right",
      px: 1.5,
      py: 1.5,
    },
  }}
/>
```

**قواعد:**
- همه فیلدها `borderRadius: 14px`
- متن RTL (textAlign: right)
- خطای ولیدیشن: `error` + `helperText` + border قرمز
- `InputAdornment` برای آیکون/واحد (kg, cm)

### انواع فیلد
- Text Input (label، placeholder، helper، error)
- Text Area
- Select/Dropdown (با `MenuItem`)
- Date Picker (تقویم شمسی)
- Search (پست-MVP)

---

## 3. Card System

### کارت استاندارد

| نوع | Radius | سایه |
|-----|--------|------|
| کارت ساده | `--radius-lg` (12px) | سطح 1 |
| کارت hero | `--radius-xl` (16px) | سطح 2 |
| کارت شیشه‌ای | `--radius-md` (8px) | + backdrop-blur |

### کارت برنامه آماده
→ مشخصات کامل در [`06-ready-program-card.md`](06-ready-program-card.md)

---

## 4. Navigation

### Header (صفحه اصلی / landing)
- لوگو وسط، منو hamburger چپ، پروفایل راست
- Glassmorphism مشکی: `bg-black/60 backdrop-blur-[20px]`
- سایدبار تمام‌صفحه با overlay

### Bottom Navigation (داخل اپ)
- کامپوننت `DashboardFooter` از قبل ساخته شده
- ۵ تب: خانه، برنامه‌ها، مربی، تحلیل، پروفایل
- آیتم فعال: `bg-primary-100 text-neutral-darker`
- Glassmorphism: `bg-neutral-darker/70 backdrop-blur-[10px]`

### Sidebar (desktop)
- منوی عمودی با آیکون

---

## 5. Feedback Components

| کامپوننت | کاربرد |
|----------|--------|
| Toast | success / error / warning / info |
| Spinner | inline + تمام‌صفحه |
| Empty state | ایلاستریشن + متن |
| Error state | + دکمه retry |

> Toastها باید از خطای API تولید شوند (hardcode نشوند).

---

## 6. Ripple Effect (انیمیشن دکمه)

الگوی استاندارد از Material Design. نمونه در `Branding_UX_UI_Data.html`:

```javascript
// روی کلیک، یک دایره از نقطه کلیک بزرگ می‌شود
ripple.style.animation = `ripple 600ms linear`;
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
```

> در React می‌توان از `framer-motion` (از قبل در dependencies) استفاده کرد.

---

## 7. Badge System

| نوع | پس‌زمینه | متن |
|-----|-----------|-----|
| جدید | `#ECFB6D` (زرد) | `#212121` |
| پیشنهادی | `#4CAF50` (سبز) | `#FFFFFF` |
| ویژه | `#FF9800` (نارنجی) | `#FFFFFF` |

سایز: `font-size: 12-14px`, `font-weight: 600`, `padding: 4px 16px`, `border-radius: 4px`

---

## 8. کامپوننت‌های موجود در ریپو (استفاده مجدد کن)

| فایل | کاربرد |
|------|--------|
| `components/Button.tsx` | دکمه با واریانت و سایز و فلش |
| `components/Header.tsx` | هدر لندینگ + منو |
| `components/Footer.tsx` | فوتر لندینگ |
| `components/DashboardFooter.tsx` | ناوبری پایین اپ |
| `components/SearchBox.tsx` | سرچ با placeholder متحرک |
| `components/Carousel.tsx` | اسلایدر تصویر |
