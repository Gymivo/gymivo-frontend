"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardFooter from "@/components/DashboardFooter";
import FaqPage from "@/components/faq/page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function FAQPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <header className="sticky top-0 z-50 bg-neutral-200 backdrop-blur-xl flex items-center justify-end px-4 py-4">
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
