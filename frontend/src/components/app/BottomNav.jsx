import { Link, useLocation } from "react-router-dom";
import {
  Satellite,
  Home,
  Leaf,
  Sprout,
  Droplets,
  CloudLightning,
  Wheat,
} from "lucide-react";

const TABS = [
  { to: "/", label: "Command", Icon: Satellite },
  { to: "/villages", label: "Villages", Icon: Home },
  { to: "/crop", label: "Crop AI", Icon: Leaf },
  { to: "/soil", label: "Soil", Icon: Sprout },
  { to: "/water", label: "Water", Icon: Droplets },
  { to: "/climate", label: "Climate", Icon: CloudLightning },
  { to: "/mandi", label: "Mandi", Icon: Wheat },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 w-full max-w-[428px] -translate-x-1/2 z-40 bg-white/80 backdrop-blur-xl border-t border-white/40 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
      <ul className="flex justify-around py-3 px-2">
        {TABS.map(({ to, label, Icon }) => {
          const active =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);

          return (
            <li key={to} className="relative">
              <Link to={to} className={`flex flex-col items-center justify-center w-14 h-12 transition-all ${active ? "scale-110" : "hover:scale-105"}`}>
                <div className={`relative flex items-center justify-center transition-colors ${active ? "text-emerald-600" : "text-slate-400"}`}>
                  <Icon size={22} className={active ? "drop-shadow-sm" : ""} />
                  {active && (
                    <span className="absolute -bottom-4 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                </div>
                <span className={`text-[10px] mt-1 transition-all font-medium ${active ? "text-emerald-700 opacity-100" : "text-slate-500 opacity-0 absolute translate-y-2 pointer-events-none"}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
