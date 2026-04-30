"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DashboardFooter from "@/components/DashboardFooter";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SearchIcon from "@mui/icons-material/Search";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PoolIcon from '@mui/icons-material/Pool';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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
    { title: "برنامه چربی‌سوزی", desc: "کاهش وزن در ۳۰ روز", img: "/landing/motivate/workout1.jpg", tag: "ویژه" },
    { title: "عضله‌سازی حرفه‌ای", desc: "افزایش حجم اصولی", img: "/landing/motivate/workout2.jpg", tag: "پیشرفته" },
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
          <button onClick={() => router.push("/notifications")} className="p-2 rounded-full hover:bg-black/10 transition">
            <NotificationsActiveIcon style={{ color: "black", fontSize: 27 }} />
          </button>
          <button onClick={() => router.push("/schedule")} className="p-2 rounded-full hover:bg-black/10 transition">
            <CalendarMonthIcon style={{ color: "black", fontSize: 27 }} />
          </button>
        </div>

        <Link href="/profile" className="flex gap-1 rounded-full hover:bg-neutral-darker/10 transition p-1">
          <div className="flex pr-2 flex-col items-center justify-center text-neutral-darker">
            <h2 className="font-bold text-sm">محمد علی </h2>
            <span className="font-extralight text-xs">وقت بخیر ورزشکار!</span>
          </div>
            <AccountCircleIcon style={{ color: "black", fontSize: 40 }} />
        </Link>
      </header>

      <main className="p-16 flex flex-col items-center gap-5 px-5">

        <div className="w-full flex justify-between items-center bg-neutral-dark rounded-2xl p-3">
          <div className="flex flex-col justify-center max-w-[220px]">
            <Button
              size="cta"
              variant="primary"
              arrow="left"
              onClick={() => router.push("/my-program")}
            >
              برنامه‌های فعال
            </Button>
          </div>

          <div className="w-12 h-12 flex items-center justify-center">
            <SportsScoreIcon style={{ color: 'white', fontSize: 40 }} />
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-2 bg-neutral-white backdrop-blur-md border border-neutral-400 rounded-full pr-2 shadow-sm">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full bg-transparent outline-none text-sm text-neutral-700 placeholder:text-neutral-400"
            />
            <div className="hover:bg-neutral-darker/10 p-2 rounded-full transition">
              <SearchIcon style={{ fontSize: 25, color: "black" }} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-center bg-neutral-dark rounded-2xl p-3">
          <div className="flex flex-col justify-center max-w-[220px]">
            <p className="text-white font-bold text-lg pb-3">پروفایلتو تکمیل کن <br /> و شروع کن</p>
            <Button
              size="md"
              variant="primary"
              arrow="none"
              onClick={() => router.push("/profile")}
            >
              تکمیل پروفایل
            </Button>
          </div>

          <div className="w-24 h-24">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: '#A3E635',
                textColor: '#A3E635',
                trailColor: '#ffffff20',
              })}
            />
          </div>
        </div>

        <div className="w-full flex mt-5 flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl text-neutral-darker font-bold">دسته‌بندی‌ها</h2>
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
                  ${idx === 0 ? 'bg-[#A3E635] text-black' : 'bg-neutral-dark text-[#A3E635]'}
                  group-hover:scale-105 active:scale-95
                `}>
                  {cat.icon}
                </div>
                <span className="text-xs font-bold text-neutral-darker">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl text-neutral-darker font-bold">حرکات محبوب</h2>
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
                className="relative flex-shrink-0 w-44 h-56 rounded-3xl overflow-hidden group cursor-pointer"
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
                  <span className="text-white font-bold text-sm">{move.name}</span>
                  
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#A3E635] transition-colors">
                    <ArrowBackIcon style={{ color: "white", fontSize: 14, marginLeft: '2px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-8">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl text-neutral-darker font-bold">برنامه‌های پیشنهادی</h2>
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
                  <span className="bg-[#A3E635] text-black text-[10px] font-black px-2 py-1 rounded-lg w-fit">
                    {plan.tag}
                  </span>
                  <h3 className="text-white font-black text-xl leading-tight drop-shadow-md">
                    {plan.title}
                  </h3>
                  <p className="text-neutral-300 text-xs">
                    {plan.desc}
                  </p>
                  
                  <button 
                    className="mt-3 bg-[#A3E635] text-black text-xs font-bold py-2.5 px-5 rounded-xl w-fit active:scale-95 transition shadow-sm hover:brightness-110"
                  >
                    شروع کنید
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-6">
          <div className="flex text-xl justify-between text-neutral-darker font-bold hover:underline items-center px-2">
              <h2>مربیان فعال</h2>
              <button>&gt;</button>
          </div>

          <div className="flex gap-3 overflow-x-auto py-2">
              {[
              { name: "علی رضایی", experience: 5, city: "تهران", img: "/dashboard/coach1.jpg" },
              { name: "مینا احمدی", experience: 3, city: "اصفهان", img: "/dashboard/coach2.jpg" },
              { name: "رضا کریمی", experience: 7, city: "شیراز", img: "/dashboard/coach4.jpg" },
              ].map((coach, idx) => (
              <div key={idx} className="flex-shrink-0 w-40 bg-neutral-gray rounded-2xl p-3 flex flex-col items-center">
                  <div className="border-2 border-primary-300 rounded-full mb-3">
                      <Image
                          src={coach.img}
                          alt={coach.name}
                          width={75}
                          height={75}
                          className="rounded-full object-cover"
                      />
                  </div>
                  <p className="text-white font-bold text-sm text-center">{coach.name}</p>
                  <p className="text-white text-xs text-center">{coach.experience} سال تجربه</p>
                  <p className="text-white text-xs text-center">{coach.city}</p>
              </div>
              ))}
          </div>
        </div>

      </main>

      <DashboardFooter />
    </div>
  );
}
