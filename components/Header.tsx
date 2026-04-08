"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupsIcon from "@mui/icons-material/Groups";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HandshakeIcon from "@mui/icons-material/Handshake";
import gymivoIcon from "@/public/svg/header/gymivo.png";
import greenIcon from "@/public/svg/header/green-icon.svg";
import CloseIcon from '@mui/icons-material/Close';


const menuItems = [
  { label: "خانه", icon: HomeIcon, href: "/" },
  { label: "ثبت نام مربی", icon: HowToRegIcon, href: "/coach-register" },
  { label: "مربیان", icon: GroupsIcon, href: "/trainers" },
  { label: "حرکات ورزشی", icon: FitnessCenterIcon, href: "/moves" },
  { label: "درباره ما", icon: InfoIcon, href: "/about" },
  { label: "ارتباط با ما", icon: ContactMailIcon, href: "/contact" },
  { label: "همکاری با جیمیوو", icon: HandshakeIcon, href: "/cooperate" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseButtonClasses =
    "p-2 rounded-full hover:bg-white/10 transition flex items-center justify-center";

  return (
    <>
      <header className="w-[340px] h-16 z-50 fixed flex items-center p-3 border border-white/25 shadow-xs shadow-white rounded-3xl bg-black/60 backdrop-blur-[20px] top-[10px] left-1/2 -translate-x-1/2">
        <div className="flex w-full justify-between items-center">

          <div className="flex gap-1">
            <button onClick={() => setMenuOpen(true)} className={baseButtonClasses}>
              <MenuIcon className="text-white" fontSize="medium" />
            </button>
            <button className={baseButtonClasses}>
              <SearchIcon className="text-white" fontSize="medium" />
            </button>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src={gymivoIcon}
              alt="gymivo"
              width={100}
              height={24}
              className="cursor-pointer"
            />
          </Link>

          <Link href="/welcome" className={baseButtonClasses}>
            <AccountCircleIcon className="text-white" fontSize="medium" />
          </Link>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-screen w-[300px] z-50 transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-[#6E6E6ECC] backdrop-blur-[20px] rounded-l-[21px] px-4 py-2 flex flex-col gap-[10px] text-white">
          <div className="flex items-center justify-between m-4">
            <Image src={greenIcon} alt="logo" width={32} height={32} />
            <button onClick={() => setMenuOpen(false)}>
              <CloseIcon className="text-white" fontSize="large" />
            </button>
          </div>

          <nav className="flex flex-col gap-3 mt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  <Icon className="text-white" fontSize="medium" />
                  <span className="font-bold text-lg">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
