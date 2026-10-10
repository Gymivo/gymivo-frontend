"use client";

import { useState } from "react";

export default function NormalSet() {
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [rest, setRest] = useState(0);

  return (
    <div dir="rtl" className="flex flex-col gap-5 my-8">
      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">ست</span>

        <div dir="ltr" className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setSets((prev) => Math.max(1, prev - 1))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            -
          </button>
          <span className="w-10 text-center text-base font-bold text-neutral-darker">
            {sets}
          </span>
          <button
            type="button"
            onClick={() => setSets((prev) => Math.min(10, prev + 1))}
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
          <span className="w-10 text-center text-base font-bold text-neutral-darker">
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

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">وزن (kg)</span>

        <div dir="ltr" className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setWeight((prev) => Math.max(0, prev - 0.5))}
            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
          >
            -
          </button>
          <span className="w-10 text-center text-base font-bold text-neutral-darker">
            {weight.toFixed(1)}
          </span>
          <button
            type="button"
            onClick={() => setWeight((prev) => Math.min(500, prev + 0.5))}
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
          <span className="w-10 text-center text-base font-bold text-neutral-darker">
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
    </div>
  );
}
