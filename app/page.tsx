"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import RightCycle from "@/public/backgroud/landing-cycle/right.png";
import MiddleCycle from "@/public/backgroud/landing-cycle/middle.png";
import LeftCycle from "@/public/backgroud/landing-cycle/left.png";

export default function Home() {
  const images = [
    { src: LeftCycle, alt: "left" },
    { src: MiddleCycle, alt: "middle" },
    { src: RightCycle, alt: "right" },
  ];

  return (
    <div className="min-h-screen relative">
      <Header />

      <main className="pt-36 px-5 w-full mx-auto">
        <div className="flex flex-col text-center items-center">
          <p className="font-vazirmatn font-bold text-[40px] leading-[60px]">
            با ما مربیت
          </p>
          <p className="font-vazirmatn text-primary-300 font-bold text-[40px] leading-[60px]">
            همیشه
          </p>
          <p className="font-vazirmatn font-bold text-[40px] leading-[60px]">
            کنارته!
          </p>

          <p className="mt-4 font-vazirmatn font-bold w-[343px] text-[24px] leading-[38px] text-center px-4">
            به راحتی مربیت رو پیدا کن، برنامه بگیر، تغییراتت رو ببین و پیشرفت کن.
          </p>
        </div>

        <div className="mt-60 mb-32 flex items-center justify-center">
          <Button variant="primary" size="cta" arrow="left">
            دریافت برنامه
          </Button>
        </div>

        <div className="flex flex-col">
          <div className="w-full flex justify-center">
            <p className="text-neutral-darker pt-5 font-bold text-[18px] text-center rounded">
              از برنامه تا فرم حرکات کنارتیم
            </p>
          </div>

          <div className="mt-12 mb-28">
            <Carousel images={images} />
          </div>
        </div>
      </main>
    </div>
  );
}
