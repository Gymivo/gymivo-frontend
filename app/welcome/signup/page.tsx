"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import BastetballIcon from "@/public/welcome/basketball.svg";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { TextField, InputAdornment, Typography } from "@mui/material";
import { useAuth } from "@/components/AuthProvider";
import { NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError } from "@/lib/types";
import { normalizePersianDigits } from "@/lib/validators";

interface FieldErrors {
  phone?: string;
  password?: string;
  rePassword?: string;
  form?: string;
}

const textFieldSx = {
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
};

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  // Synchronous guard — state can be stale when a second submit fires before
  // React re-renders with loading=true.
  const submittingRef = useRef(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;

    // No client-side validation — the backend returns Persian field messages
    // (422 details) and we surface those.
    setErrors({});
    setLoading(true);
    try {
      await signUp(normalizePersianDigits(phone), password, rePassword);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        const next: FieldErrors = {};
        if (err.details?.length) {
          // 422 — map field-level messages onto their inputs.
          next.phone = err.getFieldError("phone");
          next.password = err.getFieldError("password");
          next.rePassword = err.getFieldError("rePassword");
          if (!next.phone && !next.password && !next.rePassword) {
            next.form = err.message;
          }
        } else {
          // e.g. 409 phone_already_exists — backend Persian message.
          next.form = err.message;
        }
        setErrors(next);
      } else {
        setErrors({ form: NETWORK_ERROR_MESSAGE });
      }
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-dvh bg-white flex flex-col">
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

      <main className="relative z-10 flex-1 px-5 pt-[clamp(32px,8vh,80px)] pb-12 flex flex-col">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-1 flex-col justify-between gap-6"
        >
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold text-neutral-darker leading-tight">
            ساخت حساب جدید
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
            سلام رفیق ! خوشحالیم که اومدی
          </p>

          <div className="w-full flex flex-col gap-3.5 mt-2">
            <TextField
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              fullWidth
              placeholder="شماره موبایلت رو بنویس..."
              value={phone}
              onChange={(e) =>
                setPhone(
                  normalizePersianDigits(e.target.value).replace(/\D/g, ""),
                )
              }
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              sx={textFieldSx}
              inputProps={{ maxLength: 11 }}
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
              autoComplete="new-password"
              fullWidth
              placeholder="پسوردت رو بنویس..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={textFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyIcon sx={{ fontSize: 24, color: "#949494" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type="password"
              autoComplete="new-password"
              fullWidth
              placeholder="دوباره بنویسش..."
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              error={Boolean(errors.rePassword)}
              helperText={errors.rePassword}
              sx={textFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyIcon sx={{ fontSize: 24, color: "#949494" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {errors.form && (
            <Typography
              variant="body2"
              sx={{ color: "error.main" }}
              className="text-center"
            >
              {errors.form}
            </Typography>
          )}

          <div className="w-full flex justify-center">
            <Button
              type="submit"
              variant="black"
              size="cta"
              disabled={loading}
            >
              {loading ? "در حال ساخت حساب..." : "ثبت‌نام"}
            </Button>
          </div>

          <p className="text-sm text-neutral-darker">
            قبلاً اومدی؟{" "}
            <Link
              href="/welcome/login"
              className="text-blue-600 underline font-semibold hover:text-blue-700 transition"
            >
              میخوام وارد بشم
            </Link>
          </p>
        </div>
        </form>
      </main>
    </div>
  );
}
