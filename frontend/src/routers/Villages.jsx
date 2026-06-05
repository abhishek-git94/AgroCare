import {
  Users,
  MapPin,
  Sprout,
  Droplets,
  Zap,
  Trophy,
  Building2,
  Wheat,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-village.jpg";

const PLOTS = [
  {
    id: "KP-014",
    owner: "R. Suresh",
    crop: "Paddy",
    area: "1.8 ha",
    soil: "Loam",
    ndvi: 0.78,
  },
  {
    id: "KP-021",
    owner: "M. Devi",
    crop: "Cotton",
    area: "2.4 ha",
    soil: "Sandy",
    ndvi: 0.62,
  },
  {
    id: "KP-033",
    owner: "A. Kumar",
    crop: "Wheat",
    area: "1.1 ha",
    soil: "Clay",
    ndvi: 0.71,
  },
];

const RESOURCES = [
  { label: "Water", value: 72, Icon: Droplets },
  { label: "Power", value: 58, Icon: Zap },
  { label: "Seeds", value: 84, Icon: Sprout },
];

const LEADERBOARD = [
  { rank: 1, name: "S. Patel", yield: "62 q/ha" },
  { rank: 2, name: "R. Suresh", yield: "58 q/ha" },
  { rank: 3, name: "M. Devi", yield: "54 q/ha" },
];

export default function Villages() {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-emerald-50/50 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Village Twin"
        title="Khairpur Digital Twin"
        subtitle="2,847 residents • 312 farmers"
      />

      <div className="p-4 space-y-5 -mt-6 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Users} value="2.8k" label="Residents" color="text-teal-600" bg="bg-teal-100" />
          <StatCard icon={Sprout} value="312" label="Farmers" color="text-emerald-600" bg="bg-emerald-100" />
          <StatCard icon={MapPin} value="187" label="Plots" color="text-cyan-600" bg="bg-cyan-100" />
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
              <Building2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Twin Map</h3>
          </div>

          <div className="h-44 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group border border-emerald-200 cursor-pointer shadow-inner">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CgkJPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzNGQzOTkiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cgk8L3N2Zz4=')] opacity-50" />
            <MapPin size={32} className="text-emerald-600 mb-2 group-hover:scale-110 transition-transform drop-shadow-sm" />
            <span className="font-bold text-emerald-800 bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full text-sm">Village Digital Twin Map</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 ml-1">Resource Saturation</h3>

          <div className="space-y-4">
            {RESOURCES.map((r) => (
              <div key={r.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <r.Icon size={14} className="text-slate-400" /> {r.label}
                  </span>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{r.value}%</span>
                </div>

                <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full relative"
                    style={{ width: `${r.value}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[pulse_2s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
              <Trophy size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Top Farmers</h3>
          </div>

          <div className="space-y-2">
            {LEADERBOARD.map((f) => (
              <div key={f.rank} className="flex justify-between items-center bg-slate-50 border border-slate-100 py-3 px-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    f.rank === 1 ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                    f.rank === 2 ? 'bg-slate-200 text-slate-600 border border-slate-300' :
                    'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}>
                    {f.rank}
                  </span>
                  <span className="font-bold text-slate-800">{f.name}</span>
                </div>

                <span className="font-bold text-slate-600 text-sm">{f.yield}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
              <Wheat size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Active Plots</h3>
          </div>

          <div className="space-y-3">
            {PLOTS.map((p) => (
              <div key={p.id} className="flex justify-between items-center border border-slate-100 hover:bg-slate-50 transition-colors py-3 px-4 rounded-2xl">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-800">{p.owner}</strong>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{p.id}</span>
                  </div>

                  <div className="text-sm font-medium text-slate-600 mt-1 flex items-center gap-1.5">
                    <span className="text-emerald-600">{p.crop}</span> <span className="w-1 h-1 rounded-full bg-slate-300" /> {p.area}
                  </div>

                  <small className="text-xs text-slate-400 font-medium block mt-0.5 border border-slate-200 px-1.5 rounded w-fit">{p.soil}</small>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">NDVI</div>
                  <div className="text-lg font-black text-emerald-600">{p.ndvi}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color, bg }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-4 text-center shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transform">
      <div className={`mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-xl ${bg} ${color}`}>
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-black text-slate-800">{value}</h3>
      <p className="text-xs font-medium text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}
