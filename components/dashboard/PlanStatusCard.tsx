"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PlanCardImg from "@/public/dashboard/plan-card.png";
import PlanNewImg from "@/public/dashboard/plan-new.png";
import RulerPenIcon from "@/public/dashboard/icon-ruler-pen.svg";
import type { TrainingPlan } from "@/lib/types";
import { jalaliPartsFromIso } from "@/lib/jalali";

type PlanState = "success" | "warning" | "expired";

interface PlanStatusCardProps {
  /** The user's latest plan from /api/plans/latest; null is the never-had-one state. */
  plan: TrainingPlan | null;
  /** Fired by شروع برنامه / برنامه جدید / درخواست برنامه buttons. */
  onStartProgram: () => void;
}

// Per Figma dashboard frame #915:3238 + backend note 1068:1003: the card states are
// derived client-side — daysLeft = 0 → منقضی, daysLeft ≤ 3 → رو به اتمام.
const toPersianDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const STATE_STYLES: Record<
  PlanState,
  { chipBg: string; text: string; bar: string }
> = {
  success: {
    chipBg: "bg-[rgba(227,255,237,0.46)]",
    text: "text-success-700",
    bar: "bg-success-400",
  },
  warning: {
    chipBg: "bg-[rgba(255,242,227,0.46)]",
    text: "text-warning-800",
    bar: "bg-warning-500",
  },
  expired: {
    chipBg: "bg-[rgba(255,227,228,0.46)]",
    text: "text-danger-900",
    bar: "bg-danger-300",
  },
};

export default function PlanStatusCard({
  plan,
  onStartProgram,
}: PlanStatusCardProps) {
  const router = useRouter();

  // New user without any plan → dedicated empty-state card.
  if (!plan) {
    return (
      <div className="relative w-full h-[228px] rounded-2xl overflow-hidden">
        <Image
          src={PlanNewImg}
          alt="شروع برنامه"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-t from-transparent to-[#909090] pt-6 px-4 pb-2 flex flex-col items-center gap-1">
          <h2 className="text-white text-lg font-bold">وقتشه شروع کنی!</h2>
          <p className="text-white text-sm font-bold">
            اولین قدم مسیر تناسب اندامت رو بردار.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(176,176,176,0)_17%,rgba(38,38,38,1)_100%)] p-2.5 flex justify-center">
          <button
            onClick={onStartProgram}
            className="h-12 rounded-xl bg-primary-100 px-6 flex items-center justify-center"
          >
            <span dir="ltr" className="flex items-center gap-2">
              <OutlinedFlagIcon sx={{ fontSize: 24, color: "#6E6E6E" }} />
              <span className="text-base font-semibold text-neutral-dark">
                شروع برنامه
              </span>
            </span>
          </button>
        </div>
      </div>
    );
  }

  const state: PlanState =
    plan.daysLeft <= 0 ? "expired" : plan.daysLeft <= 3 ? "warning" : "success";
  const styles = STATE_STYLES[state];
  const statusText =
    state === "expired"
      ? "اتمام زمان برنامه"
      : `${toPersianDigits(plan.daysLeft)} روز تا پایان زمان برنامه`;

  const { jy, jd, monthName } = jalaliPartsFromIso(plan.expiresAt);
  const expiryLabel = `${toPersianDigits(jd)} ${monthName} ${toPersianDigits(jy)}`;

  const stats = [
    { label: "انقضا", value: expiryLabel },
    { label: "جلسات", value: `${toPersianDigits(plan.sessionCount)} جلسه` },
    { label: "مربی", value: plan.coach?.displayName ?? "—" },
  ];

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden">
      <Image
        src={PlanCardImg}
        alt="برنامه فعال"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />

      <div className="relative z-10 flex flex-col justify-between h-full p-5">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-white text-lg font-bold leading-tight">
              برنامه تمرینی شما
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-bold">
                {plan.planType}
              </span>
              <span className="w-[45px] text-center rounded-xl border border-primary-200 bg-[rgba(110,110,110,0.1)] px-0.5 py-0.5 text-[9px] font-semibold text-primary-200">
                {toPersianDigits(plan.weeks)} هفته
              </span>
            </div>
          </div>{" "}
          <div className="p-2 rounded-2xl bg-[rgba(110,110,110,0.2)] border border-white">
            <OutlinedFlagIcon sx={{ color: "white", fontSize: 22 }} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-stretch justify-between rounded-xl bg-[rgba(148,148,148,0.2)] backdrop-blur-md px-1 py-2">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex-1 flex flex-col items-center gap-0.5 ${
                  idx < 2 ? "border-e border-white/50" : ""
                }`}
              >
                <p className="text-white text-[9px] font-light">{stat.label}</p>
                <p className="text-white text-xs font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-1">
            <div className="relative w-full h-[6px] rounded-full bg-[#FFF5F5]">
              <div
                className={`absolute start-0 top-0 h-full rounded-full ${styles.bar}`}
                style={{ width: `${plan.progressPercent}%` }}
              />
            </div>
            <div
              className={`flex items-center gap-0.5 rounded-md px-0.5 py-0.5 backdrop-blur-[3px] ${styles.chipBg}`}
            >
              <span className={`text-xs font-light ${styles.text}`}>
                {statusText}
              </span>
              <TimerOutlinedIcon sx={{ fontSize: 12, color: "currentColor" }} />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1.5">
            {state !== "success" && (
              <button
                onClick={onStartProgram}
                className="rounded-lg bg-primary-100 px-3 py-1.5"
              >
                <span dir="ltr" className="flex items-center gap-2">
                  {state === "expired" ? (
                    <NoteAddIcon sx={{ fontSize: 20, color: "#6E6E6E" }} />
                  ) : (
                    <Image src={RulerPenIcon} alt="" width={20} height={20} />
                  )}
                  <span className="text-sm font-semibold text-neutral-dark">
                    {state === "expired" ? "برنامه جدید" : "درخواست برنامه"}
                  </span>
                </span>
              </button>
            )}
            <button
              onClick={() => router.push("/my-program")}
              className="ms-auto py-1"
            >
              <span dir="ltr" className="flex items-center gap-1">
                <ArrowBackIcon sx={{ fontSize: 20, color: "#ECFB6D" }} />
                <span className="text-sm font-semibold text-primary-300">
                  مشاهده جزئیات
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
