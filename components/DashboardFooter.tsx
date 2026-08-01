"use client";

import { usePathname, useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsIcon from "@mui/icons-material/Sports";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
  { name: "home", icon: HomeIcon, path: "/dashboard" },
  { name: "plans", icon: FitnessCenterIcon, path: "/plans" },
  { name: "coach", icon: SportsIcon, path: "/coach" },
  { name: "analyse", icon: AssessmentIcon, path: "/analyse" },
  { name: "profile", icon: SettingsIcon, path: "/profile" },
];

export default function DashboardFooter() {
  const pathname = usePathname();
  const router = useRouter();

  const baseStyle =
    "bg-neutral-darker/70 backdrop-blur-[10px] border border-white/10 rounded-full border border-white/25 shadow-xs shadow-white";

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div className="w-full max-w-[350px] p-3">
        <div
          className={`flex justify-between gap-1 p-1 items-center ${baseStyle}`}
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.path || pathname.startsWith(item.path + "/");

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className="relative flex items-center justify-center flex-1 rounded-full p-1 transition"
              >
                <div
                  className={`
                    flex items-center justify-center px-3 py-1.5 rounded-full transition-all duration-300
                    ${
                      isActive
                        ? "bg-primary-100 text-neutral-darker scale-105"
                        : "text-neutral-light hover:text-white"
                    }
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
