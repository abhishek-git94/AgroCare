import { useEffect, useState } from "react";
import {
  Droplets,
  Waves,
  TrendingDown,
  TrendingUp,
  // Calendar,
  CloudRain,
  Gauge,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-water.jpg";
import { getWaterDashboard } from "../services/water.service";

export default function Water() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getWaterDashboard();
        setData(result);
      } catch (error) {
        console.error("Failed to load water dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Water Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-slate-100 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Hydrology"
        title="Groundwater Pulse"
        subtitle="Aquifer recharge tracked across borewells"
      />

      <div className="p-4 space-y-5 -mt-6 relative z-10">

        {/* Gauge Cards */}
        <div className="grid grid-cols-2 gap-3">
          <GaugeCard
            label="Aquifer"
            value={data.aquifer}
          />

          <GaugeCard
            label="Reservoir"
            value={data.reservoir}
          />
        </div>

        {/* Trend */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">
              Saturation Trend
            </h3>

            <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
              <Waves size={20} />
            </div>
          </div>

          <div className="flex items-end gap-2 h-28 mt-2">
            {data.trend.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-blue-600 to-cyan-400 flex-1 rounded-t-lg relative group"
                style={{
                  height: `${item}%`,
                }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                  {item}%
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Irrigation Schedule */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
              <Calendar size={20} />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Today's Irrigation
            </h3>
          </div>

          <div className="space-y-3">
            {data.irrigation_schedule.map((item) => (
              <div
                key={item.sector}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold text-slate-800">
                    {item.sector}
                    <span className="mx-1 text-slate-400">·</span>

                    <span className="text-emerald-600">
                      {item.crop}
                    </span>
                  </h4>

                  <small className="text-slate-500">
                    {item.time} · {item.dur} · {item.liters} L
                  </small>
                </div>

                <div
                  className={`px-3 py-1 text-xs font-bold rounded-lg ${
                    item.state === "running"
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {item.state.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wells */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Borewell Readings
          </h3>

          {data.wells.map((well, idx) => (
            <div
              key={well.id}
              className={`py-4 flex justify-between items-center ${
                idx !== data.wells.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-50 border border-cyan-100 p-2 rounded-xl">
                  <Droplets
                    size={20}
                    className="text-cyan-600"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">
                    {well.id}
                  </h4>

                  <small className="text-slate-500">
                    Level: {well.level}
                  </small>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold">
                  {well.yield}
                </div>

                <div className="flex items-center gap-1 justify-end">
                  {well.trend === "up" && (
                    <TrendingUp
                      size={14}
                      className="text-green-500"
                    />
                  )}

                  {well.trend === "down" && (
                    <TrendingDown
                      size={14}
                      className="text-red-500"
                    />
                  )}

                  {well.trend === "stable" && (
                    <span className="w-2 h-0.5 bg-slate-400 rounded-full" />
                  )}

                  <small className="capitalize">
                    {well.trend}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rainfall */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <CloudRain size={120} />
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <div className="bg-white/20 p-2 rounded-xl">
              <CloudRain size={20} />
            </div>

            <h3 className="text-lg">
              Rain Harvest
            </h3>
          </div>

          <h2 className="text-5xl font-extrabold mt-4">
            {data.rainfall.amount}
            <span className="text-2xl ml-2">
              mm
            </span>
          </h2>

          <p className="mt-2">
            {data.rainfall.average_percent}% of long-period average
          </p>
        </div>
      </div>
    </div>
  );
}

function GaugeCard({ label, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm text-center">
      <div className="inline-block bg-blue-50 text-blue-600 p-2 rounded-xl mb-3">
        <Gauge size={24} />
      </div>

      <h4 className="text-slate-600 text-sm">
        {label}
      </h4>

      <div className="text-3xl font-extrabold text-slate-800">
        {value}%
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}