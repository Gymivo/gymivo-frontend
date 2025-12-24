"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";

import RightCycle from "@/public/landing/landing-cycle/right.png";
import LandingBg from "@/public/backgroud/landing.jpg";
import MiddleCycle from "@/public/landing/landing-cycle/middle.png";
import LeftCycle from "@/public/landing/landing-cycle/left.png";
import TalkSvg from "@/public/landing/landing-svg/talk.svg";
import AnalysisSvg from "@/public/landing/landing-svg/analysis.svg";
import Workout1Icon from "@/public/landing/landing-pic/workout1.jpg";
import Workout2Icon from "@/public/landing/landing-pic/workout2.jpg";
import Workout3Icon from "@/public/landing/landing-pic/workout3.jpg";
import Workout4Icon from "@/public/landing/landing-pic/workout4.jpg";
import CoachchatIcon from "@/public/landing/landing-svg/coachchat.svg";
import DownloadappIcon from "@/public/landing/landing-svg/downloadapp.svg";
import HometrainingIcon from "@/public/landing/landing-svg/hometraining.svg";
import HowImage from "@/public/landing/how/how.png";
import gymivoIcon from "@/public/svg/header/gymivo.svg";
import WhatsappIcon from "@/public/svg/social/Whatsapp.svg";
import TelegramIcon from "@/public/svg/social/Telegram.svg";
import GmailIcon from "@/public/svg/social/Gmail.svg";
import InstagramIcon from "@/public/svg/social/Instagram.svg";
import FrameIcon from "@/public/svg/social/picture-frame.svg";
import Phone1 from "@/public/landing/landing-svg/phone1.svg";
import Phone2 from "@/public/landing/landing-svg/phone2.svg";


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
    <div className="min-h-screen relative">
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

        <div className="flex items-center justify-center bg-white">
          <Image alt="how" src={HowImage} />
        </div>

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

        <div className="bg-neutral-darker">
          <div className="p-5">
            <Image src={gymivoIcon} alt="gimivo" width={100} height={24} />
          </div>

          <div className="flex justify-between">
            <div className="p-5 flex flex-col">
              <h2 className="py-4">صفحات <span className="text-primary-300">جیمیوو</span></h2>
              <p>درباره ما</p>
              <p>ارتباط با ما </p>
              <p>قوانین و مقررات</p>
              <p>سوالات متداول</p>
              <p>همکاری با جیمیوو</p>
            </div>

            <div className="p-5 flex flex-col">
              <h2 className="py-4">خدمات <span className="text-primary-300">جیمیوو</span></h2>
              <p>برنامه های من</p>
              <p>جستجوی حرکات </p>
              <p>ساخت برنامه شخصی</p>
              <p>جستجوی مربیان</p>
            </div>
          </div>

          <div className="p-5">
            <h2>فضای مجازی</h2>
            <div className="flex gap-5 justify-end">
              <Image alt="whatsapp" src={WhatsappIcon} />
              <Image alt="whatsapp" src={GmailIcon} />
              <Image alt="whatsapp" src={TelegramIcon} />
              <Image alt="whatsapp" src={InstagramIcon} />
            </div>
          </div>

          <div className="p-5">
            <h2>نمادها</h2>
            <div className="py-5 flex justify-between">
              <Image alt="whatsapp" src={FrameIcon} />
              <Image alt="whatsapp" src={FrameIcon} />
              <Image alt="whatsapp" src={FrameIcon} />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <p className="py-5 text-sm">
              در این سایت سعی شده است سادگی کار حفظ شود.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
