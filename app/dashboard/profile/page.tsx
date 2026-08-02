"use client";

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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Weight from "@/public/svg/profile/weight.svg";
import Ruler from "@/public/svg/profile/ruler.svg";
import Calendar from "@/public/svg/profile/calendar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <main className="pb-20 p-5 flex flex-col gap-4">
        <div className="relative w-full flex justify-end">
          <div className="rounded-full hover:bg-black/10">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-black p-2 flex items-center justify-center focus:outline-none"
            >
              <MoreVertIcon fontSize="medium" />
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute top-12 left-0 z-50 bg-white rounded-xl shadow-lg border border-neutral-100 p-1 min-w-[100px]">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/welcome/login");
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg text-neutral-darker hover:bg-neutral-100 transition-colors"
              >
                <LogoutIcon fontSize="medium" />
                <span className="text-base">خروج</span>
              </button>
            </div>
          )}
        </div>
        <div className="w-full text-black text-lg flex items-center gap-1 flex-col">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/dashboard/coach1.jpg"
              alt="profile"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-center font-bold">علی رضایی</p>

            <div className="flex flex-row items-center text-sm gap-1">
              <p dir="ltr">@alireza</p>
              <span>|</span>
              <p>09123456789</p>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-3">
          <div className="relative overflow-hidden flex-1 bg-white rounded-2xl p-3 flex flex-col items-center justify-center cursor-default bg-gradient-to-br from-white to-primary-0">
            <p className="text-neutral-600 text-md">سن:</p>
            <p className="text-neutral-700 font-semibold text-lg mt-1">۲۵</p>
            <Image
              src={Calendar}
              alt=""
              className="absolute bottom-0 right-0 w-20 h-20 opacity-50 pointer-events-none"
            />
          </div>

          <div className="relative overflow-hidden flex-1 bg-white rounded-2xl p-3 flex flex-col items-center justify-center cursor-default bg-gradient-to-br from-white to-primary-0">
            <p className="text-neutral-600 text-md">وزن:</p>
            <p className="text-neutral-700 font-semibold text-lg mt-1">۷۵kg</p>
            <Image
              src={Weight}
              alt=""
              className="absolute bottom-0 right-0 w-20 h-20 opacity-50 pointer-events-none"
            />
          </div>

          <div className="relative overflow-hidden flex-1 bg-white rounded-2xl p-3 flex flex-col items-center justify-center cursor-default bg-gradient-to-br from-white to-primary-0">
            <p className="text-neutral-600 text-md">قد:</p>
            <p className="text-neutral-700 font-semibold text-lg mt-1">۱۸۰cm</p>
            <Image
              src={Ruler}
              alt=""
              className="absolute bottom-0 right-0 w-20 h-20 opacity-50 pointer-events-none"
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
              path: "/contact",
              icon: ContactSupportIcon,
              description: "پشتیبانی،ارسال پیشنهاد",
            },
            {
              label: "زبان",
              path: "/language",
              icon: LanguageIcon,
              description: "تغییر زبان برنامه",
            },
            {
              label: "قوانین و مقررات",
              path: "/terms",
              icon: GavelIcon,
              description: "حقوق ورزشکار و مربیان",
            },
            {
              label: "درباره ما",
              path: "/about",
              icon: InfoIcon,
              description: "همه چیز درباری جیمیوو",
            },
            {
              label: "سوالات متداول",
              path: "/faq",
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
