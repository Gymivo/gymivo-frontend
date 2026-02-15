"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";

import RightCycle from "@/public/landing/cycle/right.png";
import LandingBg from "@/public/backgroud/landing.jpg";
import MiddleCycle from "@/public/landing/cycle/middle.png";
import LeftCycle from "@/public/landing/cycle/left.png";
import TalkSvg from "@/public/landing/svg/talk.svg";
import AnalysisSvg from "@/public/landing/svg/analysis.svg";
import Workout1Icon from "@/public/landing/motivate/workout1.jpg";
import Workout2Icon from "@/public/landing/motivate/workout2.jpg";
import Workout3Icon from "@/public/landing/motivate/workout3.jpg";
import Workout4Icon from "@/public/landing/motivate/workout4.jpg";
import CoachchatIcon from "@/public/landing/svg/coachchat.svg";
import DownloadappIcon from "@/public/landing/svg/downloadapp.svg";
import HometrainingIcon from "@/public/landing/svg/hometraining.svg";
import Phone1 from "@/public/landing/svg/phone1.svg";
import Phone2 from "@/public/landing/svg/phone2.svg";
import Step1Image from "@/public/landing/how/step1.svg";
import Step2Image from "@/public/landing/how/step2.svg";
import Step3Image from "@/public/landing/how/step3.svg";
import UserSearch from "@/public/landing/how/user-search.svg";
import PlanIcon from "@/public/landing/how/plan.svg";
import LinkIcon from "@/public/landing/how/link.svg";
import point1 from "@/public/landing/how/point1.svg";
import point2 from "@/public/landing/how/point2.svg";
import point3 from "@/public/landing/how/point3.svg";




export default function Home() {
  const images = [
    { src: LeftCycle, alt: "left" },
    { src: MiddleCycle, alt: "middle" },
    { src: RightCycle, alt: "right" },
  ];

  const logos = [
    { src: CoachchatIcon, alt: "Coach Chat" },
    { src: DownloadappIcon, alt: "Download App" },
    { src: HometrainingIcon, alt: "Home Training" },
    { src: CoachchatIcon, alt: "Coach Chat" },
    { src: DownloadappIcon, alt: "Download App" },
    { src: HometrainingIcon, alt: "Home Training" },
  ];

  return (
    <div className="m-auto min-h-screen max-w-[500px] relative">
      <Header />

      <main className="w-full mx-auto">
        <div className="relative min-h-screen w-full overflow-hidden">
          <Image
            src={LandingBg}
            alt="Landing background"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "35% center" }}
          />

          <div className="absolute inset-0 bg-black/40 z-[1]" />

          <div className="relative z-[2] pt-36 w-full mx-auto">
            <div className="flex flex-col text-center items-center">
              <p className="font-bold text-[40px]">با ما مربیت</p>
              <p className="text-primary-300 font-bold text-[40px]">همیشه</p>
              <p className="font-bold text-[40px]">کنارته!</p>

              <p className="mt-4 font-bold w-[343px] text-[24px] text-center px-4">
                به راحتی مربیت رو پیدا کن، برنامه بگیر، تغییراتت رو ببین و
                پیشرفت کن.
              </p>
            </div>

            <div className="mt-56 mb-32 flex items-center justify-center">
              <Button variant="primary" size="cta" arrow="left">
                دریافت برنامه
              </Button>
            </div>
          </div>
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
                مربیت رو پیدا کن
              </p>

              <p className="
                font-light text-[12px] mt-1
                text-neutral-darker rounded px-1
              ">
                با سیستم جستجوی قوی مربی حرفه ایی خودت رو انتخاب کن
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
              src={Workout3Icon}
              alt="Workout 3"
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
                مربی خودت باش
              </p>

              <p className="
                font-light text-[12px] mt-1
                text-neutral-darker rounded px-1
              ">
                مربی خودت باش
              </p>
            </div>
          </div>

          <div className="relative w-[163px] h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src={Workout4Icon}
              alt="Workout 4"
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
                شرکت در چالش ها 
              </p>

              <p className="
                font-light text-[12px] mt-1
                text-neutral-darker rounded px-1
              ">
                در چالش‌های گروهی شرکت کن و خودت رو محک بزن
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-gradient-to-r from-[#F8FFBF] to-[#ECFB6D] flex items-center justify-around px-4 py-4 gap-5 mx-auto rounded">
          <div className="flex flex-col items-center gap-1">
            <Image src={CoachchatIcon} alt="Coach Chat" width={82} height={72} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <Image src={DownloadappIcon} alt="Download App" width={82} height={72} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <Image src={HometrainingIcon} alt="Home Training" width={82} height={72} />
          </div>
        </div>

        <section className="bg-white px-4 py-12">
          <div className="text-start mb-14">
            <h2 className="text-xl font-bold text-neutral-darker">
              چطوری برنامه بگیرم و ورزش رو شروع کنم؟
            </h2>

            <p className="mt-4 text-lg text-neutral-darker leading-6">
              قبل از هرچیزی نیاز به یه مربی داری تا مطمئن بشی توی مسیر درستی قرار گرفتی
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="absolute ml-20 -mt-2 flex items-start justify-start self-start">
                <Image
                  src={point1}
                  alt="user search"
                  width={140}
                  height={140}
                />
              </div>
              <div className="flex gap-2 items-center justify-center">
                <Image
                  src={UserSearch}
                  alt="user search"
                  width={25}
                  height={25}
                />
                <h3 className="text-lg font-bold text-neutral-darker">
                  مربیت رو انتخاب کن
                </h3>
              </div>

              <div className="self-start mt-5 bg-primary-200 flex text-neutral-darker px-5 py-4 rounded-2xl max-w-[260px] text-right">
                <p className="text-sm leading-7 flex items-center justify-center">
                  با سیستم جستجوی قدرتمند، مربی که دقیقا دنبالشی رو پیدا کن
                </p>

                <Image
                  className="-ml-12 -mt-8"
                  src={Step1Image}
                  alt="choose coach"
                  width={300}
                  height={300}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2 items-start self-start justify-start">
                <Image
                  src={PlanIcon}
                  alt="user search"
                  width={25}
                  height={25}
                />
                <h3 className="text-lg font-bold text-neutral-darker">
                  برنامت رو سفارش بده
                </h3>
              </div>

              <div className="absolute -mt-28 ml-4 md:ml-20 flex items-end justify-end self-end">
                <Image
                  src={point2}
                  alt="user search"
                  width={100}
                  height={100}
                />
              </div>

              <div className="self-end mt-5 bg-primary-200 flex text-neutral-darker px-5 py-4 rounded-2xl max-w-[260px] text-right">
                <p className="text-sm leading-7 flex items-center justify-center">
                  بعد از پیدا کردن مربیت و تکمیل پروفایلت میتونی برنامت رو سفارش بدی
                </p>

                <Image
                  className="-ml-5 -mt-8"
                  src={Step2Image}
                  alt="order program"
                  width={200}
                  height={200}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="absolute -mt-40 md:-mt-36 mr-5 md:mr-14 flex items-start justify-start self-start">
                <Image
                  src={point3}
                  alt="user search"
                  width={70}
                  height={70}
                />
              </div>

              <div className="flex gap-2 items-center self-center justify-center">
                <Image
                  src={LinkIcon}
                  alt="user search"
                  width={25}
                  height={25}
                />
                <h3 className="text-lg font-bold text-neutral-darker">
                  برنامت تو جیبته!
                </h3>
              </div>

              <div className="self-center mt-5 bg-primary-200 flex text-neutral-darker px-5 py-4 rounded-2xl max-w-[260px] text-right">
                <p className="text-sm leading-7 flex items-center justify-center">
                  مربیت که برنامت رو آماده کرد بلافاصله با پیامک لینکش رو برات میفرستیم
                </p>

                <Image
                  className="-ml-5 -mt-8 px-5"
                  src={Step3Image}
                  alt="order program"
                  width={170}
                  height={170}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center bg-neutral-gray py-10 px-6">
          <div className="max-w-[400px] w-full space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold flex">
                <span className="text-primary-300">مربی‌گری</span>راحت‌تر از همیشه
              </h2>
              <p className="flex text-right">
                برنامه‌هات رو هوشمند مدیریت کن، شاگردهای بیشتری جذب کن و تمام فرآیند مربی‌گری رو خیلی راحت فقط با گوشی انجام بده
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold">مدیریت راحت شاگردان</h3>
                <p className="text-sm">
                  تمام اطلاعات شاگرد، برنامه‌ها، پیام‌ها، تمرین‌ها و گزارش پیشرفت‌ها یکجا و مرتب در اختیارته. بدون نیاز به پیامرسان، دفترچه یا چندتا فایل پراکنده.
                </p>
              </div>
              <div className="w-32 flex-shrink-0 relative h-40">
                <div>
                  <Image alt="phone1" src={Phone1} className="h-48"/>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="w-32 flex-shrink-0 relative h-40">
                <div>
                  <Image alt="phone2" src={Phone2} className="h-48"/>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold">برنامه حرفه ایی اما راحت</h3>
                <p className="text-sm">
                  با سیستم برنامه‌نویسی <span className="text-primary-300">جیمی‌وو</span> می‌تونی خیلی سریع برنامه بسازی، حرکات مختلف رو اضافه کنی، و برای هر شاگرد شخصی‌سازی کنی.
                </p>
              </div>
            </div>

            <p className="text-center pt-3">همین حالا حرفه‌ای‌تر شروع کن</p>
          </div>

          <div className="flex items-center justify-center p-5 mt-3">
            <Button variant="primary" size="cta" arrow="left">
              ورود به عنوان مربی
            </Button>
          </div>
        </div>

        <Footer />

      </main>
    </div>
  );
}
