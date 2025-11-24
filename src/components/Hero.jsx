import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { experiences, extracurricular, projects } from "../constants";
import { resume } from "../assets";
import MagneticButton from "./MagneticButton";

const heroPhrases = [
  "software engineer",
  "cloud-native builder",
  "3D tinkerer",
  "systems storyteller",
];

const heroStats = [
  {
    label: "Product drops",
    value: projects.length.toString().padStart(2, "0"),
    detail: "public builds & experiments",
  },
  {
    label: "Certifications",
    value: extracurricular.length.toString().padStart(2, "0"),
    detail: "cloud, security & flight ops",
  },
  {
    label: "Journeys so far",
    value: experiences.length.toString().padStart(2, "0"),
    detail: "roles across product teams",
  },
];

const Typewriter = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const isComplete = !isDeleting && display === current;
    const isEmpty = isDeleting && display === "";

    const timeout = setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      const nextLength = display.length + (isDeleting ? -1 : 1);
      setDisplay(current.slice(0, nextLength));
    }, isComplete ? 1200 : isDeleting ? 40 : 85);

    return () => clearTimeout(timeout);
  }, [display, isDeleting, index, phrases]);

  return (
    <span className="inline-flex items-center font-semibold text-sky-300">
      {display}
      <span className="ml-2 inline-block h-5 w-[2px] animate-pulse rounded bg-sky-300" />
    </span>
  );
};

const Hero = () => {
  const activeRole = experiences[0];

  return (
    <section
      className={`relative w-full ${styles.paddingX} pt-32 pb-28`}
      id="home"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-slate-400"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-slate-200 transition-all hover:border-sky-400/50 hover:bg-sky-400/10"
            >
              Calm Interfaces
            </motion.span>
            <span>•</span>
            <span>Realtime Workflows</span>
          </motion.div>
          <div className="space-y-6">
            <h1 className={`${styles.heroHeadText}`}>
              Building{" "}
              <span className="bg-gradient-to-br from-sky-400 via-slate-50 to-violet-500 bg-clip-text text-transparent">
                immersive workbenches
              </span>{" "}
              for product teams.
            </h1>
            <p className={styles.heroSubText}>
              I’m Ankit Chaudhary—engineering lead crafting tactile React &
              React Native apps, 3D interfaces, and DevOps pipelines through AWS
              ECS. Every build balances playful UI with measurable uptime.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                React Native · Expo + CLI
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                Three.js · R3F
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                DevOps till AWS ECS
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => document.querySelector("#projects").scrollIntoView({ behavior: "smooth" })}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-sky-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                See selected work
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </MagneticButton>
            <MagneticButton
              type="button"
              onClick={() => window.open(resume, "_blank")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-sky-400/50 hover:bg-sky-400/10 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
            >
              Download resume
            </MagneticButton>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_25px_60px_rgba(2,6,23,0.35)] transition-all hover:border-sky-400/50 hover:shadow-[0_25px_60px_rgba(56,189,248,0.25)]"
              >
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1, type: "spring" }}
                  className="text-3xl font-semibold text-white group-hover:text-sky-400 transition-colors"
                >
                  {stat.value}
                </motion.p>
                <p className="mt-1 text-xs uppercase tracking-[0.4em] text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm text-slate-300">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="rounded-[32px] border border-white/10 bg-slate-950/60 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="rounded-full border border-white/15 px-3 py-1 text-white/80">
                  Scene · Studio
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-white/80">
                  Mode · Live
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <p>Auto-rotate</p>
              </div>
            </div>
            <div className="hero-canvas relative flex h-[460px] w-full items-center justify-center overflow-hidden rounded-[32px]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-sky-900/20" />
              <div className="relative flex h-full w-full items-center justify-center p-4">
                <ComputersCanvas />
              </div>
              <div className="pointer-events-none absolute inset-x-6 top-6 flex justify-between text-xs text-white/70">
                <span>Realtime prototype feed</span>
                <span>fps 60 • vsync on</span>
              </div>
              <div className="pointer-events-none absolute inset-x-6 bottom-6 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/80">
                  OrbitControls locked
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/80">
                  HDR active
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/80">
                  PostFX bloom
                </span>
              </div>
            </div>
          </div>
          {activeRole && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 shadow-[0_20px_80px_rgba(2,6,23,0.45)]">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Currently shipping
              </p>
              <p className="mt-2 font-semibold text-white">{activeRole.title}</p>
              <p className="text-slate-400">{activeRole.company_name}</p>
              <p className="mt-3 text-xs text-slate-500">{activeRole.date}</p>
            </div>
          )}
        </motion.div>
      </div>
      <div className="mt-16 flex justify-center">
        <a
          href="#about"
          className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.6em] text-slate-400"
        >
          Scroll to explore
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block h-6 w-[2px] rounded-full bg-white/70"
            />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
