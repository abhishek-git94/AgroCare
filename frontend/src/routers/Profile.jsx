import { useState } from "react";
import {
  User,
  Award,
  Flame,
  Wifi,
  WifiOff,
  Languages,
  Bell,
  Tractor,
  Sprout,
  Trophy,
  ChevronRight,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-village.jpg";

const BADGES = [
  { I: Trophy, label: "Top Yield", color: "text-yellow-500", got: true },
  { I: Sprout, label: "30d Streak", color: "text-green-500", got: true },
  { I: Tractor, label: "5 Scans", color: "text-blue-500", got: true },
  { I: Award, label: "Organic Cert", color: "text-red-500", got: false },
];

export default function Profile() {
  const [online, setOnline] = useState(true);
  const [streak, setStreak] = useState(30);

  const addStreak = () => {
    setStreak(streak + 1);
    // Simple custom alert simulation instead of native alert for premium feel
    // Real implementation would use a toast notification
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-blue-50/50 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Profile"
        title="Ramesh Kumar"
        subtitle="Khairpur • 4.2 ha • since Kharif 2019"
      />

      <div className="p-4 space-y-5 -mt-6 relative z-10">
        {/* Farmer Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
            <Trophy size={100} />
          </div>

          <div className="flex gap-5 relative z-10">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-inner shadow-emerald-700/20">
                <User size={36} className="text-white drop-shadow-md" />
              </div>

              <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md border-2 border-white">
                L7
              </span>
            </div>

            <div className="flex-1 py-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-orange-100 text-orange-500 p-1 rounded-lg">
                  <Flame size={16} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{streak} <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Day Streak</span></h2>
              </div>

              <div className="bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-[72%] relative">
                  <div className="absolute inset-0 bg-white/20 w-full animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
              </div>

              <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                <span className="text-emerald-700">L7 Cultivator</span>
                <span>2840 / 4000 XP</span>
              </div>
            </div>
          </div>

          <button
            onClick={addStreak}
            className="mt-6 bg-slate-800 hover:bg-slate-900 active:scale-95 transition-all text-white w-full py-3.5 rounded-2xl font-bold shadow-md flex justify-center items-center gap-2"
          >
            <Sprout size={18} />
            Log Today's Field Check
          </button>
        </div>

        {/* Achievements */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-lg text-slate-800">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
              <Award size={20} />
            </div>
            Achievements
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BADGES.map((badge) => (
              <div
                key={badge.label}
                className={`bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center transition-all ${
                  !badge.got ? "opacity-50 grayscale hover:grayscale-0" : "hover:shadow-md hover:-translate-y-1 bg-white"
                }`}
              >
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${badge.got ? 'bg-slate-50 shadow-inner' : 'bg-slate-100'}`}>
                  <badge.I className={badge.color} size={24} />
                </div>

                <p className="font-bold text-slate-700 text-sm">{badge.label}</p>
                {badge.got && <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 mx-auto" />}
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl overflow-hidden shadow-sm">
          <Row
            Icon={online ? Wifi : WifiOff}
            iconColor={online ? "text-emerald-600" : "text-slate-400"}
            iconBg={online ? "bg-emerald-100" : "bg-slate-100"}
            label="Offline Sync"
            value={online ? "Live • 42 MB Cached" : "Paused"}
            onClick={() => setOnline(!online)}
          />

          <Row 
            Icon={Languages} 
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
            label="Language" 
            value="Hindi • English" 
          />

          <Row 
            Icon={Bell} 
            iconColor="text-rose-600"
            iconBg="bg-rose-100"
            label="Alerts" 
            value="Weather • Pest • Mandi" 
          />

          <Row 
            Icon={Tractor} 
            iconColor="text-orange-600"
            iconBg="bg-orange-100"
            label="Farm Setup" 
            value="4.2 ha • 3 plots" 
          />
        </div>
      </div>
    </div>
  );
}

function Row({ Icon, label, value, onClick, iconColor = "text-slate-600", iconBg = "bg-slate-100" }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-xl`}>
          <Icon size={20} />
        </div>
        <div className="text-left">
          <div className="font-bold text-slate-800">{label}</div>
          <small className="text-slate-500 font-medium">{value}</small>
        </div>
      </div>

      <ChevronRight size={20} className="text-slate-400" />
    </button>
  );
}
