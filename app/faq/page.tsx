"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardFooter from "@/components/DashboardFooter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";

const faqData = [
  {
    q: "آیا برای استفاده از Gymivo باید ثبت‌نام کنم؟",
    a: "خیر. برای مشاهده بخش‌های عمومی برنامه نیازی به ثبت‌نام ندارید. ثبت‌نام تنها زمانی لازم است که بخواهید برنامه خریداری کنید، برنامه اختصاصی دریافت کنید یا از امکانات ویژه استفاده نمایید.",
  },
  {
    q: "چگونه می‌توانم برنامه تمرینی دریافت کنم؟",
    a: "پس از تکمیل اطلاعات بدنی، می‌توانید برنامه مورد نظر خود را انتخاب و خریداری کنید یا از مربیان حاضر در سیستم برنامه اختصاصی دریافت نمایید.",
  },
  {
    q: "آیا اطلاعات شخصی و بدنی من محفوظ می‌ماند؟",
    a: "بله. تمامی اطلاعات کاربران به‌صورت امن ذخیره شده و تنها برای ارائه خدمات ورزشی مورد استفاده قرار می‌گیرد.",
  },
  {
    q: "آیا استفاده از Gymivo رایگان است؟",
    a: "بخش‌هایی از Gymivo به‌صورت رایگان در دسترس است، اما برخی امکانات پیشرفته و خدمات اختصاصی نیازمند تهیه اشتراک یا خرید برنامه هستند.",
  },
  {
    q: "تحلیل دقیق بدن شامل چه مواردی است؟",
    a: "تحلیل دقیق بدن شامل بررسی شاخص‌های بدنی، ارزیابی وضعیت فعلی و ارائه گزارش‌های تخصصی برای کمک به رسیدن به اهداف ورزشی شما است.",
  },
  {
    q: "آیا در آینده امکانات هوش مصنوعی به Gymivo اضافه خواهد شد؟",
    a: "بله. در نسخه‌های آینده امکانات مبتنی بر هوش مصنوعی برای ارائه پیشنهادهای هوشمند، تحلیل پیشرفته و شخصی‌سازی بیشتر به سیستم اضافه خواهد شد.",
  },
  {
    q: "آیا می‌توانم اطلاعات بدنی خود را بعداً ویرایش کنم؟",
    a: "بله. در هر زمان می‌توانید از بخش «اطلاعات بدنی» اطلاعات خود را به‌روزرسانی کنید.",
  },
];

export default function FAQPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-gradient-to-b from-neutral-200 to-gray-100 top-0 left-0 w-full z-50 m-auto min-h-screen max-w-[450px]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>

        <h1 className="text-lg font-bold text-neutral-darker">
          سوالات متداول
        </h1>

        <div className="w-10" />
      </header>

      <main className="px-4 pb-24">
        {/* Search (disabled — not supported yet) */}
        <div className="mb-6 opacity-50 pointer-events-none">
          <TextField
            fullWidth
            disabled
            placeholder="جستجو در سوالات..."
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
                py: 1.2,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ fontSize: 22, color: "#949494" }} />
                </InputAdornment>
              ),
            }}
          />
          <p className="text-[10px] text-neutral-gray text-center mt-2">
            فعلاً زبان‌های زیادی رو ساپورت نمی‌کنیم پس سرچ هم نداریم
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-neutral-ligher overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-neutral-50/50 transition"
                >
                  <span className="text-sm font-bold text-neutral-darker leading-6 flex-1 ml-3">
                    {item.q}
                  </span>
                  <ExpandMoreIcon
                    style={{
                      fontSize: 20,
                      color: "#6E6E6E",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="px-5 pb-4 pt-1 text-sm text-neutral-dark leading-7 border-t border-neutral-ligher/50">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
