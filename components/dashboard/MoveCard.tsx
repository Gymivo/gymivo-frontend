"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export interface Move {
  name: string;
  img: string | StaticImageData;
  /** Muscle groups shown as tags on the card. */
  muscles: string[];
}

interface MoveCardProps {
  move: Move;
  href: string;
}

/** 180×180 popular-move card (Figma workouts-category). */
export default function MoveCard({ move, href }: MoveCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="relative w-[180px] h-[180px] shrink-0 rounded-xl overflow-hidden cursor-pointer"
    >
      <Image src={move.img} alt={move.name} fill className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.6)_21%,rgba(255,255,255,0)_75%,rgba(153,153,153,1)_100%)]" />

      <div className="absolute inset-0 p-1.5 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <p className="text-[15px] font-bold text-neutral-darker">
            {move.name}
          </p>
          <div className="w-4 h-4 rounded bg-neutral-light border border-neutral-dark/50 flex items-center justify-center">
            <ChevronLeftIcon sx={{ fontSize: 12, color: "#6E6E6E" }} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {move.muscles.map((muscle) => (
              <span
                key={muscle}
                className="flex items-center gap-0.5 rounded-lg bg-primary-100 px-0.5 backdrop-blur-[2px]"
              >
                <FitnessCenterIcon sx={{ fontSize: 10, color: "#6E6E6E" }} />
                <span className="text-[8px] font-semibold text-neutral-dark">
                  {muscle}
                </span>
              </span>
            ))}
          </div>

          <div className="rounded-lg bg-[linear-gradient(0deg,rgba(237,237,237,1)_0%,rgba(252,252,252,1)_100%)] px-1 py-0.5">
            <span dir="ltr" className="flex items-center gap-0.5">
              <ChevronLeftIcon sx={{ fontSize: 10, color: "#6E6E6E" }} />
              <span className="text-xs font-bold text-neutral-dark">مشاهده</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
