"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";
import { motion, useReducedMotion } from "framer-motion";

interface MeasureRulerProps {
  values: number[]; // نزولی (مثلا ۳۰۰ تا ۲۰)
  value: number;
  onChange: (value: number) => void;
  orientation: "horizontal" | "vertical";
  unit: string; // "kg" | "cm"
  slidesPerView?: number;
}

const toFa = (n: number) => n.toLocaleString("fa-IR");

export default function MeasureRuler({
  values,
  value,
  onChange,
  orientation,
  unit,
  slidesPerView,
}: MeasureRulerProps) {
  const vertical = orientation === "vertical";
  const reduce = useReducedMotion();

  const lastTickAt = useRef(0);
  const lastTickValue = useRef<number | null>(null);
  const canVibrate =
    typeof navigator !== "undefined" && "vibrate" in navigator && !reduce;

  // تیک خفیف روی هر عدد رند؛ برای اینکه ویبره اسپم نشود هر ۶۰ میلی‌ثانیه یک‌بار
  const tickVibrate = (v: number) => {
    if (!canVibrate) return;
    const now = performance.now();
    if (now - lastTickAt.current < 60) return;
    if (lastTickValue.current === v) return;
    lastTickAt.current = now;
    lastTickValue.current = v;
    try {
      navigator.vibrate(10);
    } catch {}
  };

  const settleVibrate = () => {
    if (!canVibrate) return;
    try {
      navigator.vibrate(15);
    } catch {}
  };

  const initialSlide = Math.max(0, values.indexOf(value));

  const fade = (v: number) => ({
    opacity: Math.max(0.25, 1 - Math.abs(value - v) / 20),
  });

  return (
    <div className={vertical ? "relative h-[250px] w-full" : "relative w-full"}>
      <Swiper
        direction={vertical ? "vertical" : "horizontal"}
        modules={[Virtual]}
        virtual={{ enabled: true, addSlidesBefore: 5, addSlidesAfter: 5 }}
        initialSlide={initialSlide}
        slidesPerView={slidesPerView ?? (vertical ? 19 : 23)}
        centeredSlides
        grabCursor
        watchSlidesProgress
        onTouchStart={() => {
          lastTickValue.current = null;
        }}
        onSlideChange={(swiper) => {
          const selected = values[swiper.activeIndex];
          onChange(selected);
          if (selected % 5 === 0) tickVibrate(selected);
        }}
        onTouchEnd={() => settleVibrate()}
        className={vertical ? "h-full w-full" : "w-full py-2"}
      >
        {values.map((v, i) => {
          const isSelected = value === v;
          const isMajor = v % 5 === 0;
          const tick = vertical
            ? isSelected
              ? "h-1 w-10 bg-primary-400"
              : isMajor
                ? "h-0.5 w-7 bg-neutral-500"
                : "h-[1px] w-5 bg-neutral-400"
            : isSelected
              ? "w-1 h-10 bg-primary-400"
              : isMajor
                ? "w-0.5 h-7 bg-neutral-500"
                : "w-[1px] h-5 bg-neutral-400";

          return (
            <SwiperSlide
              key={v}
              virtualIndex={i}
              className={
                vertical
                  ? "flex items-center justify-start select-none pl-3"
                  : "flex justify-center items-end h-12 select-none"
              }
            >
              <div
                style={fade(v)}
                className={
                  vertical
                    ? "flex items-center gap-2 cursor-pointer"
                    : "flex flex-col items-center gap-1 cursor-pointer w-full"
                }
              >
                <div className={`rounded-full transition-colors ${tick}`} />

                {isMajor ? (
                  <span
                    className={`text-[9px] font-bold transition-colors ${
                      isSelected
                        ? "text-black scale-110 font-black"
                        : "text-neutral-400"
                    }`}
                  >
                    {toFa(v)}
                  </span>
                ) : (
                  <span className="text-[9px] opacity-0 select-none">-</span>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* حباب مقدار زنده */}
      <div
        aria-hidden
        className={`pointer-events-none absolute z-10 ${
          vertical
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : "left-1/2 -top-3 -translate-x-1/2"
        }`}
      >
        <motion.div
          key={value}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="bg-primary-300 text-neutral-darker text-sm font-black rounded-full shadow-md px-2.5 h-8 min-w-16 flex items-center justify-center select-none whitespace-nowrap"
        >
          <span dir="ltr">
            {toFa(value)} {unit}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
