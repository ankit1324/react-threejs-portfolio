import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { services } from "../constants";
import { profilepic, resume } from "../assets";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <section className="space-y-6 text-white">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${styles.sectionSubText} text-center sm:text-left`}
      >
        Building calm tech
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${styles.sectionHeadText} text-center sm:text-left`}
      >
        Designing the backstage story.
      </motion.h2>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8"
        >
          <p className="text-lg text-slate-200">
            I&apos;m a software engineer who treats the stack as a playground—
            blending interface craft, resilient infrastructure, and automation
            to get ideas into the real world faster. Whether it&apos;s a
            full-stack web build, a data-heavy workflow, or a 3D moment, I
            obsess over clarity and longevity.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="text-sky-400">▹</span>
              Led React + cloud programs for organisations like Paramotor
              Digital Technology and IBM, balancing delightful UI with
              measurable uptime.
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400">▹</span>
              React Native builds (Expo + RN CLI) are part of the daily rhythm,
              so mobile UX ships alongside web without redundant work.
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400">▹</span>
              Translate research, security practices, and automation into
              workflows that save hours for teams on the ground.
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400">▹</span>
              Constantly prototyping with Three.js, R3F, and real-time data to
              keep immersive moments part of the craft.
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400">▹</span>
              DevOps wise I automate everything up to AWS ECS—pipelines, IaC,
              smoke tests, and rollout playbooks without dragging in Kubernetes.
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => window.open(resume, "_blank")}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:translate-y-0.5"
            >
              Download resume
            </button>
            <button
              type="button"
              onClick={() =>
                window.open("https://www.linkedin.com/in/ankitchaudhary1324/", "_blank")
              }
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40"
            >
              LinkedIn
            </button>
            <button
              type="button"
              onClick={() => window.open("https://github.com/ankit1324", "_blank")}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40"
            >
              GitHub
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="glass-panel overflow-hidden p-2">
            <div className="rounded-[22px] border border-white/10">
              <img
                src={profilepic}
                alt="Ankit Chaudhary"
                className="h-[360px] w-full rounded-[22px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="glass-panel p-6">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
              Focus areas
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="h-10 w-10"
                  />
                  <p className="text-sm font-semibold text-white">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");
