"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import DashboardFooter from "@/components/DashboardFooter";
import EditIcon from "@mui/icons-material/Edit";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LanguageIcon from "@mui/icons-material/Language";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Weight from "@/public/svg/profile/weight.svg";
import Ruler from "@/public/svg/profile/ruler.svg";
import Calendar from "@/public/svg/profile/calendar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@/components/Button";
import { useAuth } from "@/components/AuthProvider";
import { profileApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError, type ProfileResponse } from "@/lib/types";
import { useRefetchOnShow } from "@/lib/use-refetch-on-show";

const toPersianDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export default function ProfilePage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-end px-4 gap-1">
        <div className="rounded-full hover:bg-black/10">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-black p-2 flex items-center justify-center focus:outline-none"
          >
            <MoreVertIcon fontSize="medium" />
          </button>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="absolute top-12 left-0 z-50 bg-white rounded-xl shadow-lg border border-neutral-100 p-1 min-w-[100px]">
              <Button
                variant="white"
                size="md"
                arrow="none"
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                  router.push("/welcome/login");
                }}
              >
                خروج
                <LogoutIcon fontSize="medium" />
              </Button>
            </div>
          </>
        )}
      </header>

      <main className="px-5 py-20 flex flex-col gap-5">
        <div className="w-full text-black text-lg flex items-center gap-1 flex-col">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-ligher">
            <Image
              src={profile.avatar?.url ?? "/dashboard/coach1.jpg"}
              alt="profile"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-center font-bold">
              {profile.fullName ?? "کاربر جیمیوو"}
            </p>

            <div className="flex flex-row items-center text-sm gap-1">
              {profile.username && (
                <>
                  <p dir="ltr">@{profile.username}</p>
                  <span>|</span>
                </>
              )}
              <p dir="ltr">{profile.phone}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-3">
          <div className="relative overflow-hidden flex-1 bg-white rounded-2xl p-3 flex flex-col items-center justify-center cursor-default bg-gradient-to-br from-white to-primary-100/50">
            <p className="text-neutral-600 text-md">سن:</p>
            <p className="text-neutral-700 font-semibold text-lg mt-1">
              {profile.age ? toPersianDigits(profile.age) : "—"}
            </p>
            <Image
              src={Calendar}
              alt=""
              className="absolute bottom-0 right-0 w-20 h-20 opacity-70 pointer-events-none"
            />
          </div>

          <div className="relative overflow-hidden flex-1 bg-white rounded-2xl p-3 flex flex-col items-center justify-center cursor-default bg-gradient-to-br from-white to-primary-100/50">
            <p className="text-neutral-600 text-md">وزن:</p>
            <p className="text-neutral-700 flex gap-1 font-semibold text-lg mt-1">
              {profile.weightKg != null ? (
                <>
                  <span dir="ltr">kg </span>
                  {toPersianDigits(profile.weightKg)}
                </>
              ) : (
                "—"
              )}
            </p>
            <Image
              src={Weight}
              alt=""
              className="absolute bottom-0 right-0 w-20 h-20 opacity-70 pointer-events-none"
            />
          </div>

          <div className="relative overflow-hidden flex-1 bg-white rounded-2xl p-3 flex flex-col items-center justify-center cursor-default bg-gradient-to-br from-white to-primary-100/50">
            <p className="text-neutral-600 text-md">قد:</p>
            <p className="text-neutral-700 flex gap-1 font-semibold text-lg mt-1">
              {profile.heightCm != null ? (
                <>
                  <span dir="ltr">cm</span>
                  {toPersianDigits(profile.heightCm)}
                </>
              ) : (
                "—"
              )}
            </p>
            <Image
              src={Ruler}
              alt=""
              className="absolute bottom-0 right-0 w-20 h-20 opacity-70 pointer-events-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          {[
            {
              label: "ویرایش پروفایل",
              path: "/dashboard/profile/edit",
              icon: EditIcon,
              description: "شماره همراه، قد، سن",
            },
            {
              label: "ارتباط با ما",
              path: "/dashboard/contact",
              icon: ContactSupportIcon,
              description: "پشتیبانی،ارسال پیشنهاد",
            },
            {
              label: "زبان",
              path: "/dashboard/language",
              icon: LanguageIcon,
              description: "تغییر زبان برنامه",
            },
            {
              label: "قوانین و مقررات",
              path: "/dashboard/terms",
              icon: GavelIcon,
              description: "حقوق ورزشکار و مربیان",
            },
            {
              label: "درباره ما",
              path: "/dashboard/about",
              icon: InfoIcon,
              description: "همه چیز درباری جیمیوو",
            },
            {
              label: "سوالات متداول",
              path: "/dashboard/faq",
              icon: HelpOutlineIcon,
              description: "پاسخ به سوالات پر تکرار شما",
            },
          ].map((item, idx) => {
            const Icon = item.icon;

            return (
              <button
                key={idx}
                onClick={() => router.push(item.path)}
                className="
                  group
                  w-full flex items-center justify-between
                  px-3 py-3
                  rounded-full
                  bg-white
                  transition-all duration-200
                  hover:bg-neutral-50
                  active:scale-[0.95]
                "
              >
                <div className="flex items-center gap-3">
                  <div className="p-1">
                    <Icon className="text-neutral-700" fontSize="small" />
                  </div>

                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-neutral-700 text-sm font-bold">
                      {item.label}
                    </span>
                    <span className="text-neutral-500 text-sm">
                      {item.description}
                    </span>
                  </div>
                </div>

                <ChevronLeftIcon
                  className="
                    text-neutral-700/60
                    group-hover:text-neutral-700
                    transition
                  "
                  fontSize="small"
                />
              </button>
            );
          })}
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
