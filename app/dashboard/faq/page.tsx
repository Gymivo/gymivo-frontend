"use client";

import { useRouter } from "next/navigation";
import DashboardFooter from "@/components/DashboardFooter";
import FaqPage from "@/components/faq/page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function FAQPage() {
  const router = useRouter();

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-end px-4 gap-1">
        <h1 className="text-base font-bold text-neutral-darker">
          سوالات متداول
        </h1>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>
      </header>
      <FaqPage />
      <DashboardFooter />
    </div>
  );
}
