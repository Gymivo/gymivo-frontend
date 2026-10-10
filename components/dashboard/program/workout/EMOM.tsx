"use client";

import { useState } from "react";

export default function EMOM() {
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  const renderCounter = (
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    min: number,
    max: number,
    step: number,
    decimal = false,
  ) => (
    <div dir="ltr" className="flex items-center gap-5">
      <button
        type="button"
        onClick={() => setValue((prev) => Math.max(min, prev - step))}
        className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
      >
        -
      </button>

      <span className="min-w-10 text-center text-base font-bold text-neutral-darker">
        {decimal ? value.toFixed(1) : value}
      </span>

      <button
        type="button"
        onClick={() => setValue((prev) => Math.min(max, prev + step))}
        className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-light rounded-lg"
      >
        +
      </button>
    </div>
  );

  const renderDisabled = (value: string) => (
    <div dir="ltr" className="flex items-center gap-5">
      <button
        type="button"
        disabled
        className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-dark rounded-lg opacity-30"
      >
        -
      </button>

      <span className="min-w-10 text-center text-sm font-bold text-neutral-dark">
        {value}
      </span>

      <button
        type="button"
        disabled
        className="w-8 h-8 flex items-center justify-center text-lg text-neutral-darker border border-neutral-dark rounded-lg opacity-30"
      >
        +
      </button>
    </div>
  );

  return (
    <div dir="rtl" className="flex flex-col gap-5 my-8">
      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">ست</span>
        {renderCounter(sets, setSets, 1, 10, 1)}
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">تکرار</span>
        {renderCounter(reps, setReps, 0, 10, 1)}
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">وزن (kg)</span>
        {renderCounter(weight, setWeight, 0, 500, 0.5, true)}
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-dark">زمان (ثانیه)</span>
        {renderDisabled("۶۰")}
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-dark">استراحت (ثانیه)</span>
        {renderDisabled("—")}
      </div>
    </div>
  );
}