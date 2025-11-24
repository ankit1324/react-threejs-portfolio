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
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-panel group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-sky-400/50 hover:shadow-[0_20px_60px_rgba(56,189,248,0.2)]"
          >
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
                transition={{ delay: 0.3 }}
                className="ml-auto text-xs uppercase tracking-[0.4em] text-slate-400"
              >
                {role.date}
              </motion.p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {role.points.map((point, pointIndex) => (
                <motion.li
                  key={`${role.title}-point-${pointIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + pointIndex * 0.1 }}
                  className="flex gap-2"
                >
                  <span className="text-sky-400">▹</span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "work");
