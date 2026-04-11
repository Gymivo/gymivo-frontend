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


export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="relative bg-gray-50 top-0 left-0 w-full z-50 m-auto min-h-screen max-w-[400px]">

      <main className="pt-6 pb-24 px-5 flex flex-col gap-3">

        <div className="w-full text-black p-5 text-lg flex items-center gap-1 flex-col">
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
            <p className="text-center font-bold">
              علی رضایی
            </p>

            <div className="flex flex-row items-center text-sm gap-1">
              <p dir="ltr">
                @alireza
              </p>
              <span>|</span>
              <p>
                09123456789
              </p>
            </div>
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

        <div className="w-full flex flex-col gap-2">

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
                className="
                  group
                  w-full flex items-center justify-between
                  px-4 py-4
                  rounded-2xl
                  bg-neutral-darker
                  transition-all duration-200
                  hover:bg-neutral-dark
                  active:scale-[0.95]
                "
              >

                <div className="flex items-center gap-3">

                  <div className="
                    p-2 rounded-lg bg-neutral-dark
                    group-hover:bg-primary-300/20
                    transition
                  ">
                    <Icon className="text-primary-300" fontSize="small" />
                  </div>

                  <span className="text-white text-sm font-bold">
                    {item.label}
                  </span>

                </div>

                <ChevronLeftIcon
                  className="
                    text-white/60
                    group-hover:text-white
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
