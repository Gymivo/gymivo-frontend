"use client";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const texts = [
  "جستجوی مربی ...",
  "بدنسازی حرفه‌ای ...",
  "برنامه کات ...",
  "تمرین اینتروال ...",
  "کاهش وزن ...",
  "عضله‌سازی ...",
];

export default function SearchBox() {
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (isDeleting) {
      if (placeholder.length === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        const timeout = setTimeout(() => {
          setPlaceholder(currentText.slice(0, placeholder.length - 1));
        }, 40);
        return () => clearTimeout(timeout);
      }
    } else {
      if (placeholder.length === currentText.length) {
        const timeout = setTimeout(() => setIsDeleting(true), 1500);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setPlaceholder(currentText.slice(0, placeholder.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      }
    }
  }, [placeholder, isDeleting, textIndex]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 bg-white border rounded-2xl p-1 pr-3  transition-all">
        <div className="hover:bg-neutral-100 p-2 bg-neutral-50 rounded-xl transition cursor-pointer">
          <SearchIcon style={{ fontSize: 20, color: "rgb(100 100 100)" }} />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-transparent h-12 outline-none text-sm text-neutral-700 placeholder:text-neutral-400 rounded-xl"
          />
          {showCursor && placeholder.length > 0 && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-neutral-300 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
