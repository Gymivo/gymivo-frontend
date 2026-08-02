"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import BastetballIcon from "@/public/welcome/basketball.svg";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { TextField, InputAdornment } from "@mui/material";

export default function LoginPage() {
  return (
    <div className="relative h-dvh max-w-[375px] mx-auto overflow-hidden bg-white flex flex-col">
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-[40%]"
        style={{
          background:
            "linear-gradient(180deg, #ECFB6D 0%, rgba(236,251,109,0.6) 40%, rgba(236,251,109,0) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[35%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(148,148,148,0) 0%, rgba(148,148,148,0.15) 40%, rgba(148,148,148,0.6) 100%)",
        }}
      />

      <main className="relative z-10 flex-1 px-5 pt-[clamp(32px,8vh,80px)] pb-12 flex flex-col justify-between min-h-0">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold text-neutral-darker leading-tight">
            ورود به حساب
          </h1>

          <Image
            src={BastetballIcon}
            alt="basketball illustration"
            priority
            className="object-contain"
            width={80}
            height={80}
          />

          <p className="text-lg font-medium text-neutral-darker">
            خوش برگشتی رفیق ! جات خالی بود
          </p>

          <div className="w-full flex flex-col gap-3.5 mt-2">
            <TextField
              type="email"
              fullWidth
              placeholder="ایمیلتون هم بنویسید..."
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIphoneIcon sx={{ fontSize: 24, color: "#949494" }} />
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
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyIcon sx={{ fontSize: 24, color: "#949494" }} />
                  </InputAdornment>
                ),
              }}
            />

            <div className="w-full text-right px-1">
              <Link
                href="/forgot-password"
                className="text-blue-600 underline text-xs font-medium hover:text-blue-700 transition"
              >
                رمز عبورم رو فراموش کردم!
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <Link href="/dashboard" className="w-full flex justify-center">
            <Button variant="black" size="cta">
              ورود
            </Button>
          </Link>

          <p className="text-sm text-neutral-darker">
            اکانت نداشتی ؟{" "}
            <Link
              href="/welcome/signup"
              className="text-blue-600 underline font-semibold hover:text-blue-700 transition"
            >
              میخوام ثبت نام کنم
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
