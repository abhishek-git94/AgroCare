import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Activity,
  Layers,
  Plane,
  Thermometer,
  Leaf,
  Droplets,
  Sun,
  Radar,
  Sparkles,
  ChevronRight,
  Landmark,
  User,
} from "lucide-react";

import hero from "../assets/hero-command.jpg";

const LAYERS = [
  { id: "ndvi", label: "NDVI", Icon: Leaf, hint: "Greenness" },
  { id: "moist", label: "Moisture", Icon: Droplets, hint: "Surface H₂O" },
  { id: "drone", label: "Drone Grid", Icon: Plane, hint: "12 sectors" },
  { id: "thermal", label: "Thermal", Icon: Sun, hint: "ΔT scan" },
];

const KPI = [
  { label: "NDVI Mean", value: "0.72", delta: "+0.04" },
  { label: "Moisture", value: "61%", delta: "-3%" },
  { label: "Canopy °C", value: "29.4", delta: "+1.1" },
  { label: "Stress Idx", value: "0.18", delta: "-0.02" },
];

export default function Home() {
  const [layer, setLayer] = useState("ndvi");
  const [scanning, setScanning] = useState(false);

  return (
    <div className="bg-gradient-to-b from-green-50 to-slate-100 min-h-screen pb-10">
      <HeroPanel />

      <div className="p-4 space-y-5 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/schemes"
            className="group bg-white/80 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-all rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02]"
          >
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Landmark size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">Schemes</h4>
              <small className="text-emerald-600 font-medium">4 eligible</small>
            </div>
          </Link>

          <Link
            to="/profile"
            className="group bg-white/80 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-all rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02]"
          >
            <div className="bg-teal-100 p-2 rounded-xl text-teal-700 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <User size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">Profile</h4>
              <small className="text-teal-600 font-medium">30d streak</small>
            </div>
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {LAYERS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLayer(item.id)}
              className={`flex-shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                layer === item.id
                  ? "bg-green-600 text-white shadow-md shadow-green-600/30"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <item.Icon size={16} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {KPI.map((item) => (
            <div key={item.label} className="bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <small className="text-slate-500 font-medium">{item.label}</small>
              <h2 className="text-2xl font-bold text-slate-800 my-1">{item.value}</h2>
              <span className={`text-sm font-medium ${item.delta.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {item.delta}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Plane size={120} />
          </div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Drone Scan</h3>
              <p className="text-slate-500 text-sm mt-1">Sector G-04 · 12.4 ha</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
              <Plane size={20} />
            </div>
          </div>

          <button
            className={`w-full flex justify-center items-center gap-2 rounded-2xl px-4 py-3 mt-5 font-semibold text-white transition-all shadow-md ${
              scanning ? "bg-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-95 shadow-emerald-500/30 hover:shadow-emerald-500/50"
            }`}
            onClick={() => {
              if (scanning) return;
              setScanning(true);
              setTimeout(() => {
                setScanning(false);
              }, 2400);
            }}
          >
            {scanning ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Plane size={18} className="animate-bounce" /> Scanning Sector...
              </span>
            ) : (
              <>
                <Sparkles size={18} /> Deploy Drone Scan
              </>
            )}
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-3">Field Telemetry</h3>
          <div className="space-y-1">
            {[
              { text: "Aphid pressure rising", color: "text-rose-500", bg: "bg-rose-50" },
              { text: "Borewell yield decreased", color: "text-amber-500", bg: "bg-amber-50" },
              { text: "Wheat greenness increased", color: "text-emerald-500", bg: "bg-emerald-50" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                  <span className="text-slate-700 text-sm font-medium">{item.text}</span>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-5 shadow-xl text-white">
          <h3 className="text-sm font-medium text-slate-300">Active Layer</h3>
          <div className="flex items-end justify-between mt-1">
            <p className="text-xl font-bold">{LAYERS.find(l => l.id === layer)?.label || layer}</p>
            <span className="text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2 py-1 rounded-lg">LIVE</span>
          </div>

          <div className="w-full bg-slate-700/50 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full w-[72%] relative">
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400 flex items-center gap-1">
            <Radar size={12} /> Calibrated to Sentinel-2 · cloud cover 4%
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroPanel() {
  return (
    <section className="relative h-[260px]">
      <img src={hero} alt="Farmland" className="w-full h-full object-cover" />

      <div className="absolute bottom-4 left-4 text-white">
        <p>Sentinel Nexus</p>

        <h1 className="text-3xl font-bold">Command Center</h1>

        <p>Khairpur district · 1,284 ha under observation</p>
      </div>
    </section>
  );
}
