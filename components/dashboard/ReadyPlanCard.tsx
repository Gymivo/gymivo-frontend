"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import StarIcon from "@mui/icons-material/Star";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@/components/Button";
import DumbbellsIcon from "@/public/dashboard/cat-dumbbells.svg";
import GolfHoleIcon from "@/public/dashboard/icon-golf-hole.svg";
import type { ReadyPlan } from "@/lib/types";

interface ReadyPlanCardProps {
  plan: ReadyPlan;
}

// Backend keys: "easy" | "medium" | "hard" (difficultyLabel is the localized word).
const DIFFICULTY_TEXT: Record<string, string> = {
  easy: "text-success-700",
  medium: "text-warning-800",
  hard: "text-danger-900",
};

const DIFFICULTY_STARS: Record<string, { color: string }> = {
  easy: { color: "#17673D" },
  medium: { color: "#926511" },
  hard: { color: "#80282A" },
};

const toPersianDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export default function ReadyPlanCard({ plan }: ReadyPlanCardProps) {
  const router = useRouter();
  const stars = DIFFICULTY_STARS[plan.difficulty] ?? DIFFICULTY_STARS.medium;
  const img = plan.image?.url;

  return (
    <div className="relative w-full h-[196px] rounded-xl overflow-hidden bg-primary-0">
      {img && (
        <Image src={img} alt={plan.title} fill className="object-cover" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(51,51,51,0)_65%,rgba(76,76,76,1)_100%)]" />

      <div className="absolute inset-0 p-3 flex flex-col justify-between">
        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-0.5 rounded-lg border-[0.5px] border-neutral-dark bg-[rgba(33,33,33,0.1)] px-1 py-0.5 backdrop-blur-[3px]">
            {Array.from({ length: 3 }, (_, i) => (
              <StarIcon
                key={i}
                sx={{
                  fontSize: 11,
                  color: i < plan.starCount ? stars.color : undefined,
                }}
              />
            ))}
            <span
              className={`text-xs font-light ${DIFFICULTY_TEXT[plan.difficulty] ?? ""}`}
            >
              {plan.difficultyLabel}
            </span>
          </span>
        </div>

        <div className="flex absolute flex-col items-start gap-2">
          <h3 className="text-lg font-bold text-neutral-darker">
            {plan.title}
          </h3>
          <div className="flex items-center gap-0.5">
            <span className="flex items-center gap-0.5 rounded bg-[rgba(148,148,148,0.3)] px-0.5 py-0.5 backdrop-blur-[3px]">
              <CalendarMonthIcon sx={{ fontSize: 12, color: "#212121" }} />
              <span className="text-xs font-light text-neutral-darker">
                {toPersianDigits(plan.weeks)} هفته
              </span>
            </span>
            <span className="w-px h-2.5 bg-neutral-light" />
            <span className="flex items-center gap-0.5 rounded bg-[rgba(148,148,148,0.3)] px-0.5 py-0.5 backdrop-blur-[3px]">
              <TimerOutlinedIcon sx={{ fontSize: 12, color: "#212121" }} />
              <span className="text-xs font-light text-neutral-darker">
                {toPersianDigits(plan.durationMinutes)}دقیقه
              </span>
            </span>
          </div>
          {plan.features.map((feature, idx) => (
            <div key={feature} className="flex items-center gap-0.5">
              <Image
                src={idx === 0 ? GolfHoleIcon : DumbbellsIcon}
                alt=""
                width={16}
                height={16}
              />
              <span className="text-xs font-light text-neutral-darker">
                {feature}
              </span>
            </div>
          ))}
          <Button
            variant="white"
            size="compact"
            arrow="left"
            onClick={() => router.push(`/plans/${plan.id}`)}
          >
            مشاهده برنامه
          </Button>
        </div>
      </div>
    </div>
  );
}
