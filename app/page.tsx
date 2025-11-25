import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Header />

        <main className="pt-36 px-5 w-full max-w-[343px] mx-auto">
          <div className="flex flex-col text-center items-center">
            <p className="font-vazirmatn font-bold text-[40px] leading-[60px]">
              با ما مربیت
            </p>
            <p className="font-vazirmatn text-primary-300 font-bold text-[40px] leading-[60px]">
              همیشه
            </p>
            <p className="font-vazirmatn font-bold text-[40px] leading-[60px]">
              کنارته!
            </p>

            <p className="mt-4 font-vazirmatn font-bold text-[24px] leading-[38px] text-center px-4">
              به راحتی مربیت رو پیدا کن، برنامه بگیر، تغییراتت رو ببین و پیشرفت کن.
            </p>
          </div>
        </main>
    </div>
  );
}
