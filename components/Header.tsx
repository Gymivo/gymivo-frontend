"use client";

import Image from "next/image";
import menuIcon from "@/public/svg/menu.svg";
import searchIcon from "@/public/svg/search.svg";
import gymivoIcon from "@/public/svg/gymivo.svg";
import userIcon from "@/public/svg/user-square.svg";


export default function Header() {
  return (
    <header className="w-[343px] h-16 flex items-center p-[20px_16px] rounded-2xl bg-[#6E6E6E80] backdrop-blur-[20px] absolute top-[10] left-1/2 -translate-x-1/2">
      <div className="flex w-full justify-between items-center">

        <div className="flex gap-3">
          <Image src={menuIcon} alt="menu" width={24} height={24} />
          <Image src={searchIcon} alt="search" width={24} height={24} />
        </div>
        <div className="flex">
          <Image src={gymivoIcon} alt="gimivo" width={100} height={24} />
        </div>
        <div className="flex gap-3 items-center">
          <span>ورود</span>
          <Image src={userIcon} alt="user" width={24} height={24} />
        </div>
      </div>

    </header>
  );
}
