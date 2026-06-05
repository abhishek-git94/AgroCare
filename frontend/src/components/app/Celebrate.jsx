import { useEffect, useState } from "react";

export function Celebrate({ show, label = "Harvest Bonus!", onDone }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!show) return;

    setMounted(true);

    const t = setTimeout(() => {
      setMounted(false);
      if (onDone) onDone();
    }, 2600);

    return () => clearTimeout(t);
  }, [show, onDone]);

  if (!mounted) return null;

  const grains = Array.from({ length: 28 });

  return (
    <div className="pointer-events-none fixed inset-0 z-50 mx-auto max-w-[428px] overflow-hidden">
      {grains.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i % 10) * 0.08;
        const size = 4 + ((i * 7) % 6);

        const hue =
          i % 3 === 0
            ? "var(--amber-bio)"
            : i % 3 === 1
              ? "var(--emerald)"
              : "var(--emerald-glow)";

        return (
          <span
            key={i}
            className="absolute top-[-12px] rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size + 2,
              background: hue,
              boxShadow: `0 0 8px ${hue}`,
              animation: `grain-fall 2.4s ${delay}s cubic-bezier(0.25,0.6,0.4,1) forwards`,
            }}
          />
        );
      })}

      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 animate-sprout">
        <div className="glass-card ring-glow rounded-2xl px-5 py-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald">
            Achievement
          </div>

          <div className="mt-1 font-display text-lg text-foreground">
            {label}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes grain-fall {
            0% {
              transform: translateY(-20px) rotate(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(540deg);
              opacity: 0.2;
            }
          }
        `}
      </style>
    </div>
  );
}
