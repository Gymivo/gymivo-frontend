"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardFooter from "@/components/DashboardFooter";
import { catalogApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type Category } from "@/lib/types";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    catalogApi
      .categories()
      .then((res) => {
        if (!cancelled) setCategories(res);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof ApiError
            ? err.code === 0
              ? NETWORK_ERROR_MESSAGE
              : err.message
            : NETWORK_ERROR_MESSAGE,
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between px-4 gap-1">
        <h1 className="text-base font-bold text-neutral-darker">
          دسته بندی‌ها
        </h1>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>
      </header>

      <main className="px-5 py-20 pb-24">
        {error && (
          <p className="text-center text-sm text-[#F44336]">{error}</p>
        )}

        {!categories && !error && (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-transparent" />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => router.push(`/moves?categoryId=${cat.id}`)}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-xs transition hover:bg-neutral-50 active:scale-95"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-0 flex items-center justify-center">
                {cat.iconUrl && (
                  <Image
                    src={cat.iconUrl}
                    alt={cat.name}
                    width={28}
                    height={28}
                  />
                )}
              </div>
              <span className="text-xs font-bold text-neutral-dark">
                {cat.name}
              </span>
              <span className="flex items-center gap-0.5 text-[10px] font-light text-neutral-gray">
                مشاهده
                <ChevronLeftIcon sx={{ fontSize: 12, color: "#6E6E6E" }} />
              </span>
            </button>
          ))}
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
