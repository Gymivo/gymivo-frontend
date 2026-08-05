"use client";

import DashboardFooter from "@/components/DashboardFooter";
import About from "@/components/about/page";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-end">
        <h1 className="text-base font-bold text-neutral-darker">
          درباره ما
        </h1>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>
      </header>
      <About />
      <DashboardFooter />
    </div>
  );
}
