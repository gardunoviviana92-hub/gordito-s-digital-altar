import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import gorditoAsset from "@/assets/gordito.jpg.asset.json";

const gordito = gorditoAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Gordito · Día de Muertos" },
      { name: "description", content: "Un altar digital lleno de cempasúchil, veladoras y amor para recordar a Gordito." },
      { property: "og:title", content: "Altar de Gordito · Día de Muertos" },
      { property: "og:description", content: "Un altar digital para recordar a Gordito, nuestro perrito querido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PICADO = ["var(--rosa)", "var(--marigold)", "var(--secondary)", "var(--accent)", "var(--marigold-deep)"];

function Marigold({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      {[0, 30, 60, 90, 120, 150].map((r) => (
        <ellipse key={r} cx="20" cy="20" rx="18" ry="7" fill="var(--marigold-deep)" transform={`rotate(${r} 20 20)`} />
      ))}
      {[15, 45, 75, 105, 135, 165].map((r) => (
        <ellipse key={r} cx="20" cy="20" rx="13" ry="5.5" fill="var(--marigold)" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5" fill="var(--flame)" />
    </svg>
  );
}

function Petals() {
  const petals = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      left: (i * 37) % 100, delay: (i * 0.73) % 10, dur: 8 + ((i * 1.3) % 7),
      size: 10 + ((i * 5) % 12), drift: ((i % 5) - 2) * 60,
    })), []);
  return (
    <>
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{
          left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          ["--drift" as string]: `${p.drift}px`,
        }}>
          <svg width={p.size} height={p.size * 1.3} viewBox="0 0 10 13"><path d="M5 0C9 3 10 9 5 13C0 9 1 3 5 0Z" fill={i % 3 ? "var(--marigold)" : "var(--marigold-deep)"} /></svg>
        </span>
      ))}
    </>
  );
}

function PapelPicado() {
  return (
    <div className="relative w-full">
      <div className="absolute top-3 left-0 right-0 h-0.5 bg-wax/60" />
      <div className="flex justify-center gap-1 overflow-hidden px-1 pt-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <svg key={i} viewBox="0 0 60 80" className="sway grow-hover w-14 shrink-0 sm:w-20"
            style={{ animationDelay: `${i * 0.25}s` }}>
            <path fill={PICADO[i % PICADO.length]} fillRule="evenodd"
              d="M0 0H60V70L54 80L48 70L42 80L36 70L30 80L24 70L18 80L12 70L6 80L0 70Z
                 M30 14a8 8 0 1 0 .01 0Z M12 34h8v8h-8Z M40 34h8v8h-8Z M22 50l8-8 8 8-8 8Z M8 12l4 4-4 4-4-4Z M52 12l4 4-4 4-4-4Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

function Arch() {
  const n = 26;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto aspect-[1/1.1] w-[min(92vw,620px)]">
      {Array.from({ length: n }).map((_, i) => {
        const a = Math.PI - (i / (n - 1)) * Math.PI;
        const x = 50 + Math.cos(a) * 46;
        const y = 50 - Math.sin(a) * 44;
        return (
          <div key={i} className="pointer-events-auto absolute grow-hover"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
            <Marigold size={i % 2 ? 38 : 50} />
          </div>
        );
      })}
      {[0, 1].map((side) =>
        Array.from({ length: 5 }).map((_, j) => (
          <div key={`${side}-${j}`} className="pointer-events-auto absolute grow-hover"
            style={{ left: side ? "96%" : "4%", top: `${55 + j * 9}%`, transform: "translate(-50%,-50%)" }}>
            <Marigold size={j % 2 ? 38 : 48} />
          </div>
        )))}
    </div>
  );
}

function Veladora({ delay = 0 }: { delay?: number }) {
  return (
    <div className="grow-hover flex flex-col items-center">
      <div className="flame relative mb-1 h-8 w-4 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-flame glow-marigold"
        style={{ animationDelay: `${delay}s` }}>
        <div className="absolute inset-x-1 bottom-0 h-4 rounded-full bg-wax/90" />
      </div>
      <div className="h-1 w-0.5 bg-foreground/70" />
      <div className="flex h-36 w-20 flex-col items-center rounded-t-lg rounded-b-md border-2 border-marigold/60 bg-wax/90 p-1.5 shadow-lg sm:h-44 sm:w-24">
        <img src={gordito} alt="Gordito en veladora" loading="lazy" width={816} height={816}
          className="aspect-square w-full rounded-md border-2 border-rosa object-cover" />
        <span className="mt-2 font-script text-lg text-secondary">Gordito</span>
        <Marigold size={20} />
      </div>
    </div>
  );
}

function Nose({ onPress }: { onPress: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="fade-up font-display text-4xl text-marigold sm:text-6xl">Un altar para Gordito</h1>
      <p className="fade-up max-w-sm text-muted-foreground" style={{ animationDelay: ".3s" }}>
        Toca su naricita para encender las veladoras
      </p>
      <button onClick={onPress} aria-label="Presiona la nariz de Gordito para entrar"
        className="nose-pulse grow-hover rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-ring">
        <svg width="180" height="150" viewBox="0 0 180 150">
          <path d="M90 10C140 10 172 40 172 78C172 120 130 140 90 140C50 140 8 120 8 78C8 40 40 10 90 10Z" fill="oklch(0.18 0.02 30)" />
          <ellipse cx="60" cy="85" rx="18" ry="22" fill="oklch(0.08 0.01 30)" transform="rotate(-20 60 85)" />
          <ellipse cx="120" cy="85" rx="18" ry="22" fill="oklch(0.08 0.01 30)" transform="rotate(20 120 85)" />
          <ellipse cx="70" cy="38" rx="28" ry="10" fill="oklch(1 0 0 / .25)" />
          <path d="M90 110V140" stroke="oklch(0.08 0.01 30)" strokeWidth="4" />
        </svg>
      </button>
      <span className="font-script text-2xl text-rosa">¡boop!</span>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <main className="relative min-h-screen">
      <Petals />
      {!open ? <Nose onPress={() => setOpen(true)} /> : (
        <div className="fade-up">
          <header><PapelPicado /></header>

          <section className="relative mx-auto mt-6 w-[min(92vw,620px)] aspect-[1/1.1]">
            <Arch />
            <div className="absolute inset-x-0 top-[22%] flex flex-col items-center px-10 text-center">
              <p className="font-script text-2xl text-rosa sm:text-3xl">En memoria de</p>
              <h1 className="font-display text-6xl text-marigold drop-shadow-lg sm:text-8xl">Gordito</h1>
              <img src={gordito} alt="Gordito, nuestro perrito" width={816} height={816}
                className="grow-hover mt-4 w-[46%] rounded-full border-4 border-marigold object-cover glow-marigold" />
            </div>
          </section>

          <section className="mx-auto max-w-xl px-6 py-10 text-center">
            <p className="font-script text-3xl text-marigold">“Siempre serás mi mejor amigo”</p>
            <p className="mt-4 text-muted-foreground">
              Esta noche las flores de cempasúchil marcan tu camino a casa. Te esperamos con tu comida favorita,
              tu juguete y todo nuestro cariño.
            </p>
          </section>

          <section className="relative mx-auto max-w-4xl px-4 pb-24">
            <div className="flex flex-wrap items-end justify-center gap-6">
              {[0, 0.4, 0.8, 0.2, 0.6].map((d, i) => <Veladora key={i} delay={d} />)}
            </div>
            <div className="mt-6 flex justify-center gap-4 text-5xl">
              {["🦴", "🍖", "🧸", "💧", "🍞"].map((o) => (
                <span key={o} className="grow-hover" role="img" aria-label="ofrenda">{o}</span>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: 9 }).map((_, i) => <Marigold key={i} size={34} className="grow-hover" />)}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
