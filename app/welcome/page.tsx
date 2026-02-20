import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import WelcomeArt from "@/public/welcome/welcome.svg";

export default function WelcomePage() {
  return (
    <div className="relative h-[100dvh] max-w-[500px] m-auto overflow-hidden bg-white">
      <div className="pointer-events-none absolute top-0 left-0 w-full h-[40dvh] z-0"
        style={{
          background:
            "linear-gradient(194.75deg, #ECFB6D 10.24%, rgba(236, 251, 109, 0) 107.84%)",
        }}
      />

      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[25dvh] z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(148, 148, 148, 0) 16.83%, rgba(148, 148, 148, 0.7) 100%)",
        }}
      />

      <main className="relative z-10 h-full px-5 py-8 flex flex-col">
        <div className="flex-1 flex flex-col gap-5 items-center justify-center min-h-0">
          <h1 className="text-center mb-12 text-3xl font-bold text-neutral-darker">
            به جیمیوو خوش اومدی
          </h1>
          <Image
            src={WelcomeArt}
            alt="welcome"
            priority
            className="w-auto max-h-[38dvh] object-contain"
          />

          <p className="mt-5 text-center text-base leading-7 text-neutral-darker">
            سفری که قراره شروع کنی، فقط یه لاگین ساده نیست؛ اولین قدم برای نظم،
            سلامتی و رسیدن به هدفه. چه مربی باشی، چه ورزشکار، اینجا قراره حرفه‌ای‌تر
            ادامه بدی. چند ثانیه تا ورودت فرصته؛ منتظرتیم.
          </p>
        </div>

        <div className="mt-auto p-5 flex flex-col justify-center items-center self-center gap-3">
          <Link href="/welcome/login" className="w-full">
            <Button variant="black" size="cta">
              ورود
            </Button>
          </Link>

          <Link href="/welcome/signup" className="w-full">
            <Button variant="primary" size="cta">
              ثبت‌نام
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
