"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardFooter from "@/components/DashboardFooter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { TextField, MenuItem, InputAdornment } from "@mui/material";

export default function EditProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "alireza",
    phone: "09123456789",
    weight: "75",
    height: "175",
    gender: "male",
    birthDate: "1379/12/25",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!form.username.trim()) newErrors.username = "نام کاربری الزامی است";
    if (!form.phone.trim()) newErrors.phone = "شماره همراه الزامی است";
    if (!form.weight.trim()) newErrors.weight = "وزن الزامی است";
    if (!form.height.trim()) newErrors.height = "قد الزامی است";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    router.back();
  };

  const bmi =
    form.weight && form.height
      ? (
          parseInt(form.weight) /
          ((parseInt(form.height) / 100) * (parseInt(form.height) / 100))
        ).toFixed(1)
      : null;

  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-black/10 transition"
        >
          <ArrowBackIcon style={{ color: "black", fontSize: 24 }} />
        </button>

        <h1 className="text-lg font-bold text-neutral-darker">
          ویرایش پروفایل
        </h1>

        <button
          onClick={handleSave}
          className="p-2 rounded-full hover:bg-primary-300/30 transition"
        >
          <CheckIcon style={{ color: "black", fontSize: 24 }} />
        </button>
      </header>

      <main className="px-5 pb-24">
        <div className="flex justify-center mt-6 mb-8">
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

        <div className="flex flex-col gap-4">
          <div>
            <TextField
              fullWidth
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder="نام کاربری"
              error={!!errors.username}
              helperText={errors.username}
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "14px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.username ? "#F44336" : "#E0E0E0",
                  },
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                  py: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon sx={{ fontSize: 18, color: "#949494" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              fullWidth
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="شماره همراه"
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "14px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.phone ? "#F44336" : "#E0E0E0",
                  },
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                  py: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon sx={{ fontSize: 18, color: "#949494" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              fullWidth
              type="number"
              value={form.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              placeholder="وزن (کیلوگرم)"
              error={!!errors.weight}
              helperText={errors.weight}
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "14px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.weight ? "#F44336" : "#E0E0E0",
                  },
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                  py: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span className="text-sm text-neutral-dark font-medium">
                      kg
                    </span>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              fullWidth
              type="number"
              value={form.height}
              onChange={(e) => handleChange("height", e.target.value)}
              placeholder="قد (سانتی‌متر)"
              error={!!errors.height}
              helperText={errors.height}
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "14px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.height ? "#F44336" : "#E0E0E0",
                  },
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                  py: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span className="text-sm text-neutral-dark font-medium">
                      cm
                    </span>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              fullWidth
              select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              placeholder="جنسیت"
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "14px",
                  backgroundColor: "white",
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                  py: 1.5,
                },
              }}
            >
              <MenuItem value="male">مرد</MenuItem>
              <MenuItem value="female">زن</MenuItem>
            </TextField>
          </div>

          <div>
            <TextField
              fullWidth
              value={form.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              placeholder="تاریخ تولد"
              sx={{
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  flexDirection: "row-reverse",
                  borderRadius: "14px",
                  backgroundColor: "white",
                },
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  px: 1.5,
                  py: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon sx={{ fontSize: 18, color: "#949494" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        {bmi && (
          <div className="mt-6 p-4 bg-white rounded-2xl border border-neutral-ligher">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-neutral-darker">
                شاخص توده بدنی (BMI)
              </span>
              <span className="text-lg font-black text-neutral-darker">
                {bmi}
              </span>
            </div>
            <div className="mt-2 w-full h-2 bg-neutral-ligher rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-300 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((parseFloat(bmi) / 40) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}
