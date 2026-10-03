"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import DashboardFooter from "@/components/DashboardFooter";
import PlanStatusCard from "@/components/dashboard/PlanStatusCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import MoveCard from "@/components/dashboard/MoveCard";
import ReadyPlanCard from "@/components/dashboard/ReadyPlanCard";
import StartProgramModal from "@/components/dashboard/StartProgramModal";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { catalogApi, dashboardApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type DashboardResponse } from "@/lib/types";
import { useRefetchOnShow } from "@/lib/use-refetch-on-show";
import { useAuth } from "@/components/AuthProvider";

const toPersianDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    const request = isAuthenticated
      ? dashboardApi.get()
      : Promise.all([
          catalogApi.categories(),
          catalogApi.moves({ popular: true, pageSize: 20 }),
          catalogApi.readyPlans(),
        ]).then(
          ([categories, moves, plans]): DashboardResponse => ({
            user: {
              id: "",
              displayName: "ورزشکار",
              avatar: null,
              isPremium: false,
            },
            profileCompletion: {
              percent: 0,
              isComplete: false,
              missingFields: [],
            },
            latestPlan: null,
            categories,
            popularMoves: moves.items,
            readyPlans: plans.items,
          }),
        );

    request
      .then(setData)
      .catch((err: unknown) =>
        setError(
          err instanceof ApiError
            ? err.code === 0
              ? NETWORK_ERROR_MESSAGE
              : err.message
            : NETWORK_ERROR_MESSAGE,
        ),
      );
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useRefetchOnShow(fetchData);

  if (error) {
    return (
      <div>
        <main className="flex flex-col items-center justify-center gap-4 p-5 pt-24 pb-24 min-h-[70vh]">
          <p className="text-neutral-dark">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="rounded-xl bg-primary-300 px-5 py-2.5 text-sm font-bold text-neutral-darker"
          >
            تلاش دوباره
          </button>
        </main>
        <DashboardFooter />
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <main className="flex items-center justify-center min-h-[70vh] pb-24">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-transparent" />
        </main>
        <DashboardFooter />
      </div>
    );
  }

  const {
    user,
    profileCompletion,
    latestPlan,
    categories,
    popularMoves,
    readyPlans,
  } = data;

  return (
    <div>
      <header className="w-full h-16 flex items-center justify-between px-3">
        <div className="flex gap-1">
          <button
            onClick={() => router.push("/notifications")}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <NotificationsActiveIcon style={{ color: "black", fontSize: 27 }} />
          </button>
          <button
            onClick={() => router.push("/schedule")}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <CalendarMonthIcon style={{ color: "black", fontSize: 27 }} />
          </button>
        </div>

        <Link
          href="/dashboard/profile"
          className="flex items-center gap-1 rounded-full hover:bg-neutral-darker/10 transition p-1"
        >
          <div className="flex pr-2 flex-col items-center justify-center text-neutral-darker">
            <h2 className="font-bold text-sm">{user.displayName}</h2>
            <span className="font-extralight text-xs">وقت بخیر ورزشکار</span>
          </div>
          {user.avatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-gray">
              <Image
                src={user.avatar.url}
                alt={user.displayName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <AccountCircleIcon style={{ color: "black", fontSize: 40 }} />
          )}
        </Link>
      </header>

      <main className="flex flex-col items-center gap-6 p-5 pb-24">
        <SearchBox />

        <PlanStatusCard
          plan={latestPlan}
          onStartProgram={() => setStartModalOpen(true)}
        />

        <div className="w-full rounded-2xl p-2 bg-[linear-gradient(49deg,rgba(251,255,216,1)_2%,rgba(240,255,114,1)_99%)]">
          <div className="flex items-center gap-2">
            <div className="w-[95px] h-[95px] shrink-0 rounded-full border-[0.5px] border-neutral-darker flex items-center justify-center">
              <div className="w-[81px] h-[82px] rounded-full border-4 border-neutral-gray flex items-center justify-center">
                <span
                  dir="ltr"
                  className="text-2xl font-bold text-neutral-darker"
                >
                  {toPersianDigits(profileCompletion.percent)}%
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <p className="text-sm text-neutral-darker">
                {profileCompletion.isComplete
                  ? "پروفایلت کامله"
                  : "پروفایلت رو تکمیل کن"}
              </p>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-light text-neutral-darker">
                  کم تر از دو دقیقه
                </span>
                <TimerOutlinedIcon sx={{ fontSize: 12, color: "#212121" }} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="px-1 py-0.5 rounded-lg hover:bg-black/5 transition"
                >
                  <span dir="ltr" className="flex items-center gap-1">
                    <ArrowBackIcon sx={{ fontSize: 20, color: "#212121" }} />
                    <span className="text-sm font-semibold text-neutral-darker">
                      {profileCompletion.isComplete ? "مشاهده" : "تکمیل کن"}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <SectionHeader title="دسته بندی‌ها" href="/categories" />
          <div className="flex gap-2 overflow-x-auto pb-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  router.push(
                    `/moves?categoryId=${cat.id}&name=${encodeURIComponent(cat.name)}`,
                  )
                }
                className="flex flex-col items-center gap-0.5 shrink-0"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-0 flex items-center justify-center">
                  {cat.iconUrl && (
                    <Image
                      src={cat.iconUrl}
                      alt={cat.name}
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <span className="text-xs font-bold text-neutral-dark">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <SectionHeader title="حرکات محبوب" href="/moves" />
          <div className="flex gap-2 overflow-x-auto pb-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {popularMoves.map((move) => (
              <MoveCard key={move.id} move={move} href={`/moves/${move.id}`} />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <SectionHeader title="برنامه های آماده" href="/plans" />
          <div className="flex flex-col gap-2">
            {readyPlans.map((plan) => (
              <ReadyPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </main>

      <StartProgramModal
        open={startModalOpen}
        onClose={() => setStartModalOpen(false)}
      />

      <DashboardFooter />
    </div>
  );
}
