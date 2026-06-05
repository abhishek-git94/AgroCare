import { useEffect, useState } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  AlertTriangle,
  Thermometer,
  Sprout,
  Bug,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-climate.jpg";
import { getClimateDashboard } from "../services/climate.service";

const toneText = (t) =>
  t === "emerald"
    ? "text-green-500"
    : t === "amber"
    ? "text-yellow-500"
    : "text-red-500";

const toneBg = (t) =>
  t === "emerald"
    ? "bg-green-500"
    : t === "amber"
    ? "bg-yellow-500"
    : "bg-red-500";

const weatherIcons = {
  Clear: Sun,
  Hot: Sun,
  Cloud: Cloud,
  Rain: CloudRain,
  Storm: CloudRain,
  Humid: Cloud,
};

const advisoryIcons = {
  crop: Sprout,
  pest: Bug,
  weather: CloudRain,
  heat: Sun,
};

const hazardIcons = {
  Pathogen: Bug,
  "Heat stress": Thermometer,
  "Wind shear": Wind,
  "Flood risk": CloudRain,
};

export default function Climate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] =
    useState(null);

  const loadClimate = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getClimateDashboard();

      setData({
        location:
          response?.location || {},
        alert: response?.alert || {},
        current:
          response?.current || {},
        hazards:
          response?.hazards || [],
        forecast:
          response?.forecast || [],
        advisories:
          response?.advisories || [],
      });

      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load climate data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClimate();

    const interval = setInterval(
      loadClimate,
      300000
    );

    return () =>
      clearInterval(interval);
  }, []);

  if (loading) {
    return <ClimateSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-sm">
          <AlertTriangle
            size={48}
            className="text-red-500 mx-auto mb-4"
          />

          <h2 className="text-xl font-bold text-slate-800">
            Something went wrong
          </h2>

          <p className="text-slate-500 mt-2">
            {error}
          </p>

          <button
            onClick={loadClimate}
            className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const climate = data || {
    location: {},
    alert: {},
    current: {},
    hazards: [],
    forecast: [],
    advisories: [],
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-slate-100 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Hazard Center"
        title="Monsoon Pressure"
        subtitle="NASA POWER + OpenWeather hybrid model"
      />

      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-slate-800">
            {climate.location?.city ||
              "Unknown City"}
            {climate.location?.state &&
              `, ${climate.location.state}`}
          </h3>

          <p className="text-sm text-slate-500">
            Live weather monitoring
          </p>

          {lastUpdated && (
            <p className="text-xs text-slate-400 mt-1">
              Updated:{" "}
              {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 space-y-5">

        {/* ALERT */}

        <div className="bg-amber-50/90 backdrop-blur-md border border-amber-200 rounded-3xl p-5 shadow-sm flex gap-4">
          <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
            <AlertTriangle size={24} />
          </div>

          <div>
            <h4 className="font-bold text-lg text-amber-900">
              {climate.alert?.title ||
                "No Active Alert"}
            </h4>

            <p className="text-sm text-amber-800 mt-1">
              {climate.alert?.message ||
                "No climate alerts at the moment."}
            </p>
          </div>
        </div>

        {/* CURRENT WEATHER */}

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Temp",
              value: `${
                climate.current
                  ?.temperature ?? "--"
              }°`,
              Icon: Sun,
              color:
                "text-orange-500",
              bg:
                "bg-orange-50",
            },
            {
              label: "Humidity",
              value: `${
                climate.current
                  ?.humidity ?? "--"
              }%`,
              Icon: CloudRain,
              color:
                "text-blue-500",
              bg: "bg-blue-50",
            },
            {
              label: "Wind",
              value: `${
                climate.current
                  ?.wind_speed ?? "--"
              } kph`,
              Icon: Wind,
              color:
                "text-teal-500",
              bg: "bg-teal-50",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-4 shadow-sm text-center"
            >
              <div
                className={`${item.bg} ${item.color} p-2 rounded-xl inline-flex`}
              >
                <item.Icon size={20} />
              </div>

              <h2 className="text-xl font-bold mt-2">
                {item.value}
              </h2>

              <p className="text-xs text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* HAZARDS */}

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="font-bold text-lg mb-4">
            Hazard Index
          </h3>

          <div className="space-y-4">
            {climate.hazards
              ?.length > 0 ? (
              climate.hazards.map(
                (h) => {
                  const HazardIcon =
                    hazardIcons[
                      h.label
                    ] ||
                    AlertTriangle;

                  return (
                    <div
                      key={h.label}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <HazardIcon
                            size={14}
                            className={toneText(
                              h.tone
                            )}
                          />

                          {h.label}
                        </span>

                        <span className="font-bold">
                          {h.value ??
                            0}
                          %
                        </span>
                      </div>

                      <div className="bg-slate-100 h-2 rounded-full">
                        <div
                          className={`${toneBg(
                            h.tone
                          )} h-2 rounded-full`}
                          style={{
                            width: `${
                              h.value ??
                              0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <p className="text-slate-500">
                No hazards
                detected.
              </p>
            )}
          </div>
        </div>

        {/* FORECAST */}

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="font-bold text-lg mb-4">
            7 Day Forecast
          </h3>

          {climate.forecast
            ?.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto">
              {climate.forecast.map(
                (f) => {
                  const Icon =
                    weatherIcons[
                      f.condition
                    ] || Cloud;

                  return (
                    <div
                      key={f.day}
                      className="min-w-[90px] bg-slate-50 rounded-2xl p-4 text-center"
                    >
                      <p className="font-semibold text-sm">
                        {f.day}
                      </p>

                      <Icon
                        size={28}
                        className="mx-auto mt-2 text-blue-500"
                      />

                      <h4 className="font-bold mt-2">
                        {f.temp}°
                      </h4>

                      <small>
                        {
                          f.condition
                        }
                      </small>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <p className="text-slate-500">
              No forecast
              available.
            </p>
          )}
        </div>

        {/* ADVISORIES */}

        <div>
          <h3 className="font-bold text-lg mb-3">
            Agro Advisories
          </h3>

          <div className="space-y-3">
            {climate.advisories
              ?.length > 0 ? (
              climate.advisories.map(
                (
                  a,
                  index
                ) => {
                  const Icon =
                    advisoryIcons[
                      a.type
                    ] ||
                    Sprout;

                  return (
                    <div
                      key={
                        index
                      }
                      className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
                    >
                      <div
                        className={toneText(
                          a.tone
                        )}
                      >
                        <Icon
                          size={
                            20
                          }
                        />
                      </div>

                      <p className="text-sm font-medium">
                        {
                          a.text
                        }
                      </p>
                    </div>
                  );
                }
              )
            ) : (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                No advisories
                available.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* SKELETON */

function ClimateSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 animate-pulse">

      <div className="h-56 bg-slate-200 rounded-3xl mb-5" />

      <div className="h-24 bg-slate-200 rounded-3xl mb-5" />

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="h-24 bg-slate-200 rounded-2xl" />
        <div className="h-24 bg-slate-200 rounded-2xl" />
        <div className="h-24 bg-slate-200 rounded-2xl" />
      </div>

      <div className="h-56 bg-slate-200 rounded-3xl mb-5" />

      <div className="h-44 bg-slate-200 rounded-3xl mb-5" />

      <div className="space-y-3">
        <div className="h-20 bg-slate-200 rounded-2xl" />
        <div className="h-20 bg-slate-200 rounded-2xl" />
        <div className="h-20 bg-slate-200 rounded-2xl" />
      </div>

    </div>
  );
}
