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

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="relative bg-neutral-ligher top-0 left-0 w-full z-50 m-auto min-h-screen max-w-[400px]">

      <main className="pt-6 pb-24 px-5 flex flex-col gap-3">

        <div className="w-full bg-neutral-darker rounded-2xl p-4 flex items-center justify-between">

          <div className="flex flex-col text-right">

            <p className="text-white font-bold text-lg">
              علی رضایی
            </p>

            <p className="text-primary-300 text-sm font-bold mt-1">
              مربی
            </p>

            <p className="text-white text-sm mt-2">
              @alireza
            </p>

            <p className="text-white text-xs mt-1">
              09123456789
            </p>

          </div>

          <div className="w-20 h-20 rounded-full border-2 border-primary-300 overflow-hidden">
            <Image
              src="/dashboard/coach1.jpg"
              alt="profile"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

        </div>

        <div className="w-full flex gap-3">

          <div className="flex-1 bg-neutral-darker rounded-2xl p-3 flex flex-col items-center justify-center">
            <p className="text-white text-md">سن:</p>
            <p className="text-primary-300 font-bold text-lg mt-1">۲۵</p>
          </div>

          <div className="flex-1 bg-neutral-darker rounded-2xl p-3 flex flex-col items-center justify-center">
            <p className="text-white text-md">وزن:</p>
            <p className="text-primary-300 font-bold text-lg mt-1">۷۵kg</p>
          </div>

          <div className="flex-1 bg-neutral-darker rounded-2xl p-3 flex flex-col items-center justify-center">
            <p className="text-white text-md">قد:</p>
            <p className="text-primary-300 font-bold text-lg mt-1">۱۸۰cm</p>
          </div>

        </div>

        <div className="w-full bg-neutral-darker rounded-2xl overflow-hidden">

          {[
            { label: "ویرایش پروفایل", path: "/profile/edit", icon: EditIcon },
            { label: "ارتباط با ما", path: "/contact", icon: ContactSupportIcon },
            { label: "زبان", path: "/language", icon: LanguageIcon },
            { label: "قوانین و مقررات", path: "/terms", icon: GavelIcon },
            { label: "درباره ما", path: "/about", icon: InfoIcon },
            { label: "سوالات متداول", path: "/faq", icon: HelpOutlineIcon },
          ].map((item, idx) => {
            const Icon = item.icon;

            return (
              <button
                key={idx}
                onClick={() => router.push(item.path)}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-4
                  transition
                  hover:bg-neutral-dark
                  ${idx !== 5 ? "border-b border-neutral-dark" : ""}
                `}
              >

                <div className="flex items-center gap-3">

                  <div className="p-2 rounded-lg bg-neutral-dark">
                    <Icon style={{ fontSize: 20, color: "#ECFB6D" }} />
                  </div>

                  <span className="text-white text-sm font-bold">
                    {item.label}
                  </span>

                </div>

                <span className="text-white text-lg">
                  {">"}
                </span>

              </button>
            );
          })}

        </div>

      </main>

      <DashboardFooter />
    </div>
  );
}
