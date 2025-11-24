import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { services } from "../constants";
import { profilepic, resume } from "../assets";
import MagneticButton from "./MagneticButton";

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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-200"
          >
            I&apos;m a software engineer who treats the stack as a playground—
            blending interface craft, resilient infrastructure, and automation
            to get ideas into the real world faster. Whether it&apos;s a
            full-stack web build, a data-heavy workflow, or a 3D moment, I
            obsess over clarity and longevity.
          </motion.p>
          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            {[
              "Led React + cloud programs for organisations like Paramotor Digital Technology and IBM, balancing delightful UI with measurable uptime.",
              "React Native builds (Expo + RN CLI) are part of the daily rhythm, so mobile UX ships alongside web without redundant work.",
              "Translate research, security practices, and automation into workflows that save hours for teams on the ground.",
              "Constantly prototyping with Three.js, R3F, and real-time data to keep immersive moments part of the craft.",
              "DevOps wise I automate everything up to AWS ECS—pipelines, IaC, smoke tests, and rollout playbooks without dragging in Kubernetes."
            ].map((text, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex gap-3"
              >
                <span className="text-sky-400">▹</span>
                {text}
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton
              type="button"
              onClick={() => window.open(resume, "_blank")}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-sky-500/50"
            >
              <span className="relative z-10">Download resume</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-violet-500 to-sky-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </MagneticButton>
            <MagneticButton
              type="button"
              onClick={() =>
                window.open("https://www.linkedin.com/in/ankitchaudhary1324/", "_blank")
              }
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-sky-400/50 hover:bg-sky-400/10 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
            >
              LinkedIn
            </MagneticButton>
            <MagneticButton
              type="button"
              onClick={() => window.open("https://github.com/ankit1324", "_blank")}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-violet-400/50 hover:bg-violet-400/10 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              GitHub
            </MagneticButton>
          </motion.div>
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
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:border-sky-400/50 hover:bg-sky-400/5 hover:shadow-[0_10px_30px_rgba(56,189,248,0.2)]"
                >
                  <motion.img
                    src={service.icon}
                    alt={service.title}
                    className="h-10 w-10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  />
                  <p className="text-sm font-semibold text-white">
                    {service.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");
