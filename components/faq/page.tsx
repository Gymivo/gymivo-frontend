"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import Image from "next/image";
import Faq from "@/public/svg/profile/faq/Frame 203.svg";

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
    <main className="px-4 py-20 flex flex-col items-center">
      <div className="w-full flex justify-center mb-4">
        <Image
          src={Faq}
          alt="FAQ Illustration"
          width={350}
          height={160}
          className="object-contain"
          priority
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="w-full flex flex-col">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl text-right"
              >
                <div className="flex items-center gap-3 flex-1">
                  <ChatBubbleOutlineIcon
                    className="text-neutral-gray flex-shrink-0"
                    fontSize="small"
                  />
                  <span className="text-sm font-bold text-neutral-darker leading-6">
                    {item.q}
                  </span>
                </div>

                <div
                  className={`
                      w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200
                      ${isOpen ? "bg-[#FDD0D2]" : "bg-[#DEF7EA]"}
                    `}
                >
                  {isOpen ? (
                    <RemoveIcon
                      className="text-neutral-darker"
                      fontSize="small"
                    />
                  ) : (
                    <AddIcon className="text-neutral-darker" fontSize="small" />
                  )}
                </div>
              </button>

              <div
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"}
                  `}
              >
                <div className="bg-white rounded-2xl px-10 py-3 text-sm text-neutral-dark leading-7">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-[#EAF5FF] rounded-3xl p-5 mt-5 flex flex-col items-center justify-center text-center gap-3">
        <p className="text-base font-bold text-neutral-darker">
          پاسخ سوالتون رو پیدا نکردید ؟
        </p>

        <button
          onClick={() => router.push("/contact")}
          className="bg-[#2F98F5] text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2582d6] active:scale-95 transition"
        >
          <TelegramIcon fontSize="small" />
          <span>ارتباط با ما</span>
        </button>
      </div>
    </main>
  );
}
