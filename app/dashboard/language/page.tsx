"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import DashboardFooter from "@/components/DashboardFooter";
import { settingsApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type LanguageOption } from "@/lib/types";

export default function LanguagePage() {
  const router = useRouter();
  const [languages, setLanguages] = useState<LanguageOption[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    settingsApi
      .getLanguages()
      .then((res) => {
        if (!cancelled) setLanguages(res);
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

  const selectLanguage = async (code: string) => {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      await settingsApi.update(code);
      setLanguages((prev) =>
        prev?.map((l) => ({ ...l, isActive: l.code === code })) ?? null,
      );
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.code === 0
            ? NETWORK_ERROR_MESSAGE
            : err.message
          : NETWORK_ERROR_MESSAGE,
      );
    } finally {
      setSaving(false);
    }
  };

  const active = languages?.find((l) => l.isActive) ?? null;
  const others = languages?.filter((l) => !l.isActive) ?? [];

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between px-4 gap-1">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <CheckIcon style={{ color: "black", fontSize: 24 }} />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-neutral-darker">زبان</h1>
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
          </button>
        </div>
      </header>

      <main className="p-5 py-20">
        {error && (
          <p className="text-center text-sm text-[#F44336] mb-3">{error}</p>
        )}

        {!languages ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-transparent" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-xs font-bold text-neutral-dark text-right px-1">
                زبان فعال
              </h2>

              {active && (
                <button
                  onClick={() => selectLanguage(active.code)}
                  disabled={saving}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-neutral-50 border-2 border-primary-300 transition-all text-left"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-300 flex items-center justify-center">
                    <CheckIcon style={{ fontSize: 16, color: "black" }} />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-neutral-darker">
                      {active.name}
                    </span>
                    <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200">
                      <Image
                        src={active.flagUrl}
                        alt={active.code}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </button>
              )}
            </div>

            <hr className="border-neutral-100" />

            <div className="flex flex-col gap-3">
              <h2 className="text-xs font-bold text-neutral-dark text-right px-1">
                زبان‌ها
              </h2>

              <div className="flex flex-col gap-2">
                {others.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    disabled={saving}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-neutral-50/60 hover:bg-neutral-50 transition-all text-left"
                  >
                    <span className="text-xs font-bold text-neutral-dark bg-neutral-200 px-2.5 py-1 rounded-full">
                      {lang.nativeName}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-neutral-darker">
                        {lang.name}
                      </span>
                      <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200">
                        <Image
                          src={lang.flagUrl}
                          alt={lang.code}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}
