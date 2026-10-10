"use client";

import { useState } from "react";

export default function DropSet() {
  const [sets, setSets] = useState(1);
  const [rest, setRest] = useState(0);
  const [reps, setReps] = useState(0);
  const [weights, setWeights] = useState<number[]>([0]);

  const persianNumbers = [
    "اول",
    "دوم",
    "سوم",
    "چهارم",
    "پنجم",
    "ششم",
    "هفتم",
    "هشتم",
    "نهم",
    "دهم",
  ];

  const updateSets = (nextSets: number) => {
    setSets(nextSets);
    setWeights((prev) =>
      Array.from({ length: nextSets }, (_, index) => prev[index] ?? 0),
    );
  };
  const getMaxWeight = (index: number) =>
    index === 0 ? 500 : Math.max(0, weights[index - 1] - 0.5);

  return (
    <div dir="rtl" className="flex flex-col gap-5 my-8">
      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">ست</span>

        <div dir="ltr" className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => updateSets(Math.max(1, sets - 1))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            -
          </button>
          <span className="min-w-4 text-center text-base font-bold text-neutral-darker">
            {sets}
          </span>
          <button
            type="button"
            onClick={() => updateSets(Math.min(10, sets + 1))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">استراحت (ثانیه)</span>

        <div dir="ltr" className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setRest((prev) => Math.max(0, prev - 1))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            -
          </button>
          <span className="min-w-4 text-center text-base font-bold text-neutral-darker">
            {rest}
          </span>
          <button
            type="button"
            onClick={() => setRest((prev) => Math.min(300, prev + 1))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">تکرار</span>

        <div dir="ltr" className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setReps((prev) => Math.max(0, prev - 1))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            -
          </button>
          <span className="min-w-4 text-center text-base font-bold text-neutral-darker">
            {reps}
          </span>
          <button
            type="button"
            onClick={() => setReps((prev) => Math.min(10, prev + 1))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full rounded-[12px] bg-[#F5F5F5] p-3 flex flex-col gap-5 mt-3">
        <span className="text-sm text-neutral-darker">وزن (kg)</span>

        <div className="flex bg-white rounded-[12px] flex-col">
          {weights.map((weight, index) => (
            <div
              key={index}
              className="w-full rounded-[12px] p-3 flex items-center justify-between"
            >
              <span className="text-sm text-neutral-darker">
                ست {persianNumbers[index]}
              </span>

              <div dir="ltr" className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() =>
                    setWeights((prev) =>
                      prev.map((value, i) =>
                        i === index ? Math.max(0, value - 0.5) : value,
                      ),
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
                >
                  -
                </button>

                <span className="min-w-10 text-center text-base font-bold text-neutral-darker">
                  {weight.toFixed(1)}
                </span>

                <button
                  type="button"
                  disabled={index > 0 && weight >= getMaxWeight(index)}
                  onClick={() =>
                    setWeights((prev) =>
                      prev.map((value, i) =>
                        i === index
                          ? Math.min(
                              500,
                              index === 0
                                ? value + 0.5
                                : Math.min(value + 0.5, getMaxWeight(index)),
                            )
                          : value,
                      ),
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
