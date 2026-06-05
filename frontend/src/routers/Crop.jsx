import { useEffect, useState } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  Leaf,
  AlertTriangle,
  ShieldCheck,
  History,
  Wifi,
} from "lucide-react";

import HeroHeader from "../components/app/HeroHeader";
import hero from "../assets/hero-crop.jpg";
import api from "../lib/api";

export default function Crop() {
  const [stage, setStage] = useState("idle");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/crop-doctor/history");
      setHistory(res.data.history || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setStage("scanning");

      const res = await api.post(
        "/crop-doctor/diagnose",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
      setStage("result");

      loadHistory();
    } catch (error) {
      console.error(error);
      setStage("idle");
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-emerald-100/50 min-h-screen pb-10">
      <HeroHeader
        image={hero}
        eyebrow="Crop Doctor AI"
        title="Diagnose in seconds"
        subtitle="AI-powered crop disease detection"
      />

      <div className="p-4 space-y-5 -mt-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Leaf size={140} />
          </div>

          <input
            id="crop-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

          <div className="relative h-56 border-2 border-dashed border-emerald-300 bg-emerald-50/50 rounded-2xl flex items-center justify-center overflow-hidden">
            {stage === "idle" && (
              <div className="text-center">
                <Leaf
                  className="mx-auto text-emerald-500 mb-3"
                  size={40}
                />

                <p className="font-semibold text-slate-700">
                  Upload a crop image
                </p>

                <small className="text-slate-400">
                  JPG · PNG · JPEG
                </small>
              </div>
            )}

            {stage === "scanning" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-900/70">
                <Sparkles
                  className="text-emerald-300 animate-spin"
                  size={48}
                />

                <p className="text-white mt-4 font-bold">
                  ANALYZING...
                </p>
              </div>
            )}

            {stage === "result" && (
              <div className="absolute inset-0">
                <img
                  src={hero}
                  alt="result"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="bg-rose-500 text-white px-3 py-1 rounded-lg flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Diagnosis Complete
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <label
              htmlFor="crop-upload"
              className="cursor-pointer rounded-2xl py-3 flex items-center justify-center gap-2 font-bold bg-emerald-600 text-white"
            >
              <Camera size={20} />
              Camera
            </label>

            <label
              htmlFor="crop-upload"
              className="cursor-pointer rounded-2xl py-3 flex items-center justify-center gap-2 font-bold border bg-white"
            >
              <Upload size={20} />
              Gallery
            </label>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex items-center gap-1 text-emerald-600">
              <Wifi size={14} />
              <span className="text-xs font-bold">
                MODEL ONLINE
              </span>
            </div>

            <span className="text-xs text-slate-400">
              AI v1.0
            </span>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-3xl p-5 shadow-lg">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  {result.disease}
                </h3>

                <p className="text-slate-500">
                  {result.common_name}
                  {" · "}
                  {result.crop}
                </p>
              </div>

              <div className="bg-rose-50 text-rose-600 rounded-xl p-3">
                <div className="text-xs font-bold">
                  MATCH
                </div>

                <div className="text-2xl font-black">
                  {result.confidence}%
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {result.actions?.map((action, index) => (
                <Action
                  key={index}
                  icon={
                    action.type === "warning"
                      ? AlertTriangle
                      : action.type === "organic"
                      ? ShieldCheck
                      : Sparkles
                  }
                  title={action.title}
                  desc={action.description}
                  color={
                    action.type === "warning"
                      ? "rose"
                      : action.type === "organic"
                      ? "emerald"
                      : "blue"
                  }
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <History size={18} />
            <h4 className="font-bold text-lg">
              Recent Diagnoses
            </h4>
          </div>

          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-slate-100"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <small className="text-slate-400">
                    {item.date}
                  </small>
                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    item.severity === "Severe"
                      ? "bg-red-100 text-red-700"
                      : item.severity === "Moderate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Action({ icon: Icon, title, desc, color }) {
  const colors = {
    rose: "bg-rose-50 border-rose-100 text-rose-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    blue: "bg-blue-50 border-blue-100 text-blue-600",
  };

  return (
    <div
      className={`border rounded-2xl p-4 flex gap-4 ${colors[color]}`}
    >
      <div className="bg-white/60 p-2 rounded-xl">
        <Icon size={20} />
      </div>

      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}