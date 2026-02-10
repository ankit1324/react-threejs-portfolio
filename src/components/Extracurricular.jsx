import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { extracurricular } from "../constants";
import { SectionWrapper } from "../hoc";

const Extracurricular = () => {
  const loopedBadges = useMemo(
    () => [...extracurricular, ...extracurricular],
    [extracurricular]
  );

  return (
    <section>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${styles.sectionSubText} text-center`}
      >
        Credentials & curiosities
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${styles.sectionHeadText} text-center`}
      >
        Certifications
      </motion.h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-slate-400 sm:text-sm">
        From cloud architecture to flying drones, these credentials capture how
        I pursue craft outside the keyboard. Each badge fuels the systems I
        build day-to-day.
      </p>

      <div className="horizontal-scroll mt-8 overflow-x-auto overflow-y-hidden pb-4 sm:mt-12">
        <div className="certificates-track">
          {loopedBadges.map((badge, index) => (
            <motion.article
              key={`${badge.title}-${badge.date}-${index}`}
              aria-hidden={index >= extracurricular.length}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-panel min-w-[84vw] max-w-[84vw] rounded-3xl border border-white/10 bg-white/5 p-5 sm:min-w-[300px] sm:max-w-[360px] sm:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-2 sm:h-14 sm:w-14">
                  <img
                    src={badge.icon}
                    alt={badge.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.4em]">
                    {badge.type}
                  </p>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {badge.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.4em]">
                {badge.date}
              </p>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                {badge.points.slice(0, 3).map((point, idx) => (
                  <li key={`${badge.title}-point-${idx}`} className="flex gap-2">
                    <span className="text-sky-400">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href={badge.credential}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-white/40 sm:w-auto"
              >
                View credential
                <span aria-hidden="true">↗</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Extracurricular, "extracurricular");
