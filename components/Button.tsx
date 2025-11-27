"use client";

import clsx from "clsx";
import Image from "next/image";
import WhiteArrowRightIcon from "@/public/svg/button/white-arrow-right.svg";
import WhiteArrowLeftIcon from "@/public/svg/button/white-arrow-left.svg";
import BlackArrowRightIcon from "@/public/svg/button/black-arrow-right.svg";
import BlackArrowLeftIcon from "@/public/svg/button/black-arrow-left.svg";
import DisableArrowRightIcon from "@/public/svg/button/disable-arrow-right.svg";
import DisableArrowLeftIcon from "@/public/svg/button/disable-arrow-left.svg";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "black" | "white" | "primary";
  size?: "cta" | "sm" | "md" | "lg" | "xl" | "huge";
  arrow?: "none" | "left" | "right";
}

export default function Button({
  children,
  variant = "black",
  size = "cta",
  arrow = "none",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-[12px] font-vazirmatn font-bold flex items-center justify-center gap-2 transition";

  const variants = {
    black: disabled
      ? "bg-[#D5D5D5] text-[#949494] cursor-not-allowed"
      : "bg-[#212121] text-white hover:bg-[#6E6E6E]",
    white: disabled
      ? "bg-[#FFFFFF] text-[#949494] cursor-not-allowed"
      : "bg-[#FFFFFF] text-[#212121] hover:bg-[#E0E0E0] hover:text-[#575757]",
    primary: disabled
      ? "bg-[#FDFFF0] text-[#949494] cursor-not-allowed"
      : "bg-[#ECFB6D] text-[#212121] hover:bg-[#F4FF9A] hover:text-[#575757]",
  };

  const sizes = {
    cta: "w-[230px] h-[48px] px-[36px] py-[10px] text-[16px] rounded-[12px]",
    sm: "w-[104px] h-[32px] px-[12px] py-[6px] text-[12px] gap-[8px] rounded-[8px]",
    md: "w-[112px] h-[40px] px-[16px] py-[10px] text-[14px] gap-[8px] rounded-[12px]",
    lg: "w-[140px] h-[48px] px-[24px] py-[16px] text-[16px] gap-[8px] rounded-[12px]",
    xl: "w-[148px] h-[56px] px-[24px] py-[16px] text-[16px] gap-[8px] rounded-[12px]",
    huge: "w-[228px] h-[96px] px-[48px] py-[32px] text-[20px] gap-[8px] rounded-[12px]",
  };

  const getArrow = (side: "left" | "right") => {
    if (disabled) {
      return side === "left" ? DisableArrowLeftIcon : DisableArrowRightIcon;
    }

    if (variant === "black") {
      return side === "left" ? WhiteArrowLeftIcon : WhiteArrowRightIcon;
    } else if (variant === "white") {
      return side === "left" ? BlackArrowLeftIcon : BlackArrowRightIcon;
    } else {
      return side === "left" ? BlackArrowLeftIcon : BlackArrowRightIcon;
    }
  };

  return (
    <button
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], sizes[size])}
      {...props}
    >
      <span dir="ltr" className="flex items-center gap-2">
        {arrow === "left" && (
          <Image
            src={getArrow("left")}
            alt="arrow-left"
            width={20}
            height={20}
          />
        )}

        {children}

        {arrow === "right" && (
          <Image
            src={getArrow("right")}
            alt="arrow-right"
            width={20}
            height={20}
          />
        )}
      </span>
    </button>
  );
}
