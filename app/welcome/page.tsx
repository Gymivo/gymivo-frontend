"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import WelcomeArt from "@/public/welcome/welcome.svg";

export default function WelcomePage() {
  return (
    <div className="relative h-dvh max-w-[500px] mx-auto overflow-hidden bg-white flex flex-col">
      
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-[35%]"
        style={{
          background:
            "linear-gradient(180deg, #ECFB6D 30%, rgba(236,251,109,0) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[28%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(148,148,148,0.03) 30%, rgba(148,148,148,0.8) 100%)",
        }}
      />

      <main className="relative z-10 flex-1 px-5 pt-[clamp(24px,6vh,60px)] pb-10 flex flex-col justify-between min-h-0">

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-3xl font-bold text-neutral-darker">
            به جیمیوو خوش اومدی
          </h1>

          <Image
            src={WelcomeArt}
            alt="welcome"
            priority
            className="object-contain"
            width={120}
            height={120}
          />

          <p className="text-center text-base leading-7 text-neutral-darker px-2">
            سفری که قراره شروع کنی، فقط یه لاگین ساده نیست؛ اولین قدم برای نظم،
            سلامتی و رسیدن به هدفه. چه مربی باشی، چه ورزشکار، اینجا قراره حرفه‌ای‌تر
            ادامه بدی. چند ثانیه تا ورودت فرصته؛ منتظرتیم.
          </p>
        </div>

        <div className="flex flex-col items-center pt-4 gap-3 w-full">

          <Link href="/welcome/login" className="w-full flex justify-center">
            <Button variant="black" size="cta">
              ورود
            </Button>
          </Link>

          <Link href="/welcome/signup" className="w-full flex justify-center">
            <Button variant="primary" size="cta">
              ثبت‌نام
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
