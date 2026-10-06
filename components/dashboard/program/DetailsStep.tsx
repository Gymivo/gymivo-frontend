import { useState } from "react";
import type { ProfileResponse } from "@/lib/types";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type DetailsStepProps = {
  profile: ProfileResponse;
  sessionsPerWeek: number;
  setSessionsPerWeek: React.Dispatch<React.SetStateAction<number>>;
};

export default function DetailsStep({
  profile,
  sessionsPerWeek,
  setSessionsPerWeek,
}: DetailsStepProps) {
  const [selectedGoal, setSelectedGoal] = useState("چربی‌سوزی");
  const [selectedSport, setSelectedSport] = useState("بدنسازی");
  const [selectedLevel, setSelectedLevel] = useState("تازه‌کار");
  const [selectedDuration, setSelectedDuration] = useState("۴ هفته");

  return (
    <div className="w-full my-3 flex flex-col gap-2 px-5">
      <div className="my-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-neutral-darker flex items-center justify-center shrink-0">
            <span className="text-base font-bold text-primary-300">۱</span>
          </div>

          <h2 className="text-xl font-bold text-neutral-darker">هدف و رشته</h2>
        </div>

        <p className="text-xs text-neutral-dark mt-1">
          اطلاعات کلی و پایه برنامه جهت شروع
        </p>
      </div>

      <div className="w-full rounded-[18px] bg-neutral-white p-4 flex flex-col gap-3">
        <h3 className="text-[15px] font-bold text-neutral-darker">هدف اصلی</h3>

        <div className="flex flex-wrap gap-2">
          {[
            "چربی‌سوزی",
            "استقامت",
            "تناسب اندام",
            "عضله‌سازی",
            "افزایش قدرت",
          ].map((goal) => {
            const isSelected = goal === selectedGoal;

            return (
              <button
                key={goal}
                type="button"
                onClick={() => setSelectedGoal(goal)}
                className={`rounded-full px-4 py-3 text-xs font-medium transition ${
                  isSelected
                    ? "bg-neutral-darker text-neutral-white"
                    : "bg-neutral-white text-neutral-dark border border-neutral-light"
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>

        <div className="flex mt-3 flex-col gap-3">
          <h3 className="text-[15px] font-bold text-neutral-darker">
            رشته ورزشی
          </h3>

          <button
            type="button"
            className="col-span-3 h-12 rounded-lg flex items-center justify-between px-4 bg-neutral-white border border-neutral-light text-neutral-dark text-xs font-medium transition"
          >
            <span>جستجوی رشته</span>
            <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
          </button>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "بدنسازی", icon: FitnessCenterIcon },
              { label: "شنا", icon: PoolIcon },
              { label: "فیتنس", icon: DirectionsRunIcon },
              { label: "کراسفیت", icon: SportsGymnasticsIcon },
              { label: "HIIT", icon: TimerOutlinedIcon },
              { label: "غیره", icon: MoreHorizIcon },
            ].map(({ label, icon: Icon }) => {
              const isSelected = label === selectedSport;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedSport(label)}
                  className={`h-10 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium transition ${
                    isSelected
                      ? "bg-neutral-darker text-neutral-white"
                      : "bg-neutral-white text-neutral-dark border border-neutral-light"
                  }`}
                >
                  <Icon sx={{ fontSize: 18 }} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <h3 className="text-[15px] font-bold text-neutral-darker">سطح</h3>

          <div className="flex flex-wrap gap-2">
            {["تازه‌کار", "متوسط", "حرفه‌ای", "مسابقات"].map((level) => {
              const isSelected = level === selectedLevel;

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-4 py-3 text-xs font-medium transition ${
                    isSelected
                      ? "bg-neutral-darker text-neutral-white"
                      : "bg-neutral-white text-neutral-dark border border-neutral-light"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <h3 className="text-[15px] font-bold text-neutral-darker">
            مدت برنامه
          </h3>

          <div className="flex flex-wrap gap-2">
            {["۴ هفته", "۶ هفته", "۸ هفته", "۱۲ هفته"].map((duration) => {
              const isSelected = duration === selectedDuration;

              return (
                <button
                  key={duration}
                  type="button"
                  onClick={() => setSelectedDuration(duration)}
                  className={`rounded-full px-4 py-3 text-xs font-medium transition ${
                    isSelected
                      ? "bg-neutral-darker text-neutral-white"
                      : "bg-neutral-white text-neutral-dark border border-neutral-light"
                  }`}
                >
                  {duration}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <h3 className="text-[15px] font-bold text-neutral-darker">
            جلسات در هفته
          </h3>

          <div className="w-[161px] h-[57px] border border-neutral-light self-center rounded-lg bg-primary-0 grid grid-cols-3 items-center">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setSessionsPerWeek((prev) => Math.min(21, prev + 1))
                }
                className="w-10 h-10 border border-neutral-light rounded-lg bg-neutral-white flex items-center justify-center text-lg text-neutral-darker"
              >
                +
              </button>
            </div>

            <div className="flex justify-center">
              <span className="text-base font-bold text-neutral-darker">
                {sessionsPerWeek}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setSessionsPerWeek((prev) => Math.max(1, prev - 1))
                }
                className="w-10 h-10 border border-neutral-light rounded-lg bg-neutral-white flex items-center justify-center text-lg text-neutral-darker"
              >
                -
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <h3 className="text-[15px] font-bold text-neutral-darker">
            تصاویر بدن (اختیاری)
          </h3>

          <div className="flex justify-between">
            {[1, 2, 3, 4].map((number) => (
              <button
                key={number}
                type="button"
                className="w-[66px] h-[156px] rounded-lg overflow-hidden border border-neutral-light bg-neutral-white"
              >
                <img
                  src={`/dashboard/program/${number}.svg`}
                  alt={`تصویر بدن ${number}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
