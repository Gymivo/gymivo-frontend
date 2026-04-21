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
import gymivoIcon from "@/public/Logo package/29.png";



export default function DashboardPage() {
  const router = useRouter();
  const progress = 35;

  return (
    <div className="relative bg-gray-50 top-0 left-0 w-full z-50 m-auto min-h-screen max-w-[450px]">

      <header className="w-full h-16 flex items-center justify-between px-3">
        <div className="flex gap-1">
          <button onClick={() => router.push("/notifications")} className="p-2 rounded-full hover:bg-black/10 transition">
            <NotificationsActiveIcon style={{ color: "black", fontSize: 27 }} />
          </button>
          <button onClick={() => router.push("/schedule")} className="p-2 rounded-full hover:bg-black/10 transition">
            <CalendarMonthIcon style={{ color: "black", fontSize: 27 }} />
          </button>
        </div>

        <div className="flex end gap-1">
          <div className="flex flex-col  items-center justify-center text-neutral-darker">
            <h2 className="font-bold text-sm">محمد علی </h2>
            <span className="font-extralight text-xs">وقت بخیر ورزشکار!</span>
          </div>
          <button onClick={() => router.push("/profile")} className="rounded-full hover:bg-black/10 transition">
            <AccountCircleIcon style={{ color: "black", fontSize: 55 }} />
          </button>
        </div>
      </header>

      <main className="p-16 flex flex-col items-center gap-5 px-5">

        <div className="w-full flex justify-between items-center bg-neutral-darker rounded-2xl p-3">
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

        <div className="w-full flex justify-between items-center bg-neutral-darker rounded-2xl p-3">
          <div className="flex flex-col justify-center max-w-[220px]">
            <p className="text-white font-bold text-lg pb-3">برای نمایش برنامه تمرینی خود ضربه بزنید</p>
            <Button
              size="md"
              variant="primary"
              arrow="none"
              onClick={() => router.push("/my-program")}
            >
              نمایش برنامه
            </Button>
          </div>

          <div className="w-24 h-24 flex items-center justify-center">
            <FitnessCenterIcon style={{ color: 'white', fontSize: 60 }} />
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
                <div key={idx} className="flex-shrink-0 w-40 bg-neutral-darker rounded-2xl p-3 flex flex-col items-center">
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
