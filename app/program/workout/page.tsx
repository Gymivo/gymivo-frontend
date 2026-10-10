"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from "@/components/Button";
import NormalSet from "@/components/dashboard/program/workout/NormalSet";
import DropSet from "@/components/dashboard/program/workout/DropSet";
import The21s from "@/components/dashboard/program/workout/21s";
import AMRAP from "@/components/dashboard/program/workout/AMRAP";
import EMOM from "@/components/dashboard/program/workout/EMOM";

const workoutOptions = [
  {
    label: "ست معمولی",
    icon: "/dashboard/program/workout/normalset.svg",
    iconWidth: 75,
    iconHeight: 20,
  },
  {
    label: "سوپرست",
    icon: "/dashboard/program/workout/superset.svg",
    iconWidth: 40,
    iconHeight: 20,
  },
  {
    label: "دراپ‌ست",
    icon: "/dashboard/program/workout/dropset.svg",
    iconWidth: 60,
    iconHeight: 20,
  },
  {
    label: "هرمی صعودی",
    icon: "/dashboard/program/workout/Ascendedpyramid.svg",
    iconWidth: 75,
    iconHeight: 20,
  },
  {
    label: "هرمی نزولی",
    icon: "/dashboard/program/workout/Descentpyramid.svg",
    iconWidth: 75,
    iconHeight: 20,
  },
  {
    label: "غول‌ست",
    icon: "/dashboard/program/workout/giantset.svg",
    iconWidth: 60,
    iconHeight: 20,
  },
  {
    label: "EMOM",
    icon: "/dashboard/program/workout/emom.svg",
    iconWidth: 75,
    iconHeight: 20,
  },
  {
    label: "AMRAP",
    icon: "/dashboard/program/workout/amrap.svg",
    iconWidth: 60,
    iconHeight: 20,
  },
  {
    label: "21s",
    icon: "/dashboard/program/workout/21s.svg",
    iconWidth: 60,
    iconHeight: 20,
  },
];

export default function WorkoutPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number>(0);

  return (
    <div dir="rtl" className="min-h-screen bg-neutral-white p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#6E6E6E]">ویرایش حرکت</h1>

        <button
          type="button"
          onClick={() => router.push("/program")}
          className="flex items-center justify-center text-[#6E6E6E]"
        >
          <HighlightOffIcon sx={{ fontSize: 30 }} />
        </button>
      </div>

      <div className="mt-4 h-px w-full bg-[#6E6E6E]" />

      <div className="mt-4 flex items-center gap-1 rounded-[10px] bg-[#2121210A] p-3">
        <span className="text-sm text-[#555555]">نمایش:</span>
        <span className="text-sm font-bold text-[#212121]">ساختار ست</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {workoutOptions.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => setSelectedOption(index)}
              className={`h-[70px] w-full rounded-[10px] border flex flex-col items-center justify-center gap-1 transition ${
                isSelected
                  ? "bg-primary-100 border-neutral-darker"
                  : "bg-neutral-white border-neutral-light"
              }`}
            >
              <div className="h-6 flex items-center justify-center">
                <Image
                  src={option.icon}
                  alt={option.label}
                  width={option.iconWidth}
                  height={option.iconHeight}
                />
              </div>

              <span className="text-sm text-neutral-darker">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {selectedOption === 0 && <NormalSet />}
        {selectedOption === 2 && <DropSet />}
        {selectedOption === 6 && <EMOM />}
        {selectedOption === 7 && <AMRAP />} 
        {selectedOption === 8 && <The21s />}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <span className="text-sm font-bold text-neutral-darker">
          یادداشت (اختیاری)
        </span>

        <textarea
          rows={3}
          placeholder="روش اجرا یا نکته را یادداشت کنید"
          className="w-full min-h-[72px] rounded-[12px] border border-neutral-light px-3 py-2 text-sm text-neutral-darker placeholder:text-neutral-gray outline-none focus:border-neutral-gray resize-none"
        />

        <Button variant="primary" size="full">
          ذخیره ست
        </Button>
      </div>
    </div>
  );
}
