"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ParticleField } from "@/components/particle-field";
import { AtomLogo } from "@/components/atom-logo";

const links = [
  {
    label: "المتجر الرسمي",
    sub: { ar: "🇩🇿 إذا كنت في الجزائر — ا shop هنا", en: "atomdz.com" },
    href: "https://atomdz.com",
    icon: "store",
    accent: "cyan",
  },
  {
    label: "طلب سريع",
    sub: { ar: "atomtv_officiel", en: "213540290775" },
    href: "https://atom.sumupstore.com/cat%C3%A9gorie/box-tv-android",
    icon: "cart",
    accent: "emerald",
  },
  {
    label: "Instagram",
    sub: { ar: "", en: "atomtv_officiel" },
    href: "https://www.instagram.com/atomtv_officiel?igsi=Z202Z2hsajFwNXU%3D",
    icon: "instagram",
    accent: "cyan",
  },
  {
    label: "WhatsApp",
    sub: { ar: "راسلنا", en: "0554 20 96 84" },
    href: "https://wa.me/213554209684",
    icon: "whatsapp",
    accent: "green",
  },
];

const specs = [
  { label: "4K HDR", icon: "M4 6h16M4 12h16M4 18h7" },
  { label: "Dolby Atmos", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" },
  { label: "WiFi 6", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" },
  { label: "Android 13", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const accentMap: Record<string, { border: string; bg: string; text: string; shadow: string }> = {
  cyan:    { border: "hover:border-cyan-400/40",    bg: "from-cyan-500/10 to-transparent",    text: "text-cyan-400",    shadow: "hover:shadow-[0_0_50px_-10px_rgba(0,212,255,0.3)]" },
  emerald: { border: "hover:border-emerald-400/40",  bg: "from-emerald-500/10 to-transparent",  text: "text-emerald-400", shadow: "hover:shadow-[0_0_50px_-10px_rgba(52,211,153,0.3)]" },
  green:   { border: "hover:border-green-400/40",    bg: "from-green-500/10 to-transparent",    text: "text-green-400",   shadow: "hover:shadow-[0_0_50px_-10px_rgba(34,197,94,0.3)]" },
};

function LinkIcon({ icon, className }: { icon: string; className?: string }) {
  const c = className ?? "size-5";
  if (icon === "store")
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21h.008v.008H3.75V21zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm13.5-8.25a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.375 9.75h17.25" /></svg>;
  if (icon === "cart")
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
  if (icon === "instagram")
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>;
  return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>;
}

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const s = performance.now();
    const f = (n: number) => {
      const p = Math.min((n - s) / 1800, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{prefix}{v.toLocaleString()}{suffix}</span>;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function Home() {
  const [glitchOn, setGlitchOn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgOp = useTransform(scrollYProgress, [0, 0.6], [1, 0.25]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setGlitchOn(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={containerRef} className="relative flex min-h-[100dvh] min-h-[calc(100dvh-var(--sat)-var(--sab))] flex-col items-center overflow-hidden">

      {/* ─── BG ─── */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/s2-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.06] mix-blend-screen"
          sizes="100vw"
        />
        <motion.div style={{ opacity: bgOp }} className="absolute inset-0">
          <div className="hero-mesh absolute inset-0" />
          <div className="bg-grid-fade absolute inset-0 opacity-50" />
          {!isMobile && <ParticleField count={35} />}
          <div className="absolute -top-48 left-1/2 size-[550px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[200px]" />
          <div className="absolute top-1/3 -right-24 size-[350px] rounded-full bg-sky-600/6 blur-[150px]" />
        </motion.div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">

        {/* ─── ATOM LOGO ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <AtomLogo size={72} />
        </motion.div>

        {/* ─── BRAND NAME ─── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-center">
          <h1
            className={`glitch-text text-gradient-cyan glow-text text-4xl font-black tracking-tight sm:text-5xl ${glitchOn ? "on" : ""}`}
            data-text="ATOM"
          >
            ATOM
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-2 text-sm font-medium text-slate-500 sm:text-base"
          >
            4K Android TV Box · الجزائر
          </motion.p>
        </motion.div>

        {/* ─── SPEC CHIPS ─── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-6 flex flex-wrap justify-center gap-2">
          {specs.map((s, i) => (
            <motion.span
              key={s.label}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1 + i * 0.06, duration: 0.45 }}
              className="glass-chip group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/5 hover:text-white"
            >
              <svg className="size-3.5 text-cyan-400/70 transition-colors group-hover:text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
              </svg>
              {s.label}
            </motion.span>
          ))}
        </motion.div>

        {/* ─── DIVIDER ─── */}
        <div className="relative mt-8 w-full">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>

        {/* ─── LINKS ─── */}
        <div className="mt-6 flex w-full flex-col gap-3">
          {links.map((link, i) => {
            const a = accentMap[link.accent];
            return (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.15 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`card-border-glow group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-400 sm:p-5 ${a.border} ${a.shadow}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-l ${a.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="shine-sweep absolute inset-0" />

                <span className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.06] sm:size-12 sm:rounded-2xl ${a.text}`}>
                  <LinkIcon icon={link.icon} />
                </span>

                <div className="relative z-10 flex flex-1 flex-col min-w-0">
                  <span className="text-sm font-bold text-white sm:text-[15px]">{link.label}</span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] text-slate-500 sm:text-xs">
                    {link.sub.ar && <span>{link.sub.ar}</span>}
                    {link.sub.ar && link.sub.en && <span className="text-slate-700">·</span>}
                    <span dir="ltr" className="text-left">{link.sub.en}</span>
                  </span>
                </div>

                <svg className="relative z-10 size-4 shrink-0 text-slate-600 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ transform: "scaleX(-1)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.a>
            );
          })}
        </div>

        {/* ─── SOCIAL PROOF ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-8 flex items-center gap-4 rounded-full border border-white/[0.05] bg-white/[0.015] px-5 py-2.5 backdrop-blur-sm sm:gap-5 sm:px-6 sm:py-3"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex gap-px" dir="ltr">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="size-3 fill-amber-400 sm:size-3.5" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span className="text-xs font-bold text-white">4.9</span>
          </div>
          <span className="h-3 w-px bg-white/[0.08]" />
          <span className="text-[11px] text-slate-500 sm:text-xs">
            <CountUp to={500} prefix="+" /> عميل راضٍ
          </span>
        </motion.div>

        {/* ─── SOCIAL ICONS ─── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.5 }} className="mt-6 flex items-center gap-2.5 sm:gap-3">
          {[
            { href: "https://www.instagram.com/atomtv_officiel?igsi=Z202Z2hsajFwNXU%3D", label: "Instagram", color: "hover:border-cyan-400/35 hover:bg-cyan-400/8 hover:text-cyan-300", d: "M2 2h20v20H2z" },
            { href: "https://www.tiktok.com/@atomdz.dz", label: "TikTok", color: "hover:border-white/30 hover:bg-white/8 hover:text-white", d: "M2 2h20v20H2z" },
            { href: "https://www.facebook.com/atomdz.dz", label: "Facebook", color: "hover:border-blue-400/35 hover:bg-blue-400/8 hover:text-blue-300", d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className={`grid size-9 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 sm:size-10 ${s.color}`}
            >
              <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d={s.d} /></svg>
            </a>
          ))}
        </motion.div>

        {/* ─── FOOTER ─── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }} className="mt-10 flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-700">
            <span className="rounded-md border border-white/[0.05] px-1.5 py-0.5">DZD</span>
            <span className="rounded-md border border-white/[0.05] px-1.5 py-0.5">COD</span>
            <span className="rounded-md border border-white/[0.05] px-1.5 py-0.5">CCP</span>
          </div>
          <p className="text-[10px] text-slate-600 sm:text-[11px]">&copy; {new Date().getFullYear()} ATOM · جميع الحقوق محفوظة</p>
        </motion.div>
      </div>
    </div>
  );
}
