"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DashboardFooter from "@/components/DashboardFooter";
import { catalogApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type Move } from "@/lib/types";

export default function MoveDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [move, setMove] = useState<Move | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    catalogApi
      .move(id)
      .then((res) => {
        if (!cancelled) setMove(res);
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
  }, [id]);

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between px-4 gap-1">
        <h1 className="text-base font-bold text-neutral-darker">حرکت</h1>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>
      </header>

      <main className="px-5 py-20 pb-24 flex flex-col gap-4">
        {error && (
          <p className="text-center text-sm text-[#F44336]">{error}</p>
        )}

        {!move && !error && (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-transparent" />
          </div>
        )}

        {move && (
          <>
            <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-neutral-ligher">
              {move.image?.url && (
                <Image
                  src={move.image.url}
                  alt={move.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_70%,rgba(33,33,33,0.55)_100%)]" />
              <div className="absolute bottom-3 start-3 end-3">
                <h2 className="text-xl font-bold text-white">{move.name}</h2>
              </div>
            </div>

            {move.categoryName && (
              <span className="self-start rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-neutral-dark">
                دسته: {move.categoryName}
              </span>
            )}

            <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-2">
              <h3 className="text-sm font-bold text-neutral-darker">
                عضلات درگیر
              </h3>
              <div className="flex flex-wrap gap-2">
                {move.muscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="flex items-center gap-1 rounded-lg bg-primary-100 px-2 py-1"
                  >
                    <FitnessCenterIcon
                      sx={{ fontSize: 12, color: "#6E6E6E" }}
                    />
                    <span className="text-[10px] font-semibold text-neutral-dark">
                      {muscle}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}
