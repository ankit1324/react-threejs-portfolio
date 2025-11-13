import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { education } from "../constants";
import { SectionWrapper } from "../hoc";

const Education = () => {
  return (
    <section>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${styles.sectionSubText} text-center`}
      >
        Learning loops
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${styles.sectionHeadText} text-center`}
      >
        Education
      </motion.h2>

      <div className="relative mt-12 space-y-10">
        <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-sky-400/40 via-white/10 to-transparent md:block" />
        {education.map((item, index) => (
          <motion.article
            key={`${item.company_name}-${item.date}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-10 md:pl-16"
          >
            <div className="absolute left-1 top-8 hidden h-5 w-5 -translate-x-1/2 transform items-center justify-center rounded-full border border-white/40 bg-slate-900 md:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
            </div>
            <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
                    <img
                      src={item.icon}
                      alt={item.company_name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-slate-400">
                      {item.company_name}
                    </p>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  {item.date}
                </p>
              </div>
              {item.points?.filter((point) => point && point.trim().length > 0)
                .length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {item.points
                    .filter((point) => point && point.trim().length > 0)
                    .map((point, idx) => (
                      <li key={`${item.title}-point-${idx}`} className="flex gap-2">
                        <span className="text-sky-400">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Education, "education");
