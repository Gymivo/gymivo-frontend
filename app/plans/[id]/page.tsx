"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardFooter from "@/components/DashboardFooter";
import DumbbellsIcon from "@/public/dashboard/cat-dumbbells.svg";
import { catalogApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type ReadyPlan } from "@/lib/types";

const toPersianDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const DIFFICULTY_TEXT: Record<string, string> = {
  easy: "text-success-700",
  medium: "text-warning-800",
  hard: "text-danger-900",
};

export default function ReadyPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [plan, setPlan] = useState<ReadyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    catalogApi
      .readyPlan(id)
      .then((res) => {
        if (!cancelled) setPlan(res);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof ApiError
            ? err.code === 0
              ? NETWORK_ERROR_MESSAGE
              : err.message
            : NETWORK_ERROR_MESSAGE,
        );
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between px-4 gap-1">
        <h1 className="text-base font-bold text-neutral-darker">برنامه آماده</h1>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>
      </header>

      <main className="px-5 py-20 pb-24 flex flex-col gap-4">
        {error && (
          <p className="text-center text-sm text-[#F44336]">{error}</p>
        )}

        {!plan && !error && (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-transparent" />
          </div>
        )}

        {plan && (
          <>
            <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-primary-0">
              {plan.image?.url && (
                <Image
                  src={plan.image.url}
                  alt={plan.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(51,51,51,0)_55%,rgba(76,76,76,1)_100%)]" />
              <div className="absolute bottom-3 start-3 end-3 flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-neutral-darker">
                    {plan.title}
                  </h2>
                  <span
                    className={`text-sm font-bold ${DIFFICULTY_TEXT[plan.difficulty] ?? ""}`}
                  >
                    {plan.difficultyLabel}
                  </span>
                </div>
                <span className="flex items-center gap-0.5 rounded-lg border-[0.5px] border-neutral-dark bg-[rgba(33,33,33,0.1)] px-1.5 py-0.5 backdrop-blur-[3px]">
                  {Array.from({ length: plan.starCount }, (_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 14, color: "#926511" }} />
                  ))}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-xl bg-white px-2.5 py-1.5 shadow-xs">
                <CalendarMonthIcon sx={{ fontSize: 14, color: "#212121" }} />
                <span className="text-xs font-bold text-neutral-darker">
                  {toPersianDigits(plan.weeks)} هفته
                </span>
              </span>
              <span className="flex items-center gap-1 rounded-xl bg-white px-2.5 py-1.5 shadow-xs">
                <TimerOutlinedIcon sx={{ fontSize: 14, color: "#212121" }} />
                <span className="text-xs font-bold text-neutral-darker">
                  {toPersianDigits(plan.durationMinutes)}دقیقه
                </span>
              </span>
              {plan.coach && (
                <span className="flex items-center gap-1 rounded-xl bg-white px-2.5 py-1.5 shadow-xs">
                  <span className="text-xs font-bold text-neutral-darker">
                    مربی: {plan.coach.displayName}
                  </span>
                </span>
              )}
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-2">
              <h3 className="text-sm font-bold text-neutral-darker">
                ویژگی‌های برنامه
              </h3>
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Image src={DumbbellsIcon} alt="" width={16} height={16} />
                  <span className="text-sm font-light text-neutral-darker">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}
