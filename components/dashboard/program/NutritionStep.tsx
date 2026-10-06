"use client";

import { useEffect, useRef, useState } from "react";

export default function NutritionStep() {
  const [nutritionNotes, setNutritionNotes] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");

  const nutritionRef = useRef<HTMLTextAreaElement>(null);
  const workoutRef = useRef<HTMLTextAreaElement>(null);

  const addRecommendation = (
    recommendation: string,
    setNotes: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setNotes((prev) =>
      prev ? `${prev}\n${recommendation}: ` : `${recommendation}: `,
    );
  };

  useEffect(() => {
    const resize = (element: HTMLTextAreaElement | null) => {
      if (!element) return;

      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    };

    resize(nutritionRef.current);
    resize(workoutRef.current);
  }, [nutritionNotes, workoutNotes]);

  return (
    <div className="w-full my-3 flex flex-col gap-2 px-5">
      <div className="my-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-neutral-darker flex items-center justify-center shrink-0">
            <span className="text-base font-bold text-primary-300">۳</span>
          </div>

          <h2 className="text-xl font-bold text-neutral-darker">
            توصیه تغذیه ای و نکات اجرایی
          </h2>
        </div>

        <p className="text-xs text-neutral-dark mt-1">
          توصیه های تغذیه و ریکاوری بعد از تمرین
        </p>
      </div>

      <div className="w-full rounded-[18px] bg-neutral-white p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-[15px] font-bold text-neutral-darker">
            یادداشت های تغذیه ایی
          </span>

          <textarea
            ref={nutritionRef}
            value={nutritionNotes}
            onChange={(e) => setNutritionNotes(e.target.value)}
            rows={3}
            placeholder="بنویسید..."
            className="w-full min-h-[72px] overflow-hidden rounded-[10px] border border-neutral-light px-3 py-2 text-sm text-neutral-darker placeholder:text-neutral-gray outline-none focus:border-neutral-gray resize-none"
          />

          <span className="text-sm text-neutral-dark">
            توصیه های آماده:
          </span>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => addRecommendation("قبل تمرین", setNutritionNotes)}
              className="rounded-full bg-primary-0 px-4 py-2 text-sm text-neutral-darker"
            >
              +قبل تمرین
            </button>

            <button
              type="button"
              onClick={() => addRecommendation("بعد تمرین", setNutritionNotes)}
              className="rounded-full bg-primary-0 px-4 py-2 text-sm text-neutral-darker"
            >
              +بعد تمرین
            </button>

            <button
              type="button"
              onClick={() => addRecommendation("آب", setNutritionNotes)}
              className="rounded-full bg-primary-0 px-4 py-2 text-sm text-neutral-darker"
            >
              +آب
            </button>

            <button
              type="button"
              onClick={() => addRecommendation("پروتئین", setNutritionNotes)}
              className="rounded-full bg-primary-0 px-4 py-2 text-sm text-neutral-darker"
            >
              +پروتئین
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <span className="text-[15px] font-bold text-neutral-darker">
            یادداشت های تمرینی
          </span>

          <textarea
            ref={workoutRef}
            value={workoutNotes}
            onChange={(e) => setWorkoutNotes(e.target.value)}
            rows={3}
            placeholder="بنویسید..."
            className="w-full min-h-[72px] overflow-hidden rounded-[10px] border border-neutral-light px-3 py-2 text-sm text-neutral-darker placeholder:text-neutral-gray outline-none focus:border-neutral-gray resize-none"
          />

          <span className="text-sm text-neutral-dark">
            توصیه های آماده:
          </span>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => addRecommendation("قبل تمرین", setWorkoutNotes)}
              className="rounded-full bg-primary-0 px-4 py-2 text-sm text-neutral-darker"
            >
              +قبل تمرین
            </button>

            <button
              type="button"
              onClick={() => addRecommendation("بعد تمرین", setWorkoutNotes)}
              className="rounded-full bg-primary-0 px-4 py-2 text-sm text-neutral-darker"
            >
              +بعد تمرین
            </button>

            <button
              type="button"
              onClick={() => addRecommendation("ریکاوری", setWorkoutNotes)}
              className="rounded-full bg-primary-0 px-4 py-2 text-sm text-neutral-darker"
            >
              +ریکاوری
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
