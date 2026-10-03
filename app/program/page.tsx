"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardFooter from "@/components/DashboardFooter";
import DetailsStep from "@/components/dashboard/program/DetailsStep";
import WorkoutStep from "@/components/dashboard/program/WorkoutStep";
import NutritionStep from "@/components/dashboard/program/NutritionStep";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { profileApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type ProfileResponse } from "@/lib/types";
import ProgramStepFooter from "@/components/dashboard/program/ProgramStepFooter";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let cancelled = false;

    profileApi
      .get()
      .then((res) => {
        if (!cancelled) setProfile(res);
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

  if (!profile) {
    return (
      <div>
        <main className="flex items-center justify-center min-h-[70vh] pb-24">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-transparent" />
        </main>
        <DashboardFooter />
      </div>
    );
  }

  const steps = [
    {
      label: "مشخصات",
      icon: PersonOutlineIcon,
    },
    {
      label: "برنامه تمرینی",
      icon: FitnessCenterIcon,
    },
    {
      label: "تغذیه و نکات",
      icon: RestaurantOutlinedIcon,
    },
  ];

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between px-4 gap-1">
        <button className="p-2 rounded-full hover:bg-primary-300/30 transition disabled:opacity-40">
          <FeedbackOutlinedIcon style={{ color: "black", fontSize: 24 }} />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-neutral-darker">
            طراحی برنامه
          </h1>

          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
          </button>
        </div>
      </header>

      <main className="px-5 pt-20 flex flex-col gap-5">
        <div className="w-full flex items-center gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <button
                key={step.label}
                onClick={() => setActiveStep(index)}
                className={`flex-1 h-11 rounded-full flex items-center justify-center gap-1.5 text-xs font-medium transition ${
                  isActive
                    ? "bg-neutral-darker text-neutral-white"
                    : "bg-neutral-white text-neutral-dark"
                }`}
              >
                <Icon sx={{ fontSize: 18 }} />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {activeStep === 0 && <DetailsStep profile={profile} />}
        {/* {activeStep === 1 && <WorkoutStep />}
        {activeStep === 2 && <NutritionStep />} */}
      </main>
        <ProgramStepFooter>مرحله بعد</ProgramStepFooter>
    </div>
  );
}
