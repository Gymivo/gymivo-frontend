"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardFooter from "@/components/DashboardFooter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CakeIcon from "@mui/icons-material/Cake";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { TextField } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const weights = Array.from({ length: 300 - 20 + 1 }, (_, i) => 300 - i);

export default function EditProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "علی رضایی",
    phone: "09123456789",
    birthDate: "1379/12/25",
    username: "alireza",
    gender: "male",
    weight: 75,
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    router.back();
  };

  const defaultWeightIndex =
    weights.indexOf(form.weight) !== -1
      ? weights.indexOf(form.weight)
      : weights.indexOf(75);

  return (
    <div>
      <header className="sticky top-0 z-50 bg-neutral-200/90 backdrop-blur-md flex items-center justify-between px-4 py-3">
        <button
          onClick={handleSave}
          className="p-2 rounded-full hover:bg-primary-300/30 transition"
        >
          <CheckIcon style={{ color: "black", fontSize: 24 }} />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-neutral-darker">
            ویرایش پروفایل
          </h1>
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-black/10 transition"
          >
            <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
          </button>
        </div>
      </header>

      <main className="px-5 pb-24">
        <div className="flex justify-center my-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="/dashboard/coach1.jpg"
                alt="profile"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-300 rounded-full flex items-center justify-center shadow-md hover:bg-primary-400 transition">
              <CameraAltIcon style={{ fontSize: 16, color: "black" }} />
            </button>
          </div>
        </div>

        <div className="rounded-2xl p-5 flex flex-col gap-2 shadow-xs">
          <div className="flex items-end gap-2">
            <PersonOutlineIcon
              className="text-neutral-gray shrink-0 mb-2"
              fontSize="medium"
            />
            <TextField
              variant="standard"
              fullWidth
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="نام و نام خانوادگی"
              sx={{
                direction: "rtl",
                "& .MuiInputBase-root": { padding: "8px" },
                "& .MuiInputBase-input": { textAlign: "right" },
              }}
            />
          </div>

          <div className="flex items-end gap-2">
            <PhoneIphoneIcon
              className="text-neutral-gray shrink-0 mb-2"
              fontSize="medium"
            />
            <TextField
              variant="standard"
              fullWidth
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="شماره همراه"
              sx={{
                direction: "rtl",
                "& .MuiInputBase-root": { padding: "8px" },
                "& .MuiInputBase-input": { textAlign: "right" },
              }}
            />
          </div>

          <div className="flex items-end gap-2">
            <CakeIcon
              className="text-neutral-gray shrink-0 mb-2"
              fontSize="medium"
            />
            <TextField
              variant="standard"
              fullWidth
              value={form.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              placeholder="تاریخ تولد"
              sx={{
                direction: "rtl",
                "& .MuiInputBase-root": { padding: "8px" },
                "& .MuiInputBase-input": { textAlign: "right" },
              }}
            />
          </div>

          <div className="flex items-end gap-2">
            <AlternateEmailIcon
              className="text-neutral-gray shrink-0 mb-2"
              fontSize="medium"
            />
            <TextField
              variant="standard"
              fullWidth
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder="نام کاربری مثلا: mohammad@"
              sx={{
                direction: "rtl",
                "& .MuiInputBase-root": { padding: "8px" },
                "& .MuiInputBase-input": { textAlign: "right" },
              }}
            />
          </div>
        </div>

        <div className="relative border border-neutral-gray rounded-2xl p-4 mt-6">
          <span className="absolute -top-3 right-4 bg-neutral-200 px-2 text-sm font-bold text-neutral-gray">
            جنسیت
          </span>

          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => handleChange("gender", "female")}
              className={`
                flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all
                bg-[#FFF5F5] text-rose-500 font-semibold text-sm
                ${
                  form.gender === "female"
                    ? "border-2 border-rose-400 shadow-xs"
                    : "border-2 border-transparent"
                }
              `}
            >
              <FemaleIcon fontSize="small" />
              <span>خانم</span>
            </button>

            <button
              type="button"
              onClick={() => handleChange("gender", "male")}
              className={`
                flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all
                bg-[#EAF5FF] text-blue-600 font-semibold text-sm
                ${
                  form.gender === "male"
                    ? "border-2 border-blue-500 shadow-xs"
                    : "border-2 border-transparent"
                }
              `}
            >
              <MaleIcon fontSize="small" />
              <span>آقا</span>
            </button>
          </div>
        </div>

        <div className="relative border border-neutral-gray rounded-2xl p-4 mt-6">
          <span className="absolute -top-3 right-4 bg-neutral-200 px-2 text-sm font-bold text-neutral-gray">
            وزن (kg)
          </span>

          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
            <span className="text-base font-black text-neutral-darker mt-1">
              {form.weight} <span className="text-xs font-normal">kg</span>
            </span>
          </div>

          <div className="mt-8">
            <Swiper
              initialSlide={defaultWeightIndex}
              slidesPerView={23}
              centeredSlides={true}
              grabCursor={true}
              onSlideChange={(swiper) => {
                const selectedWeight = weights[swiper.activeIndex];
                handleChange("weight", selectedWeight);
              }}
              className="w-full py-2"
            >
              {weights.map((w) => {
                const isSelected = form.weight === w;
                const isMajor = w % 5 === 0;

                return (
                  <SwiperSlide
                    key={w}
                    className="flex justify-center items-end h-12 select-none"
                  >
                    <div className="flex flex-col items-center gap-1 cursor-pointer w-full">
                      <div
                        className={`rounded-full transition-all ${
                          isSelected
                            ? "w-1 h-9 bg-primary-400"
                            : isMajor
                              ? "w-0.5 h-7 bg-neutral-500"
                              : "w-[1px] h-5 bg-neutral-400"
                        }`}
                      />

                      {isMajor ? (
                        <span
                          className={`text-[9px] font-bold transition-all ${
                            isSelected
                              ? "text-black scale-110 font-black"
                              : "text-neutral-400"
                          }`}
                        >
                          {w}
                        </span>
                      ) : (
                        <span className="text-[9px] opacity-0 select-none">
                          -
                        </span>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
