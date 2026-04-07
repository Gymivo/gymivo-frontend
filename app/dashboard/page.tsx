"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DashboardFooter from "@/components/DashboardFooter";
import userIcon from "@/public/svg/header/user-square.svg";
import notificationIcon from "@/public/svg/header/notification.png";
import scheduleIcon from "@/public/svg/header/schedule.png";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import gymivoIcon from "@/public/svg/header/gymivo.png";
import Footer from "@/components/Footer";


export default function DashboardPage() {
  const router = useRouter();
  const progress = 35;

  return (
    <div className="relative bg-gray-50 top-0 left-0 w-full z-50 m-auto min-h-screen max-w-[450px]">

      <header className="fixed top-2 left-1/2 -translate-x-1/2 w-[400px] border border-white/25 shadow-xs shadow-white h-16 z-50 flex items-center justify-between p-3 rounded-full bg-black/60 backdrop-blur-[20px]">
        <div className="flex gap-1">
          <button onClick={() => router.push("/notifications")} className="p-2 rounded-full hover:bg-white/10 transition">
            <Image src={notificationIcon} alt="Notifications" width={24} height={24} />
          </button>
          <button onClick={() => router.push("/schedule")} className="p-2 rounded-full hover:bg-white/10 transition">
            <Image src={scheduleIcon} alt="Schedule" width={24} height={24} />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image src={gymivoIcon} alt="gymivo" width={100} height={24} className="cursor-pointer" />
          </Link>
        </div>

        <div className="flex items-center">
          <button onClick={() => router.push("/profile")} className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition">
            <Image src={userIcon} alt="Profile" width={28} height={28} />
          </button>
        </div>
      </header>

      <main className="p-28 flex flex-col items-center gap-5 px-5">

        <div className="w-full flex justify-between items-center bg-neutral-darker rounded-2xl p-3">
          <div className="flex flex-col justify-center max-w-[220px]">
            <p className="text-white font-bold text-xl pb-3">پروفایلتو تکمیل کن <br /> و شروع کن</p>
            <Button
              size="cta"
              variant="primary"
              arrow="none"
              onClick={() => router.push("/profile")}
            >
              تکمیل پروفایل
            </Button>
          </div>

          <div className="ml-3 w-24 h-24">
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
            <p className="text-white font-bold text-xl pb-3">برای نمایش برنامه تمرینی خود ضربه بزنید</p>
            <Button
              size="cta"
              variant="primary"
              arrow="none"
              onClick={() => router.push("/my-program")}
            >
              نمایش برنامه
            </Button>
          </div>

          <div className="ml-3 w-24 h-24 flex items-center justify-center">
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
      <Footer />
    </div>
  );
}
