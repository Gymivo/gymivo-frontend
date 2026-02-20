"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import BastetballIcon from "@/public/welcome/basketball.svg";
import PhoneIcon from "@/public/welcome/phone.svg";
import PasswordballIcon from "@/public/welcome/password.svg";
import { TextField, InputAdornment } from "@mui/material";

export default function WelcomePage() {
  return (
    <div className="relative h-dvh max-w-[500px] mx-auto overflow-hidden bg-white flex flex-col">
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-[35%]"
        style={{
          background:
            "linear-gradient(180deg, #ECFB6D 30%, rgba(236,251,109,0) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[28%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(148,148,148,0.03) 30%, rgba(148,148,148,0.8) 100%)",
        }}
      />

      <main className="relative z-10 flex-1 px-5 pt-[clamp(24px,6vh,60px)] pb-10 flex flex-col justify-between min-h-0">

        <div className="flex flex-col items-center gap-4">

          <h1 className="text-center text-3xl font-bold text-neutral-darker">
            ورود به حساب
          </h1>

          <Image
            src={BastetballIcon}
            alt="welcome"
            priority
            className="object-contain"
            width={80}
            height={80}
          />

          <p className="text-center text-lg text-neutral-darker">
            خوش برگشتی رفیق ! جات خالی بود
          </p>

          <div className="w-full flex flex-col gap-3 mt-2">

            <TextField
              type="email"
              fullWidth
              placeholder="ایمیلتون هم بنویسید..."
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "16px",
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Image src={PhoneIcon} alt="mail" width={30} height={30} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type="password"
              fullWidth
              placeholder="پسوردتون..."
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "16px",
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Image src={PasswordballIcon} alt="password" width={30} height={30} />
                  </InputAdornment>
                ),
              }}
            />

            <Link
              href="/forgot-password"
              className="text-blue-600 underline text-sm text-right"
            >
              رمز عبورم رو فراموش کردم!
            </Link>

          </div>
        </div>

        <div className="flex flex-col items-center pt-4">

          <Link href="/welcome/login" className="w-full flex justify-center">
            <Button variant="black" size="cta">
              ورود
            </Button>
          </Link>

          <p className="pt-5 text-sm text-center text-black">
            اکانت نداشتی ؟{" "}
            <span className="text-blue-600 underline">
              میخوام ثبت نام کنم
            </span>
          </p>

        </div>
      </main>
    </div>
  );
}
