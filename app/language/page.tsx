"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import DashboardFooter from "@/components/DashboardFooter";

type Language = {
  code: string;
  label: string;
  nativeLabel: string;
  available: boolean;
};

const languages: Language[] = [
  { code: "fa", label: "فارسی", nativeLabel: "Persian", available: true },
  { code: "en", label: "English", nativeLabel: "English", available: false },
  { code: "ar", label: "العربية", nativeLabel: "Arabic", available: false },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selected, setSelected] = useState("fa");

  return (
    <div>
      <header className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>

        <h1 className="text-lg font-bold text-neutral-darker">زبان</h1>

        <div className="w-10" />
      </header>

      <main className="px-4 pb-24">
        <div className="flex flex-col gap-2 mt-4">
          {languages.map((lang) => {
            const isSelected = selected === lang.code;

            return (
              <button
                key={lang.code}
                onClick={() => lang.available && setSelected(lang.code)}
                disabled={!lang.available}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-4 rounded-2xl transition-all duration-200
                  ${
                    isSelected
                      ? "bg-white border-2 border-primary-300 shadow-sm"
                      : "bg-white border-2 border-transparent hover:bg-neutral-50"
                  }
                  ${!lang.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-[0.98]"}
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${isSelected ? "border-primary-300 bg-primary-300" : "border-neutral-300"}
                    `}
                  >
                    {isSelected && (
                      <CheckIcon style={{ fontSize: 16, color: "black" }} />
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-base font-bold text-neutral-darker">
                      {lang.label}
                    </span>
                    <span className="text-xs text-neutral-dark">
                      {lang.nativeLabel}
                    </span>
                  </div>
                </div>

                {!lang.available && (
                  <span className="text-[10px] font-bold text-neutral-gray bg-neutral-ligher px-2 py-1 rounded-full">
                    به‌زودی
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 px-2">
          <p className="text-sm text-neutral-dark leading-6 text-center">
            فعلاً زبان‌های زیادی رو ساپورت نمی‌کنیم.
            <br />
            به‌مرور زبان‌های بیشتری اضافه خواهد شد.
          </p>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
