"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import menuIcon from "@/public/svg/header/menu.svg";
import searchIcon from "@/public/svg/header/search.svg";
import gymivoIcon from "@/public/svg/header/gymivo.png";
import greenIcon from "@/public/svg/header/green-icon.svg";
import userIcon from "@/public/svg/header/user-square.svg";
import closeIcon from "@/public/svg/header/close.svg";

import homeIcon from "@/public/svg/header/home.svg";
import coachIcon from "@/public/svg/header/coach.svg";
import trainersIcon from "@/public/svg/header/trainers.svg";
import movesIcon from "@/public/svg/header/moves.svg";
import aboutIcon from "@/public/svg/header/about.svg";
import contactIcon from "@/public/svg/header/contact.svg";
import cooperateIcon from "@/public/svg/header/cooperate.svg";

const menuItems = [
  { label: "خانه", icon: homeIcon, href: "/" },
  { label: "ثبت نام مربی", icon: coachIcon, href: "/coach-register" },
  { label: "مربیان", icon: trainersIcon, href: "/trainers" },
  { label: "حرکات ورزشی", icon: movesIcon, href: "/moves" },
  { label: "درباره ما", icon: aboutIcon, href: "/about" },
  { label: "ارتباط با ما", icon: contactIcon, href: "/contact" },
  { label: "همکاری با جیمیوو", icon: cooperateIcon, href: "/cooperate" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="w-[343px] h-16 z-50 fixed flex items-center p-[20px_16px] rounded-2xl bg-[#595858B2] backdrop-blur-[20px] top-[10px] left-1/2 -translate-x-1/2">
        <div className="flex w-full justify-between items-center">

          <div className="flex gap-3">
            <button onClick={() => setMenuOpen(true)}>
              <Image src={menuIcon} alt="menu" width={24} height={24} />
            </button>
            <Image src={searchIcon} alt="search" width={24} height={24} />
          </div>

          <Image src={gymivoIcon} alt="gymivo" width={100} height={24} />

          <div className="flex gap-3 items-center">
            <span className="text-white">ورود</span>
            <Image src={userIcon} alt="user" width={24} height={24} />
          </div>

        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 h-screen w-[300px]
          z-50
          transition-transform duration-300 ease-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div
          className="
            h-full
            bg-[#6E6E6ECC]
            backdrop-blur-[20px]
            rounded-l-[21px]
            px-4 py-2
            flex flex-col
            gap-[10px]
            text-white
          "
        >
          <div className="flex items-center justify-between m-4">
            <button onClick={() => setMenuOpen(false)}>
              <Image src={closeIcon} alt="close" width={15} height={15} />
            </button>
            <Image src={greenIcon} alt="logo" width={30} height={30} />
          </div>

          <nav className="flex flex-col gap-3 mt-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-2
                  px-2 py-2
                  rounded-lg
                  hover:bg-white/10
                  transition
                "
              >
                <Image src={item.icon} alt={item.label} width={22} height={22} />
                <span className="font-bold text-lg">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
