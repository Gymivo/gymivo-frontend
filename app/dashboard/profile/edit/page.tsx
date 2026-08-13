"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardFooter from "@/components/DashboardFooter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CakeIcon from "@mui/icons-material/Cake";
import Male from "@/public/svg/profile/gender/male.svg";
import Female from "@/public/svg/profile/gender/female.svg";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { TextField } from "@mui/material";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import MeasureRuler from "@/components/MeasureRuler";
import Picker from "react-mobile-picker";

const weights = Array.from({ length: 300 - 20 + 1 }, (_, i) => 300 - i);
const heights = Array.from({ length: 250 - 100 + 1 }, (_, i) => 250 - i);

const years = Array.from({ length: 1403 - 1320 + 1 }, (_, i) =>
  (1403 - i).toString(),
);
const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export default function EditProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "علی رضایی",
    phone: "09123456789",
    birthDate: "۱ فروردین ۱۴۰۰",
    username: "alireza",
    gender: "male",
    weight: 75,
    height: 175,
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [pickerValue, setPickerValue] = useState({
    year: "1400",
    month: "فروردین",
    day: "1",
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    router.back();
  };

  const handleConfirmDate = () => {
    setForm((prev) => ({
      ...prev,
      birthDate: `${pickerValue.day} ${pickerValue.month} ${pickerValue.year}`,
    }));
    setIsDatePickerOpen(false);
  };

  const reduce = useReducedMotion();
  const silhouettePx = Math.round(180 + (form.height - 100) * 0.52);

  return (
    <MotionConfig reducedMotion="user">
    <div>
      <header className="sticky top-0 z-50 -mb-16 h-16 w-full bg-neutral-200 flex items-center justify-between px-4 gap-1">
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

      <main className="px-5 py-20">
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

          <div
            className="flex items-end gap-2 cursor-pointer"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <CakeIcon
              className="text-neutral-gray shrink-0 mb-2"
              fontSize="medium"
            />
            <TextField
              variant="standard"
              fullWidth
              value={form.birthDate}
              placeholder="تاریخ تولد"
              sx={{
                direction: "rtl",
                pointerEvents: "none",
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

        <div className="relative border border-neutral-gray rounded-2xl p-4 pb-2 mt-6">
          <span className="absolute -top-3 right-4 bg-neutral-200 px-2 text-sm font-bold text-neutral-gray">
            وزن (kg)
          </span>

          <MeasureRuler
            values={weights}
            value={form.weight}
            onChange={(v) => handleChange("weight", v)}
            orientation="horizontal"
            unit="kg"
          />
        </div>

        <div className="bg-white rounded-xl h-[290px] mt-6 p-4 grid grid-cols-3 gap-2 overflow-hidden shadow-xs relative">
          <div className="relative h-full flex items-center justify-center overflow-hidden">
            <MeasureRuler
              values={heights}
              value={form.height}
              onChange={(v) => handleChange("height", v)}
              orientation="vertical"
              unit="cm"
            />
          </div>

          <div className="flex items-center justify-center relative h-full min-h-[250px]">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                form.gender === "female"
                  ? "opacity-0 scale-90 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <motion.div
                animate={{ height: silhouettePx }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 170, damping: 18 }
                }
              >
                <Image
                  src={Male}
                  alt="Male"
                  width={116}
                  height={289}
                  priority
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                form.gender === "female"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <motion.div
                animate={{ height: silhouettePx }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 170, damping: 18 }
                }
              >
                <Image
                  src={Female}
                  alt="Female"
                  width={105}
                  height={289}
                  priority
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            </div>
          </div>

          <div className="p-2 flex flex-col items-start">
            <span className="text-sm text-neutral-darker">
              قد:
              <motion.span
                key={form.height}
                initial={{ scale: 0.7, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="font-black text-lg inline-block"
                dir="ltr"
              >
                {form.height.toLocaleString("fa-IR")} cm
              </motion.span>
            </span>

            <span className="text-sm text-neutral-darker mt-3">
              وزن:
              <motion.span
                key={form.weight}
                initial={{ scale: 0.7, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="font-black text-lg inline-block"
                dir="ltr"
              >
                {form.weight.toLocaleString("fa-IR")} kg
              </motion.span>
            </span>
          </div>
        </div>
      </main>

      {isDatePickerOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-[390px] bg-[#F9FAFB] rounded-t-[35px] p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <button
                type="button"
                onClick={handleConfirmDate}
                className="text-base font-bold text-neutral-darker hover:opacity-80 transition"
              >
                ثبت
              </button>

              <span className="text-base font-bold text-neutral-darker">
                تاریخ تولد
              </span>

              <button
                type="button"
                onClick={() => setIsDatePickerOpen(false)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs hover:bg-neutral-100 transition"
              >
                <CloseIcon style={{ fontSize: 18, color: "#333" }} />
              </button>
            </div>

            <div className="my-2 dir-ltr relative select-none">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-[#F9FFC5] rounded-lg pointer-events-none z-0" />

              <div className="relative z-10">
                <Picker
                  value={pickerValue}
                  onChange={setPickerValue}
                  wheelMode="normal"
                >
                  <Picker.Column name="day">
                    {days.map((option) => (
                      <Picker.Item key={option} value={option}>
                        {({ selected }) => (
                          <div
                            className={`text-center transition-all select-none ${
                              selected
                                ? "font-black text-black text-base"
                                : "text-neutral-400 text-sm"
                            }`}
                          >
                            {option}
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>

                  <Picker.Column name="month">
                    {months.map((option) => (
                      <Picker.Item key={option} value={option}>
                        {({ selected }) => (
                          <div
                            className={`text-center transition-all select-none ${
                              selected
                                ? "font-black text-black text-base"
                                : "text-neutral-400 text-sm"
                            }`}
                          >
                            {option}
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>

                  <Picker.Column name="year">
                    {years.map((option) => (
                      <Picker.Item key={option} value={option}>
                        {({ selected }) => (
                          <div
                            className={`text-center transition-all select-none ${
                              selected
                                ? "font-black text-black text-base"
                                : "text-neutral-400 text-sm"
                            }`}
                          >
                            {option}
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                </Picker>
              </div>
            </div>
          </div>
        </div>
      )}

      <DashboardFooter />
    </div>
    </MotionConfig>
  );
}
