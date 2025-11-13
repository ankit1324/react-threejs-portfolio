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
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-400">
        From cloud architecture to flying drones, these credentials capture how
        I pursue craft outside the keyboard. Each badge fuels the systems I
        build day-to-day.
      </p>

      <div className="mt-12 overflow-hidden pb-4">
        <div className="certificates-track">
          {loopedBadges.map((badge, index) => (
            <motion.article
              key={`${badge.title}-${badge.date}-${index}`}
              aria-hidden={index >= extracurricular.length}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-panel min-w-[300px] max-w-[360px] rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-2">
                  <img
                    src={badge.icon}
                    alt={badge.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    {badge.type}
                  </p>
                  <p className="text-base font-semibold text-white">
                    {badge.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.4em] text-slate-500">
                {badge.date}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
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
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-white/40"
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
