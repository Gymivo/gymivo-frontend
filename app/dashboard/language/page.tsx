"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import DashboardFooter from "@/components/DashboardFooter";

type Language = {
  code: string;
  name: string;
  available: boolean;
};

const activeLanguage: Language = {
  code: "fa",
  name: "Farsi",
  available: true,
};

const otherLanguages: Language[] = [
  {
    code: "tr",
    name: "Turkey",
    available: false,
  },
  {
    code: "en",
    name: "English",
    available: false,
  },
  {
    code: "ar",
    name: "Arabic",
    available: false,
  },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selected, setSelected] = useState("fa");

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <CheckIcon style={{ color: "black", fontSize: 24 }} />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-neutral-darker">زبان</h1>
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
          </button>
        </div>
      </header>

      <main className="p-5 py-20">
        <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-bold text-neutral-dark text-right px-1">
              زبان فعال
            </h2>

            <button
              onClick={() => setSelected(activeLanguage.code)}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-neutral-50 border-2 border-primary-300 transition-all text-left"
            >
              <div className="w-6 h-6 rounded-full bg-primary-300 flex items-center justify-center">
                <CheckIcon style={{ fontSize: 16, color: "black" }} />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-neutral-darker">
                  {activeLanguage.name}
                </span>
                <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200"></div>
              </div>
            </button>
          </div>

          <hr className="border-neutral-100" />

          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-bold text-neutral-dark text-right px-1">
              زبان‌ها
            </h2>

            <div className="flex flex-col gap-2">
              {otherLanguages.map((lang) => (
                <div
                  key={lang.code}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-neutral-50/60 opacity-60 text-left"
                >
                  <span className="text-[10px] font-bold text-neutral-dark bg-neutral-200 px-2.5 py-1 rounded-full">
                    به‌زودی
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-neutral-darker">
                      {lang.name}
                    </span>
                    <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
