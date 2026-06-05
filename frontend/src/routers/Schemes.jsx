import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  IndianRupee,
  FileText,
  Filter,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-village.jpg";

const SCHEMES = [
  {
    id: "pmkisan",
    name: "PM-KISAN",
    amount: "₹6,000/yr",
    deadline: "Rolling",
    match: 96,
    status: "eligible",
    tag: "Income support",
  },
  {
    id: "pmfby",
    name: "PM Fasal Bima Yojana",
    amount: "Up to ₹2.0L",
    deadline: "Jul 31",
    match: 88,
    status: "eligible",
    tag: "Crop insurance",
  },
  {
    id: "kcc",
    name: "Kisan Credit Card",
    amount: "₹3.0L @ 4%",
    deadline: "Rolling",
    match: 82,
    status: "review",
    tag: "Credit line",
  },
  {
    id: "smam",
    name: "SMAM Machinery",
    amount: "40% subsidy",
    deadline: "Aug 15",
    match: 71,
    status: "eligible",
    tag: "Mechanization",
  },
  {
    id: "pkvy",
    name: "Paramparagat Krishi",
    amount: "₹50,000/ha",
    deadline: "Sep 10",
    match: 64,
    status: "missing",
    tag: "Organic cluster",
  },
];

const STATUS = {
  eligible: {
    color: "text-green-600",
    Icon: CheckCircle2,
    label: "Eligible",
  },
  review: {
    color: "text-yellow-600",
    Icon: Clock,
    label: "Review",
  },
  missing: {
    color: "text-red-600",
    Icon: FileText,
    label: "Docs Needed",
  },
};

export default function Schemes() {
  const [filter, setFilter] = useState("all");

  const filteredSchemes = SCHEMES.filter(
    (scheme) => filter === "all" || scheme.status === filter,
  );

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-blue-50/50 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Government Schemes"
        title="Subsidy Matcher"
        subtitle="38 active agriculture schemes"
      />

      <div className="p-4 space-y-5 -mt-6 relative z-10">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <IndianRupee size={120} />
          </div>
          
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <IndianRupee size={20} />
            </div>
            <span className="font-bold text-emerald-100">Eligible Value Per Year</span>
          </div>

          <h2 className="text-4xl font-black mt-2 tracking-tight relative z-10">
            ₹1,42,400
          </h2>

          <p className="text-emerald-200 font-medium text-sm mt-1 mb-5 relative z-10">Across 4 schemes</p>

          <div className="relative z-10">
            <div className="w-full bg-black/20 h-2.5 rounded-full mt-3 overflow-hidden backdrop-blur-sm border border-white/10">
              <div className="bg-gradient-to-r from-emerald-300 to-teal-300 h-full rounded-full w-[68%] shadow-[0_0_10px_rgba(52,211,153,0.5)] relative">
                <div className="absolute inset-0 bg-white/30 w-full animate-[pulse_2s_ease-in-out_infinite]" />
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-emerald-100 tracking-wide">CLAIMED 68%</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["all", "eligible", "review"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${
                filter === item 
                  ? "bg-emerald-600 text-white border-emerald-600 hover:shadow-md" 
                  : "bg-white/80 backdrop-blur-md text-slate-600 border-white/50 hover:bg-white"
              }`}
            >
              <Filter size={14} className="inline mr-1.5" />
              <span className="capitalize">{item}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredSchemes.map((scheme) => {
            const status = STATUS[scheme.status];
            
            const badgeClasses = 
              scheme.status === 'eligible' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
              scheme.status === 'review' ? 'bg-amber-100 text-amber-700 border-amber-200' :
              'bg-rose-100 text-rose-700 border-rose-200';

            return (
              <Link
                key={scheme.id}
                to={`/schemes/${scheme.id}`}
                className="block bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="bg-slate-100 p-3 rounded-2xl h-fit group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Landmark size={24} />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-slate-800 leading-tight">{scheme.name}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md">{scheme.tag}</span> <span className="mx-1">•</span> <span className="text-slate-400">Ends {scheme.deadline}</span>
                      </p>
                    </div>
                  </div>

                  <div className={`flex flex-col items-end px-2.5 py-1.5 rounded-xl border ${badgeClasses}`}>
                    <status.Icon size={16} className="mb-0.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">{status.label}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <small className="text-slate-400 font-medium block mb-0.5 text-xs uppercase tracking-wide">Est. Benefit</small>
                      <strong className="text-xl font-black text-slate-800">{scheme.amount}</strong>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Match</span>
                      <div className="text-lg font-black text-emerald-600">{scheme.match}%</div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        scheme.match > 80 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 
                        scheme.match > 50 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 
                        'bg-gradient-to-r from-rose-400 to-red-500'
                      }`}
                      style={{ width: `${scheme.match}%` }}
                    />
                  </div>
                </div>

                <button className="w-full mt-4 bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-indigo-600 rounded-xl py-3 flex justify-center items-center gap-2 transition-colors shadow-sm">
                  <ShieldCheck size={18} />
                  View & Apply
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
