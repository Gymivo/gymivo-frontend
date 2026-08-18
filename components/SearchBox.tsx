"use client";

import SearchIcon from "@mui/icons-material/Search";

/** Dashboard search input — Figma frame #985:555. */
export default function SearchBox() {
  return (
    <div className="w-full flex items-center justify-between gap-2 bg-white rounded-xl h-14 px-[7px]">
      <input
        type="text"
        placeholder="جستجو کنید ..."
        className="flex-1 bg-transparent outline-none text-sm text-neutral-darker placeholder:text-neutral-gray"
      />
      <div className="shrink-0 p-1 rounded-lg bg-[rgba(224,224,224,0.5)]">
        <SearchIcon sx={{ fontSize: 24, color: "#6E6E6E" }} />
      </div>
    </div>
  );
}
