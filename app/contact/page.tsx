"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";

import ContactIllustration from "@/public/contact/phone.svg";
import Profile from "@/public/contact/profile.svg";
import Mail from "@/public/contact/mail.svg";

export default function ContactPage() {
  return (
    <div className="m-auto min-h-screen max-w-[500px] relative">
      <Header />

      <main className="bg-white pt-36 px-4 py-12 text-center">
        <h1 className="text-5xl font-bold text-neutral-darker">
          ارتباط با ما
        </h1>

        <p className="mt-5 text-xl font-bold text-neutral-darker">
          هر چی بگی گوش میکنیم
        </p>

        <div className="mt-10 flex justify-center">
          <Image
            src={ContactIllustration}
            alt="Contact illustration"
            width={260}
            height={260}
            priority
          />
        </div>

        <p className="mt-10 text-xl px-5 leading-7 text-neutral-darker">
          ما این جاییم که دغدغه هات رو بشنویم و تموم تلاشمون رو میکنیم تا با ما بهترین تجربه ها رو داشته باشی . راستی! همه چیز بین خودمون میمونه.
        </p>
      </main>

        <div className="my-12 flex flex-col gap-6 px-2">
            <div className="flex items-end -gap-5">
                <Image
                    alt="profile"
                    src={Profile}
                    width={55}
                    height={55}
                    className="shrink-0"
                />

                <TextField
                    variant="standard"
                    fullWidth
                    placeholder="نام خودتون رو وارد کنید..."
                    sx={{
                    direction: "rtl",

                    "& .MuiInputBase-root": {
                        padding: "8px",
                    },

                    "& .MuiInputBase-input": {
                        textAlign: "right",
                    },
                    }}
                />
            </div>

            <TextField
                variant="outlined"
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
                    paddingRight: "8px",
                    paddingLeft: "8px",
                    },
                }}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <Image
                        src={Mail}
                        alt="mail"
                        width={30}
                        height={30}
                        />
                    </InputAdornment>
                    ),
                }}
            />

            <TextField
                variant="outlined"
                fullWidth
                multiline
                minRows={5}
                placeholder="صحبتتون..."
                sx={{
                    direction: "rtl",

                    "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    },

                    "& .MuiInputBase-input": {
                    textAlign: "right",
                    paddingRight: "8px",
                    paddingLeft: "8px",
                    },
                }}
            />

            <Button variant="primary" size="xl"> ارسال پیام </Button>
        </div>

      <Footer />
    </div>
  );
}
