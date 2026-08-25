"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardFooter from "@/components/DashboardFooter";
import MoveCard from "@/components/dashboard/MoveCard";
import { catalogApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type Move } from "@/lib/types";

function MovesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const categoryName = searchParams.get("name") ?? undefined;

  // `forCategory` tracks which request the current items belong to, so the
  // loading state can be derived without resetting state inside the effect.
  const [result, setResult] = useState<{
    categoryId?: string;
    items: Move[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    catalogApi
      .moves({ page: 1, pageSize: 50, categoryId })
      .then((res) => {
        if (!cancelled) setResult({ categoryId, items: res.items });
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
  }, [categoryId]);

  const loading = !result || result.categoryId !== categoryId;
  const moves = result && result.categoryId === categoryId ? result.items : null;

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between px-4 gap-1">
        <h1 className="text-base font-bold text-neutral-darker">
          {categoryName ?? "حرکات"}
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

        {loading && !error && (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-transparent" />
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          {moves?.map((move) => (
            <MoveCard key={move.id} move={move} href={`/moves/${move.id}`} />
          ))}
          {moves?.length === 0 && (
            <p className="text-neutral-dark mt-8">
              حرکتی در این دسته پیدا نشد.
            </p>
          )}
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}

export default function MovesPage() {
  return (
    <Suspense>
      <MovesList />
    </Suspense>
  );
}
