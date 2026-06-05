import {
  AlertTriangle,
  FlaskConical,
  Sparkles,
  TrendingUp,
  Layers,
  History,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-soil.jpg";

const NUTRIENTS = [
  { k: "N", label: "Nitrogen", v: 142, unit: "kg/ha", status: "Optimal" },
  { k: "P", label: "Phosphorus", v: 38, unit: "kg/ha", status: "Moderate" },
  { k: "K", label: "Potassium", v: 215, unit: "kg/ha", status: "Optimal" },
  { k: "pH", label: "Acidity", v: 5.2, unit: "", status: "Critical" },
  { k: "OC", label: "Organic C", v: 0.58, unit: "%", status: "Moderate" },
  { k: "CEC", label: "Exchange", v: 18.2, unit: "cmol" },
];

const MICRO = [
  { k: "Zn", v: 0.62, max: 1.5 },
  { k: "Fe", v: 4.8, max: 10 },
  { k: "B", v: 0.42, max: 1 },
  { k: "Cu", v: 0.31, max: 0.5 },
  { k: "Mn", v: 6.1, max: 12 },
  { k: "S", v: 14, max: 30 },
];

const HISTORY_DATA = [
  { m: "Mar", n: 118 },
  { m: "Apr", n: 124 },
  { m: "May", n: 131 },
  { m: "Jun", n: 135 },
  { m: "Jul", n: 142 },
  { m: "Aug", n: 142 },
];

const RECS = [
  {
    title: "Apply Lime",
    dose: "1.2 t/ha",
    why: "Increase soil pH",
  },
  {
    title: "DAP Top Dress",
    dose: "55 kg/ha",
    why: "Increase phosphorus",
  },
  {
    title: "Green Manure",
    dose: "Sun Hemp",
    why: "Improve organic carbon",
  },
];

export default function Soil() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Soil Matrix"
        title="Nutrient Intelligence"
        subtitle="Last test: 6 days ago"
      />

      <div className="p-4 space-y-5 -mt-6 relative z-10">
        <div className="bg-rose-50/90 backdrop-blur-md border border-rose-200/50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
          <div className="bg-rose-100 text-rose-600 p-2.5 rounded-2xl flex-shrink-0 animate-pulse">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-rose-900 font-bold text-lg leading-tight">Critical pH 5.2</h3>
            <p className="text-rose-800/80 text-sm mt-1 leading-relaxed">
              Soil acidity is reducing phosphorus uptake. Apply lime as per recommendation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {NUTRIENTS.map((item) => (
            <div key={item.k} className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-black text-slate-800 bg-slate-100 w-10 h-10 flex items-center justify-center rounded-xl">{item.k}</h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-lg ${
                  item.status === 'Optimal' ? 'bg-emerald-100 text-emerald-700' :
                  item.status === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700 animate-pulse'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-extrabold text-slate-800 tracking-tight">{item.v}</div>
                  <small className="text-slate-500 font-medium">{item.unit}</small>
                </div>
                <p className="text-sm text-slate-600 font-medium mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-xl">
              <Layers size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Micronutrients</h3>
          </div>

          <div className="space-y-4">
            {MICRO.map((item) => (
              <div key={item.k} className="group">
                <div className="flex justify-between items-end mb-1.5">
                  <span className="font-bold text-slate-700">{item.k}</span>
                  <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{item.v} <span className="text-slate-400 font-normal">/ {item.max}</span></span>
                </div>
                <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-amber-500 h-full rounded-full group-hover:opacity-80 transition-opacity"
                    style={{
                      width: `${Math.min((item.v / item.max) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
              <History size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Nitrogen Trend</h3>
            <div className="ml-auto flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-sm font-bold">
              <TrendingUp size={16} />
              +20%
            </div>
          </div>

          <div className="space-y-1">
            {HISTORY_DATA.map((item) => (
              <div key={item.m} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-2 rounded-xl transition-colors">
                <span className="font-medium text-slate-600">{item.m}</span>
                <span className="font-bold text-slate-800">{item.n} <span className="text-slate-400 text-xs font-normal">kg/ha</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <Sparkles size={120} />
          </div>
          
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold text-emerald-50">AI Recommendations</h3>
          </div>

          <div className="space-y-3 relative z-10">
            {RECS.map((item) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex gap-4 hover:bg-white/20 transition-colors"
              >
                <div className="bg-emerald-500/50 p-2.5 rounded-xl h-fit">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-emerald-100 font-semibold mt-0.5">{item.dose}</p>
                  <small className="text-emerald-200 mt-1 block opacity-90">{item.why}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex justify-center items-center gap-2">
          Add Soil Test
        </button>
      </div>
    </div>
  );
}
