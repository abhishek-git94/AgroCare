import { Leaf, Wifi, ChevronDown } from "lucide-react";

export default function StatusBar() {
  return (
    <header className="fixed top-0 left-1/2 z-40 flex h-[52px] w-full max-w-[428px] -translate-x-1/2 items-center justify-between border-b border-white/40 bg-white/70 px-4 backdrop-blur-xl shadow-sm">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(90deg,transparent_0_18px,rgba(16,185,129,0.08)_18px_19px)]" />

      <div className="relative flex items-center gap-2">
        <div className="relative grid h-7 w-7 place-items-center rounded-full bg-green-100 border border-green-300">
          <Leaf className="h-4 w-4 text-green-600" />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase text-gray-500">Synced</span>
          <span className="text-[11px] text-green-600">2m · LIVE</span>
        </div>
      </div>

      <button className="flex items-center gap-1 rounded-full border px-3 py-1">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <span className="font-semibold">Khairpur</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      <div className="flex items-center gap-1">
        <Wifi className="h-4 w-4 text-green-600" />
        <span className="text-[10px] text-gray-500">4G</span>
      </div>
    </header>
  );
}
