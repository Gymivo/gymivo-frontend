"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import DashboardFooter from "@/components/DashboardFooter";
import PlanStatusCard from "@/components/dashboard/PlanStatusCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import MoveCard, { type Move } from "@/components/dashboard/MoveCard";
import ReadyPlanCard, {
  type ReadyPlan,
} from "@/components/dashboard/ReadyPlanCard";
import StartProgramModal from "@/components/dashboard/StartProgramModal";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CatElliptical from "@/public/dashboard/cat-elliptical.svg";
import CatMeditation from "@/public/dashboard/cat-meditation.svg";
import CatRun from "@/public/dashboard/cat-run.svg";
import CatDumbbells from "@/public/dashboard/cat-dumbbells.svg";
import CatBoxing from "@/public/dashboard/cat-boxing.svg";
import CatSwimming from "@/public/dashboard/cat-swimming.svg";
import MoveHipThrust from "@/public/dashboard/move-hip-thrust.png";
import MoveCableShoulder from "@/public/dashboard/move-cable-shoulder.png";
import MoveSquat from "@/public/dashboard/move-squat.png";
import MoveDumbbellShoulder from "@/public/dashboard/move-dumbbell-shoulder.png";
import PlanHome from "@/public/dashboard/plan-home.png";
import PlanMuscle from "@/public/dashboard/plan-muscle.png";
import PlanCardio from "@/public/dashboard/plan-cardio.png";

const PLAN_STATUS: "active" | "new" = "active";
const PLAN_DAYS_LEFT = 10;

const categories = [
  { name: "دورچرخه", icon: CatElliptical },
  { name: "یوگا", icon: CatMeditation },
  { name: "دویدن", icon: CatRun },
  { name: "بدنسازی", icon: CatDumbbells },
  { name: "بوکس", icon: CatBoxing },
  { name: "شنا", icon: CatSwimming },
];

const moves: Move[] = [
  { name: "هیپ تراست", img: MoveHipThrust, muscles: ["باسن", "پشت ران"] },
  { name: "سرشانه سیم‌کش", img: MoveCableShoulder, muscles: ["سرشانه"] },
  { name: "اسکات", img: MoveSquat, muscles: ["چهارسر ران"] },
  { name: "سرشانه دمبل", img: MoveDumbbellShoulder, muscles: ["سرشانه"] },
];

const readyPlans: ReadyPlan[] = [
  {
    title: "تمرین در خانه",
    difficulty: "آسان",
    duration: "۱۲۰دقیقه",
    weeks: "۶ هفته",
    features: ["تقویت بدن و عضلات داخلی", "بدون تجهیزات ورزشی"],
    img: PlanHome,
  },
  {
    title: "عضله سازی",
    difficulty: "متوسط",
    duration: "۱۲۰دقیقه",
    weeks: "۶ هفته",
    features: ["افزایش حجم و قدرت عضله", "تمرین در باشگاه ورزشی"],
    img: PlanMuscle,
  },
  {
    title: "هوازی و چربی‌سوزی",
    difficulty: "دشوار",
    duration: "۱۲۰دقیقه",
    weeks: "۶ هفته",
    features: ["کاهش چربی بدن", "تمرین در فضای باز"],
    img: PlanCardio,
  },
];

// function useDragScroll() {
//   const ref = useRef<HTMLDivElement>(null);
//   const drag = useRef({
//     isDown: false,
//     moved: false,
//     startX: 0,
//     startScrollLeft: 0,
//   });

//   const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
//     if (e.pointerType !== "mouse") return;
//     const el = ref.current;
//     if (!el) return;
//     e.preventDefault();
//     drag.current = {
//       isDown: true,
//       moved: false,
//       startX: e.clientX,
//       startScrollLeft: el.scrollLeft,
//     };
//     el.setPointerCapture(e.pointerId);
//   };

//   const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
//     const el = ref.current;
//     const d = drag.current;
//     if (!el || !d.isDown) return;
//     const dx = e.clientX - d.startX;
//     if (Math.abs(dx) > 3) d.moved = true;
//     el.scrollLeft = d.startScrollLeft - dx;
//   };

//   const endDrag = (e: PointerEvent<HTMLDivElement>) => {
//     drag.current.isDown = false;
//     if (ref.current?.hasPointerCapture(e.pointerId)) {
//       ref.current.releasePointerCapture(e.pointerId);
//     }
//   };

//   const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
//     if (drag.current.moved) {
//       e.preventDefault();
//       e.stopPropagation();
//       drag.current.moved = false;
//     }
//   };

//   return {
//     ref,
//     handlers: {
//       onPointerDown,
//       onPointerMove,
//       onPointerUp: endDrag,
//       onPointerCancel: endDrag,
//       onClickCapture,
//     },
//   };
// }

export default function DashboardPage() {
  const router = useRouter();
  const [startModalOpen, setStartModalOpen] = useState(false);
  // const categoriesScroll = useDragScroll();
  // const movesScroll = useDragScroll();

  return (
    <div>
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
          href="/dashboard/profile"
          className="flex items-center gap-1 rounded-full hover:bg-neutral-darker/10 transition p-1"
        >
          <div className="flex pr-2 flex-col items-center justify-center text-neutral-darker">
            <h2 className="font-bold text-sm">نام کاربر</h2>
            <span className="font-extralight text-xs">وقت بخیر ورزشکار</span>
          </div>
          <AccountCircleIcon style={{ color: "black", fontSize: 40 }} />
        </Link>
      </header>

      <main className="flex flex-col items-center gap-6 p-5 pb-24">
        <SearchBox />

        <PlanStatusCard
          status={PLAN_STATUS}
          daysLeft={PLAN_DAYS_LEFT}
          onStartProgram={() => setStartModalOpen(true)}
        />

        <div className="w-full rounded-2xl p-2 bg-[linear-gradient(49deg,rgba(251,255,216,1)_2%,rgba(240,255,114,1)_99%)]">
          <div className="flex items-center gap-2">
            <div className="w-[95px] h-[95px] shrink-0 rounded-full border-[0.5px] border-neutral-darker flex items-center justify-center">
              <div className="w-[81px] h-[82px] rounded-full border-4 border-neutral-gray flex items-center justify-center">
                <span
                  dir="ltr"
                  className="text-2xl font-bold text-neutral-darker"
                >
                  35%
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <p className="text-sm text-neutral-darker">
                پروفایلت رو تکمیل کن
              </p>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-light text-neutral-darker">
                  کم تر از دو دقیقه
                </span>
                <TimerOutlinedIcon sx={{ fontSize: 12, color: "#212121" }} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="px-1 py-0.5 rounded-lg hover:bg-black/5 transition"
                >
                  <span dir="ltr" className="flex items-center gap-1">
                    <ArrowBackIcon sx={{ fontSize: 20, color: "#212121" }} />
                    <span className="text-sm font-semibold text-neutral-darker">
                      تکمیل کن
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <SectionHeader title="دسته بندی‌ها" href="/categories" />
          <div
            // ref={categoriesScroll.ref}
            // {...categoriesScroll.handlers}
            className="flex gap-2 overflow-x-auto pb-2 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[...categories].reverse().map((cat) => (
              <button
                key={cat.name}
                className="flex flex-col items-center gap-0.5 shrink-0"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-0 flex items-center justify-center">
                  <Image src={cat.icon} alt={cat.name} width={24} height={24} />
                </div>
                <span className="text-xs font-bold text-neutral-dark">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <SectionHeader title="حرکات محبوب" href="/moves" />
          <div
            // ref={movesScroll.ref}
            // {...movesScroll.handlers}
            className="flex gap-2 overflow-x-auto pb-2 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[...moves].reverse().map((move, idx) => (
              <MoveCard
                key={move.name}
                move={move}
                href={`/moves/${moves.length - 1 - idx}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <SectionHeader title="برنامه های آماده" href="/plans" />
          <div className="flex flex-col gap-2">
            {readyPlans.map((plan) => (
              <ReadyPlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </div>
      </main>

      <StartProgramModal
        open={startModalOpen}
        onClose={() => setStartModalOpen(false)}
      />

      <DashboardFooter />
    </div>
  );
}
