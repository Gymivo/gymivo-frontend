"use client";

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SectionHeaderProps {
  title: string;
  href: string;
}

/** Section title + «مشاهده همه» button (wireFrame-button style from Figma). */
export default function SectionHeader({ title, href }: SectionHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-2">
      <h2 className="text-lg text-neutral-darker font-bold">{title}</h2>
      <button
        onClick={() => router.push(href)}
        className="px-2 py-1 rounded-lg hover:bg-black/5 transition"
      >
        <span dir="ltr" className="flex items-center gap-1">
          <ArrowBackIcon sx={{ fontSize: 16, color: "#6E6E6E" }} />
          <span className="text-sm font-semibold text-neutral-dark">
            مشاهده همه
          </span>
        </span>
      </button>
    </div>
  );
}
