"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";

import RightCycle from "@/public/landing/landing-cycle/right.png";
import MiddleCycle from "@/public/landing/landing-cycle/middle.png";
import LeftCycle from "@/public/landing/landing-cycle/left.png";
import TalkSvg from "@/public/landing/landing-svg/talk.svg";
import AnalysisSvg from "@/public/landing/landing-svg/analysis.svg";
import Workout1Icon from "@/public/landing/landing-pic/workout1.jpg";
import Workout2Icon from "@/public/landing/landing-pic/workout2.jpg";


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
          <p className="font-bold text-[40px]">با ما مربیت</p>
          <p className="text-primary-300 font-bold text-[40px]">همیشه</p>
          <p className="font-bold text-[40px]">کنارته!</p>

          <p className="mt-4 font-bold w-[343px] text-[24px] text-center px-4">
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

          <div className="mt-12 mb-10">
            <Carousel images={images} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-2 mb-10">
          <div className="flex flex-col text-right max-w-[220px]">
            <p className="font-bold text-[18px] text-neutral-darker">
              نگران انگیزت نباش!
            </p>

            <p className="mt-3 text-[14px] text-neutral-darker">
              با سیستم پیامکی حواسمون بهت هست و کمکت میکنیم تا بتونی با قدرت توی
              مسیرت بمونی
            </p>
          </div>

          <div>
            <Image
              src={TalkSvg}
              alt="motivation illustration"
              className="w-[150px] h-auto"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-2 mb-10">
          <div className="relative w-[163px] h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src={Workout1Icon}
              alt="Workout 1"
              className="w-full h-full object-cover"
            />

            <div className="
                absolute
                left-1/2 -translate-x-1/2
                bottom-1
                w-[155px] h-[69px]
                bg-white/50
                backdrop-blur-[6px]
                rounded-[8px]
                flex flex-col justify-center
                text-right
              ">
              <p className="
                font-bold text-[14px]
                text-neutral-darker rounded px-1
              ">
                برنامت تو جیبته
              </p>

              <p className="
                font-light text-[12px] mt-1
                text-neutral-darker rounded px-1
              ">
                در سریع ترین حالت ممکن برنامه تمرینیت رو از مربیت بگیر
              </p>
            </div>
          </div>

          <div className="relative w-[163px] h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src={Workout2Icon}
              alt="Workout 2"
              className="w-full h-full object-cover"
            />

            <div className="
                absolute
                left-1/2 -translate-x-1/2
                bottom-1
                w-[155px] h-[69px]
                bg-white/50
                backdrop-blur-[6px]
                rounded-[8px]
                flex flex-col justify-center
                text-right
              ">
              <p className="
                font-bold text-[14px]
                text-neutral-darker rounded px-1
              ">
                برنامت تو جیبته
              </p>

              <p className="
                font-light text-[12px] mt-1
                text-neutral-darker rounded px-1
              ">
                در سریع ترین حالت ممکن برنامه تمرینیت رو از مربیت بگیر
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[343px] h-[109px] bg-neutral-ligher rounded-[12px] flex items-center justify-between px-4 py-2 mb-10 mx-auto">
          <div className="flex flex-col text-right max-w-[220px]">
            <p className="font-bold text-[18px] text-neutral-darker">
              پیشرفتتو ببین
            </p>

            <p className="mt-3 text-[13px] text-neutral-darker">
              هر قدمت ثبت می‌شه؛ خیلی راحت اهداف و تغییراتت رو دنبال کن
            </p>
          </div>

          <Image
            src={AnalysisSvg}
            alt="analysis illustration"
            className="w-[150px] h-auto"
          />
        </div>

        <div className="flex items-center justify-center gap-6 px-2 mb-10">
          <div className="relative w-[163px] h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src={Workout1Icon}
              alt="Workout 1"
              className="w-full h-full object-cover"
            />

            <div className="
                absolute
                left-1/2 -translate-x-1/2
                bottom-1
                w-[155px] h-[69px]
                bg-white/50
                backdrop-blur-[6px]
                rounded-[8px]
                flex flex-col justify-center
                text-right
              ">
              <p className="
                font-bold text-[14px]
                text-neutral-darker rounded px-1
              ">
                برنامت تو جیبته
              </p>

              <p className="
                font-light text-[12px] mt-1
                text-neutral-darker rounded px-1
              ">
                در سریع ترین حالت ممکن برنامه تمرینیت رو از مربیت بگیر
              </p>
            </div>
          </div>

          <div className="relative w-[163px] h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src={Workout2Icon}
              alt="Workout 2"
              className="w-full h-full object-cover"
            />

            <div className="
                absolute
                left-1/2 -translate-x-1/2
                bottom-1
                w-[155px] h-[69px]
                bg-white/50
                backdrop-blur-[6px]
                rounded-[8px]
                flex flex-col justify-center
                text-right
              ">
              <p className="
                font-bold text-[14px]
                text-neutral-darker rounded px-1
              ">
                برنامت تو جیبته
              </p>

              <p className="
                font-light text-[12px] mt-1
                text-neutral-darker rounded px-1
              ">
                در سریع ترین حالت ممکن برنامه تمرینیت رو از مربیت بگیر
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
