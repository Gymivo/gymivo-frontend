import type { ProfileResponse } from "@/lib/types";

type DetailsStepProps = {
  profile: ProfileResponse;
};

export default function DetailsStep({ profile }: DetailsStepProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-neutral-darker flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary-300">۱</span>
        </div>

        <h2 className="text-xl font-bold text-neutral-darker">
          هدف و رشته
        </h2>
      </div>

      <p className="text-xs text-neutral-dark">
        اطلاعات کلی و پایه برنامه جهت شروع
      </p>
    </div>
  );
}