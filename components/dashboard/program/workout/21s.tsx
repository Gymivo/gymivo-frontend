"use client";

import { useState } from "react";

export default function TwentyOneS() {
  const [sets, setSets] = useState(1);
  const [rest, setRest] = useState(0);

  const [lowerReps, setLowerReps] = useState(0);
  const [lowerWeight, setLowerWeight] = useState(0);

  const [upperReps, setUpperReps] = useState(0);
  const [upperWeight, setUpperWeight] = useState(0);

  const [fullReps, setFullReps] = useState(0);
  const [fullWeight, setFullWeight] = useState(0);

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

  const renderRangeSection = (
    title: string,
    reps: number,
    setReps: React.Dispatch<React.SetStateAction<number>>,
    weight: number,
    setWeight: React.Dispatch<React.SetStateAction<number>>,
  ) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-neutral-darker">{title}</span>

    <div className="bg-white rounded-[12px] p-3 flex flex-col gap-5">
            <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">تکرار</span>
        {renderCounter(reps, setReps, 0, 10, 1)}
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">وزن (kg)</span>
        {renderCounter(weight, setWeight, 0, 500, 0.5, true)}
      </div>
    </div>
    </div>
  );

  return (
    <div dir="rtl" className="flex flex-col gap-5 my-8">
      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">ست</span>
        {renderCounter(sets, setSets, 1, 10, 1)}
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-neutral-darker">استراحت (ثانیه)</span>
        {renderCounter(rest, setRest, 0, 300, 1)}
      </div>

      <div className="w-full rounded-[12px] bg-[#F5F5F5] p-3 flex flex-col gap-5 mt-3">
        {renderRangeSection(
          "نیم دامنه پایین",
          lowerReps,
          setLowerReps,
          lowerWeight,
          setLowerWeight,
        )}

        {renderRangeSection(
          "نیم دامنه بالا",
          upperReps,
          setUpperReps,
          upperWeight,
          setUpperWeight,
        )}

        {renderRangeSection(
          "دامنه کامل",
          fullReps,
          setFullReps,
          fullWeight,
          setFullWeight,
        )}
      </div>
    </div>
  );
}
