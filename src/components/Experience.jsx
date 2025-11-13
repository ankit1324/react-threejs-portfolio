import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

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

      <div className="mt-12 space-y-8">
        {experiences.map((role, index) => (
          <motion.article
            key={`${role.company_name}-${role.date}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-2">
                  <img
                    src={role.icon}
                    alt={role.company_name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{role.title}</p>
                  <p className="text-sm text-slate-400">{role.company_name}</p>
                </div>
              </div>
              <p className="ml-auto text-xs uppercase tracking-[0.4em] text-slate-400">
                {role.date}
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {role.points.map((point, pointIndex) => (
                <li key={`${role.title}-point-${pointIndex}`} className="flex gap-2">
                  <span className="text-sky-400">▹</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "work");
