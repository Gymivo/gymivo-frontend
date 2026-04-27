"use client";

import { usePathname, useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsIcon from '@mui/icons-material/Sports';
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";

const navItems = [
  { name: "home", icon: HomeIcon, path: "/dashboard" },
  { name: "plans", icon: FitnessCenterIcon, path: "/plans" },
  { name: "coach", icon: SportsIcon, path: "/coach" },
  { name: "analyse", icon: InsightsIcon, path: "/analyse" },
  { name: "profile", icon: PersonIcon, path: "/profile" },
];

export default function DashboardFooter() {
  const pathname = usePathname();
  const router = useRouter();

  const baseStyle = "bg-neutral-darker/70 backdrop-blur-[10px] border border-white/10 rounded-2xl border border-white/25 shadow-xs shadow-white";

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div className="w-full max-w-[340px] px-4 pb-4">
        <div className={`flex justify-between gap-1 p-1 items-center ${baseStyle}`}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              pathname.startsWith(item.path + "/");

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className="relative flex flex-col items-center justify-center flex-1 rounded-xl hover:bg-white/20 transition"
              >
                <div
                  className={`
                    absolute inset-0 rounded-xl
                    transition-all duration-300
                    ${isActive
                      ? "opacity-60 scale-100 bg-gradient-to-r from-primary-300/40 via-primary-300/30 to-primary-300/40"
                      : "opacity-0 scale-75"
                    }
                  `}
                />

                <div
                  className={`
                    relative z-10 p-2 rounded-xl
                    transition-all duration-300
                    ${isActive ? "text-primary-300 scale-110" : "text-white/60"}
                  `}
                >
                  <Icon fontSize="medium" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
