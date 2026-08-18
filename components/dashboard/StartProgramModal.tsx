"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonalPlanIllu from "@/public/dashboard/illu-personal-plan.svg";
import ChooseCoachIllu from "@/public/dashboard/illu-choose-coach.svg";
import ReadyPlansIllu from "@/public/dashboard/illu-ready-plans.svg";

interface StartProgramModalProps {
  open: boolean;
  onClose: () => void;
}

// Figma frame #1075:1561 — the design cares about the data, not the modal skin.
const OPTIONS = [
  {
    title: "ساخت برنامه شخصی",
    desc: "برنامه تمرینی خودت رو بر اساس هدف و نیازت بساز و مدیریت کن.",
    img: PersonalPlanIllu,
    imgSize: { width: 104, height: 70 },
    href: "/my-program",
  },
  {
    title: "انتخاب مربی",
    desc: "مربی مناسب خودت رو پیدا کن و برنامه تمرینیت رو دریافت کن.",
    img: ChooseCoachIllu,
    imgSize: { width: 77, height: 70 },
    href: "/trainers",
  },
  {
    title: "برنامه‌های آماده",
    desc: "برنامه‌های تمرینی آماده مربیان رو ببین و متناسب با هدفت انتخاب کن.",
    img: ReadyPlansIllu,
    imgSize: { width: 102, height: 70 },
    href: "/plans",
  },
];

/** «چطور می‌خوای شروع کنی؟» — opens from the plan card's شروع برنامه button. No API calls. */
export default function StartProgramModal({
  open,
  onClose,
}: StartProgramModalProps) {
  const router = useRouter();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "12px", maxWidth: 300, width: "100%", m: 2 },
      }}
    >
      <div className="p-2.5 flex flex-col gap-4">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label="بستن"
            className="p-1 rounded-full hover:bg-black/5 transition"
          >
            <CloseIcon sx={{ fontSize: 24, color: "#212121" }} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 px-2">
          <h2 className="text-[21px] font-bold text-neutral-darker leading-8 text-center">
            چطور می‌خوای شروع کنی؟
          </h2>
          <p className="text-xs text-neutral-darker text-center">
            مسیر مناسب خودت رو انتخاب کن و تمرینت رو شروع کن.
          </p>
        </div>

        {OPTIONS.map((option) => (
          <button
            key={option.title}
            onClick={() => {
              onClose();
              router.push(option.href);
            }}
            className="flex items-center justify-between gap-2.5 rounded-lg border-[0.5px] border-neutral-dark bg-primary-0 p-2.5 text-right shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)] hover:bg-primary-100 transition"
          >
            <span className="flex-1 flex flex-col gap-0.5">
              <span className="text-[15px] font-bold text-neutral-darker">
                {option.title}
              </span>
              <span className="text-[10px] font-light text-neutral-darker leading-[18px]">
                {option.desc}
              </span>
            </span>
            <Image
              src={option.img}
              alt=""
              width={option.imgSize.width}
              height={option.imgSize.height}
              className="shrink-0"
            />
          </button>
        ))}
      </div>
    </Dialog>
  );
}
