import {
  TrendingUp,
  TrendingDown,
  Minus,
  BellRing,
  Truck,
  Sparkles,
  BadgeIndianRupee,
  Calculator,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-mandi.jpg";

const PRICES = [
  { c: "Paddy", p: 2280, d: 1.4, t: "up" },
  { c: "Wheat", p: 2425, d: 0, t: "flat" },
  { c: "Cotton", p: 7150, d: -2.1, t: "down" },
  { c: "Turmeric", p: 14820, d: 3.8, t: "up" },
  { c: "Onion", p: 1840, d: -4.6, t: "down" },
  { c: "Mustard", p: 5640, d: 0.6, t: "up" },
];

const SCHEMES = [
  {
    name: "PM-KISAN",
    status: "Eligible",
    amount: "₹6,000/yr",
  },
  {
    name: "MSP Paddy",
    status: "Active",
    amount: "₹2,300/q",
  },
  {
    name: "Crop Insurance",
    status: "Pending docs",
    amount: "—",
  },
];

export default function Mandi() {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-teal-50/50 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Mandi"
        title="Market Pulse"
        subtitle="Khairpur APMC · live · ₹/quintal"
      />

      <div className="p-4 space-y-5 -mt-6 relative z-10">
        <div className="bg-emerald-50/90 backdrop-blur-md border border-emerald-200/50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
          <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl flex-shrink-0 animate-pulse">
            <Sparkles size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-emerald-900 font-bold text-sm tracking-wide uppercase opacity-80 mb-0.5">Top Mover</h3>
            <p className="text-xl font-bold text-slate-800">Turmeric <span className="text-emerald-600">₹14,820</span></p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1"><TrendingUp size={12} />+3.8%</span>
              <small className="text-slate-500 font-medium">7 day high</small>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 ml-1">Today's Prices</h3>

          <div className="space-y-1">
            {PRICES.map((p) => {
              const Icon = p.t === "up" ? TrendingUp : p.t === "down" ? TrendingDown : Minus;
              const colorClass = p.t === "up" ? "text-emerald-500" : p.t === "down" ? "text-rose-500" : "text-slate-400";
              const bgClass = p.t === "up" ? "bg-emerald-50" : p.t === "down" ? "bg-rose-50" : "bg-slate-50";

              return (
                <div
                  key={p.c}
                  className="flex justify-between items-center border-b border-slate-100 last:border-0 py-3 hover:bg-slate-50/50 px-2 rounded-xl transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{p.c}</h4>
                    <small className="text-slate-500 font-medium">per quintal</small>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-800 text-lg">₹{p.p.toLocaleString()}</div>
                    <div className={`flex items-center justify-end gap-1 font-bold text-xs mt-0.5 ${colorClass}`}>
                      <div className={`${bgClass} p-0.5 rounded-md`}>
                        <Icon size={12} />
                      </div>
                      {p.d > 0 ? `+${p.d}` : p.d}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
              <BadgeIndianRupee size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Schemes & MSP</h3>
          </div>

          <div className="space-y-3">
            {SCHEMES.map((s) => (
              <div key={s.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center hover:shadow-sm transition-shadow">
                <div>
                  <h4 className="font-bold text-slate-800">{s.name}</h4>
                  <small className={`font-medium ${s.status === 'Eligible' || s.status === 'Active' ? 'text-emerald-600' : 'text-amber-500'}`}>{s.status}</small>
                </div>
                <span className="font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100">{s.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
              <Truck size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Transport Calculator</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Quintals" value="42" />
            <Field label="Distance" value="18 km" />
            <Field label="Rate" value="₹12/km" />
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 mt-4 flex justify-between items-center text-white shadow-lg shadow-emerald-500/20">
            <span className="flex items-center gap-2 font-medium">
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <Calculator size={18} />
              </div>
              Net Realisation
            </span>
            <strong className="text-2xl tracking-tight">₹95,544</strong>
          </div>
        </div>

        <button className="w-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all rounded-3xl p-5 flex gap-4 items-center group">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <BellRing size={24} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-slate-800 text-lg">Set Price Alert</h4>
            <small className="text-slate-500 font-medium">Get notified when crops cross your threshold</small>
          </div>
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-center items-center text-center">
      <small className="text-slate-500 font-medium mb-1">{label}</small>
      <div className="font-bold text-slate-800">{value}</div>
    </div>
  );
}
