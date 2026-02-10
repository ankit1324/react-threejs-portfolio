import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

const tileStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const tileReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const Experience = () => {
  return (
    <section>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${styles.sectionSubText} text-center`}
      >
        Roles & impact
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${styles.sectionHeadText} text-center`}
      >
        Work experience
      </motion.h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-400">
        Roles, outcomes, and delivery highlights from product engineering work.
      </p>

      <motion.div
        variants={tileStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 grid gap-6 md:grid-cols-2"
      >
        {experiences.map((role) => (
          <motion.article
            key={`${role.company_name}-${role.date}`}
            variants={tileReveal}
            whileHover={{ scale: 1.02 }}
            className="glass-panel group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-sky-400/50 hover:shadow-[0_20px_60px_rgba(56,189,248,0.2)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-sky-500/15 to-transparent" />
            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-2 transition-all group-hover:border-sky-400/50 group-hover:bg-sky-400/10"
                  >
                    <img
                      src={role.icon}
                      alt={role.company_name}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                  <div>
                    <p className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                      {role.title}
                    </p>
                    <p className="text-sm text-slate-400">{role.company_name}</p>
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="ml-auto rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300"
                >
                  {role.date}
                </motion.p>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {role.points.map((point, pointIndex) => (
                  <motion.li
                    key={`${role.title}-point-${pointIndex}`}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.12 + pointIndex * 0.06 }}
                    className="flex gap-2"
                  >
                    <span className="text-sky-400">▹</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default SectionWrapper(Experience, "work");
