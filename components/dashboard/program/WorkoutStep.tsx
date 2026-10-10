import { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

type WorkoutStepProps = {
  sessionsPerWeek: number;
};

export default function WorkoutStep({ sessionsPerWeek }: WorkoutStepProps) {
  const [sessionNames, setSessionNames] = useState<string[]>(
    Array.from({ length: sessionsPerWeek }, () => "بی‌نام"),
  );
  const [editingSession, setEditingSession] = useState<number | null>(null);

  const router = useRouter();

  const openWorkoutPage = () => {
    router.push("/program/workout");
  };

  return (
    <div className="w-full my-3 flex flex-col gap-2 px-5">
      <div className="my-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-neutral-darker flex items-center justify-center shrink-0">
            <span className="text-base font-bold text-primary-300">۲</span>
          </div>

          <h2 className="text-xl font-bold text-neutral-darker">
            روزها و حرکات
          </h2>
        </div>

        <p className="text-xs text-neutral-dark mt-1">
          هر روز را باز کن و از کتابخانه حرکت اضافه کن
        </p>
      </div>

      <div dir="ltr" className="flex flex-col gap-3">
        {Array.from({ length: sessionsPerWeek }, (_, index) => {
          const sessionNumber = index + 1;
          const isEditing = editingSession === index;

          return (
            <div
              key={sessionNumber}
              className="w-full rounded-[15px] bg-neutral-white overflow-hidden"
            >
              <div className="h-14 px-4 flex items-center">
                <div className="w-1/3 flex justify-start">
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={() => setEditingSession(null)}
                      className="p-1 text-neutral-darker"
                    >
                      <CheckIcon sx={{ fontSize: 20 }} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingSession(index)}
                      className="p-1 text-neutral-dark hover:text-neutral-darker transition"
                    >
                      <BorderColorIcon sx={{ fontSize: 20 }} />
                    </button>
                  )}
                </div>

                <div className="w-1/3 flex justify-center text-xs font-medium text-neutral-dark">
                  بدون حرکت
                </div>

                <div className="w-1/3 flex justify-end text-sm font-bold text-neutral-darker">
                  {isEditing ? (
                    <input
                      autoFocus
                      value={sessionNames[index]}
                      onChange={(event) => {
                        setSessionNames((prev) => {
                          const next = [...prev];
                          next[index] = event.target.value;
                          return next;
                        });
                      }}
                      className="w-full text-right text-sm font-bold text-neutral-darker bg-transparent outline-none border-b border-neutral-light"
                    />
                  ) : (
                    <span>
                      جلسه {sessionNumber}: {sessionNames[index]}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full h-px bg-neutral-light" />

              <div className="min-h-40 flex flex-col items-center justify-between p-4">
                <img
                  src="/dashboard/program/file.svg"
                  alt="افزودن حرکت"
                  width={100}
                  height={120}
                  onClick={openWorkoutPage}
                  className="cursor-pointer"
                />

                <button
                  type="button"
                  onClick={openWorkoutPage}
                  className="w-full h-12 rounded-[15px] bg-neutral-white flex items-center justify-center gap-2 font-bold text-[16px] text-neutral-darker transition hover:bg-neutral-200"
                  style={{
                    border: "2px dashed #949494",
                  }}
                >
                  <span dir="rtl" className="flex items-center gap-2">
                    <AddIcon sx={{ fontSize: 20 }} />
                    <span>افزودن حرکت</span>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
