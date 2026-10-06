import Button from "@/components/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import Image from "next/image";
import BlackArrowRightIcon from "@/public/svg/button/black-arrow-right.svg";

type ProgramStepFooterProps = {
  step: number;
  onNext: () => void;
  onBack: () => void;
};

export default function ProgramStepFooter({
  step,
  onNext,
  onBack,
}: ProgramStepFooterProps) {
  return (
    <div className="w-full bg-neutral-white p-3 flex justify-center rounded-t-[18px]">
      {step === 0 && (
        <Button variant="primary" size="full" arrow="left" onClick={onNext}>
          مرحله بعد
        </Button>
      )}

      {(step === 1 || step === 2) && (
        <div className="w-full flex gap-2">
          <div className="w-1/3">
            <button
              type="button"
              onClick={onBack}
              className="w-full h-full rounded-[12px] bg-neutral-white border border-neutral-light flex items-center justify-center gap-2 font-bold text-[16px] text-neutral-darker transition hover:bg-neutral-200"
            >
              <span dir="ltr" className="flex items-center gap-2">
                <span>بازگشت</span>

                <Image
                  src={BlackArrowRightIcon}
                  alt="arrow-right"
                  width={20}
                  height={20}
                />
              </span>
            </button>
          </div>

          <div className="w-2/3">
            <Button variant="primary" size="full" arrow="none" onClick={onNext}>
              {step === 2 ? (
                <>
                  ثبت برنامه
                  <DescriptionIcon sx={{ fontSize: 20 }} />
                </>
              ) : (
                "مرحله بعد"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
