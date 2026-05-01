"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DashboardFooter from "@/components/DashboardFooter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SearchIcon from "@mui/icons-material/Search";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PoolIcon from "@mui/icons-material/Pool";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function DashboardPage() {
  const router = useRouter();
  const progress = 35;

  const categories = [
    { name: "دویدن", icon: <DirectionsRunIcon fontSize="large" /> },
    { name: "فیتنس", icon: <FitnessCenterIcon fontSize="large" /> },
    { name: "یوگا", icon: <SelfImprovementIcon fontSize="large" /> },
    { name: "رزمی", icon: <SportsMartialArtsIcon fontSize="large" /> },
    { name: "شنا", icon: <PoolIcon fontSize="large" /> },
  ];

  const favoriteMoves = [
    { name: "پرس سینه", img: "/landing/cycle/left.png" },
    { name: "اسکات پا", img: "/landing/cycle/right.png" },
    { name: "پلانک", img: "/landing/cycle/middle.png" },
  ];

  const workoutPlans = [
    {
      title: "برنامه چربی‌سوزی",
      desc: "کاهش وزن در ۳۰ روز",
      img: "/landing/motivate/workout1.jpg",
      tag: "ویژه",
    },
    {
      title: "عضله‌سازی حرفه‌ای",
      desc: "افزایش حجم اصولی",
      img: "/landing/motivate/workout2.jpg",
      tag: "پیشرفته",
    },
  ];


  return (
    <div
      className="
        relative
        bg-gradient-to-b from-neutral-200 to-gray-100
        top-0 left-0 w-full z-50 m-auto
        min-h-screen max-w-[450px]
      "
    >
      <header className="w-full h-16 flex items-center justify-between px-3">
        <div className="flex gap-1">
          <button
            onClick={() => router.push("/notifications")}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <NotificationsActiveIcon style={{ color: "black", fontSize: 27 }} />
          </button>
          <button
            onClick={() => router.push("/schedule")}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <CalendarMonthIcon style={{ color: "black", fontSize: 27 }} />
          </button>
        </div>

        <Link
          href="/profile"
          className="flex gap-1 rounded-full hover:bg-neutral-darker/10 transition p-1"
        >
          <div className="flex pr-2 flex-col items-center justify-center text-neutral-darker">
            <h2 className="font-bold text-sm">محمد علی </h2>
            <span className="font-extralight text-xs">وقت بخیر ورزشکار!</span>
          </div>
          <AccountCircleIcon style={{ color: "black", fontSize: 40 }} />
        </Link>
      </header>

      <main className="flex flex-col items-center gap-5 p-5">
        <div
          className="relative w-full h-64 rounded-2xl overflow-hidden group cursor-pointer"
          onClick={() => router.push("/my-program")}
        >
          <Image
            src="/dashboard/my-plan-img.jpg"
            alt="برنامه فعال"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />

          <div className="relative z-10 flex flex-col justify-between h-full p-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-white text-xl font-black leading-tight">
                  برنامه تمرینی شما
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-white/90 text-sm font-medium tracking-wide">
                    کات تخصصی
                  </span>
                  <span className="text-primary-200 text-[9px] font-bold bg-[rgb(118 118 118 / 9%)] px-1.5 py-0.5 rounded-full border border-primary-200">
                    ۸ هفته
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-black/10 backdrop-blur-md border border-white/40 flex items-center justify-center">
                <SportsScoreIcon style={{ color: "white", fontSize: 22 }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-white/80 text-xs">
                <div className="flex justify-around items-center gap-3 p-2 rounded-md w-full bg-white/15 backdrop-blur-sm">
                  <div className="w-1/3">
                    <p className="text-white/70 text-[9px] mb-0.5 tracking-wide">
                      مربی
                    </p>
                    <p className="font-medium text-white">امیر حسینی</p>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div className="w-1/3">
                    <p className="text-white/70 text-[9px] mb-0.5 tracking-wide">
                      جلسات
                    </p>
                    <p className="font-medium text-white">۵ جلسه</p>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div className="w-1/3">
                    <p className="text-white/70 text-[9px] mb-0.5 tracking-wide">
                      انقضا
                    </p>
                    <p className="font-medium text-white">۲۰ تیر ۱۴۰۴</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 border-t border-white/10 pt-3 mt-1">
                <div className="text-white/40 text-[9px]"></div>
                <div className="flex items-center gap-1 text-primary-300 text-sm font-medium cursor-pointer hover:gap-2 transition-all duration-300">
                  <span>مشاهده جزئیات</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="rotate-180 transition-transform duration-300 group-hover:translate-x-[-4px]"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <SearchBox />
        </div>

        <div className="w-full bg-primary-200 rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="absolute inset-[-6px] rounded-full border border-black/20" />
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={progress}
                  strokeWidth={6}
                  styles={buildStyles({
                    pathColor: "#1A1A1A",
                    textColor: "#1A1A1A",
                    trailColor: "rgba(0,0,0,0.15)",
                    textSize: "26px",
                    pathTransitionDuration: 0.8,
                  })}
                />
              </div>
              <div
                className="absolute inset-0 rounded-full bg-black/5 animate-ping pointer-events-none"
                style={{ animationDuration: "2s" }}
              />
              <span className="absolute left-[20px] top-[28px] text-black text-2xl font-black">
                {progress}%
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-black text-md font-medium tracking-wide">
                پروفایلت رو تکمیل کن
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-black/70 text-[10px]">
                  کم تر از 2 دقیقه{" "}
                </span>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-1 text-black text-xs font-bold group/btn transition-all px-2 py-1 rounded-lg hover:bg-black/10"
                >
                  <span>تکمیل کن</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="rotate-180 transition-all group-hover/btn:translate-x-[-4px]"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex mt-5 flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl text-neutral-darker font-bold">
              دسته‌بندی‌ها
            </h2>
            <button
              onClick={() => router.push("/categories")}
              className="text-sm text-neutral-500 hover:text-black transition"
            >
              مشاهده همه
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center gap-2 group flex-shrink-0"
              >
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center transition-all
                  ${idx === 0 ? "bg-primary-300 text-black" : "bg-neutral-dark text-primary-300"}
                  group-hover:scale-105 active:scale-95
                `}
                >
                  {cat.icon}
                </div>
                <span className="text-xs font-bold text-neutral-darker">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl text-neutral-darker font-bold">
              حرکات محبوب
            </h2>
            <button
              onClick={() => router.push("/moves")}
              className="text-sm text-neutral-500 hover:text-black transition"
            >
              مشاهده همه
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {favoriteMoves.map((move, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-44 h-48 rounded-3xl overflow-hidden group cursor-pointer"
                onClick={() => router.push(`/moves/${idx}`)}
              >
                <Image
                  src={move.img}
                  alt={move.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between items-center">
                  <span className="text-white font-bold text-sm">
                    {move.name}
                  </span>

                  <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-neutral-500 transition-colors">
                    <ArrowBackIcon
                      style={{
                        color: "white",
                        fontSize: 14,
                        marginLeft: "2px",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-8">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl text-neutral-darker font-bold">
              برنامه‌های پیشنهادی
            </h2>
            <button className="text-sm text-neutral-500">مشاهده همه</button>
          </div>

          <div className="flex flex-col gap-4">
            {workoutPlans.map((plan, idx) => (
              <div
                key={idx}
                className="w-full bg-neutral-dark rounded-3xl p-5 flex justify-between items-center relative overflow-hidden h-40 shadow-lg group cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={plan.img}
                    alt={plan.title}
                    fill
                    className="object-cover object-[-100px_-10px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-neutral-darker via-neutral-dark/50 to-transparent" />
                </div>

                <div className="flex flex-col gap-2 z-10 max-w-[65%]">
                  <span className="bg-primary-300/20 border border-primary-100/30 text-primary-300 text-[10px] font-black px-2 py-1 rounded-lg w-fit">
                    {plan.tag}
                  </span>
                  <h3 className="text-white font-black text-xl leading-tight drop-shadow-md">
                    {plan.title}
                  </h3>
                  <p className="text-neutral-300 text-xs">{plan.desc}</p>

                  <button className="mt-3 bg-primary-300 text-black text-xs font-bold py-2.5 px-5 rounded-xl w-fit active:scale-95 transition shadow-sm hover:brightness-110">
                    شروع کنید
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
