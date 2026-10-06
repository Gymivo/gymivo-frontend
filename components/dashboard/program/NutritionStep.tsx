export default function NutritionStep() {
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
    </div>
  );
}
