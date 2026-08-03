"use client";

import DashboardFooter from "@/components/DashboardFooter";
import Terms from "@/components/terms/page";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TermsPage() {
    const router = useRouter();
  
  return (
    <div>
      <header className="sticky top-0 z-50 bg-neutral-200 backdrop-blur-xl flex items-center justify-end px-4 py-4">
        <h1 className="text-base font-bold text-neutral-darker">
          قوانین و مقررات
        </h1>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>
      </header>
      <Terms />
      <DashboardFooter />
    </div>
  );
}
