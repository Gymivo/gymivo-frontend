"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import ContactIllustration from "@/public/contact/phone.svg";
import Profile from "@/public/contact/profile.svg";
import EmailIcon from "@mui/icons-material/Email";
import { contactApi, NETWORK_ERROR_MESSAGE } from "@/lib/api";
import { ApiError } from "@/lib/types";

interface ContactPageProps {
  /** The dashboard variant links the message to the signed-in account. */
  signedIn?: boolean;
}

interface FieldErrors {
  fullName?: string;
  email?: string;
  message?: string;
  form?: string;
}

export default function ContactPage({ signedIn = false }: ContactPageProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (sending) return;
    setErrors({});
    setSending(true);
    try {
      const res = await contactApi.send(
        { fullName, email, message },
        { auth: signedIn },
      );
      setSentMessage(res.message);
    } catch (err) {
      if (err instanceof ApiError) {
        const next: FieldErrors = {};
        const fullNameErr = err.getFieldError("fullName");
        const emailErr = err.getFieldError("email");
        const messageErr = err.getFieldError("message");
        if (fullNameErr) next.fullName = fullNameErr;
        if (emailErr) next.email = emailErr;
        if (messageErr) next.message = messageErr;
        if (Object.keys(next).length === 0) {
          next.form = err.code === 0 ? NETWORK_ERROR_MESSAGE : err.message;
        }
        setErrors(next);
      } else {
        setErrors({ form: NETWORK_ERROR_MESSAGE });
      }
    } finally {
      setSending(false);
    }
  };

  if (sentMessage) {
    return (
      <main className="px-5 py-20 text-center">
        <h1 className="text-4xl font-bold text-neutral-darker">ارتباط با ما</h1>
        <div className="mt-10 flex justify-center">
          <Image
            src={ContactIllustration}
            alt="Contact illustration"
            width={250}
            height={250}
            priority
          />
        </div>
        <p className="mt-10 text-xl font-bold text-neutral-darker">
          {sentMessage}
        </p>
      </main>
    );
  }

  return (
    <main className="px-5 py-20 text-center">
      <h1 className="text-4xl font-bold text-neutral-darker">ارتباط با ما</h1>
      <p className="mt-5 text-xl font-bold text-neutral-darker">
        هر چی بگی گوش میکنیم
      </p>
      <div className="mt-10 flex justify-center">
        <Image
          src={ContactIllustration}
          alt="Contact illustration"
          width={250}
          height={250}
          priority
        />
      </div>
      <p className="mt-10 text-xl px-5 leading-7 text-neutral-darker">
        ما این جاییم که دغدغه هات رو بشنویم و تموم تلاشمون رو میکنیم تا با ما
        بهترین تجربه ها رو داشته باشی . راستی! همه چیز بین خودمون میمونه.
      </p>

      <div className="my-10 flex flex-col gap-6 px-2">
        {errors.form && (
          <p className="text-sm text-[#F44336]">{errors.form}</p>
        )}

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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="نام خودتون رو وارد کنید..."
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیلتون هم بنویسید..."
          error={Boolean(errors.email)}
          helperText={errors.email}
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
                <EmailIcon style={{ fontSize: 30 }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          fullWidth
          multiline
          minRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="صحبتتون..."
          error={Boolean(errors.message)}
          helperText={errors.message}
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

        <Button
          variant="primary"
          size="xl"
          disabled={sending}
          onClick={handleSubmit}
        >
          {sending ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </div>
    </main>
  );
}
