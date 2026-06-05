export default function HeroHeader({
  image,
  eyebrow,
  title,
  subtitle,
  children,
}) {
  return (
    <section className="relative h-[240px] w-full overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />

      <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(255,255,255,0.08)_3px_4px)]" />

      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />

          <span className="text-[10px] uppercase tracking-[0.22em] text-green-400">
            {eyebrow}
          </span>
        </div>

        <h1 className="mt-1 text-2xl font-bold text-white">{title}</h1>

        {subtitle && <p className="mt-1 text-xs text-gray-300">{subtitle}</p>}

        {children}
      </div>
    </section>
  );
}
