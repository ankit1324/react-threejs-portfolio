import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import {
  technologies,
  itTools,
  cybersecurityTools,
  designTools,
} from "../constants";

const techCategories = [
  {
    id: "build",
    label: "Product engineering",
    blurb: "React, Three.js, Tailwind, databases",
    accent: "from-sky-500 to-violet-500",
    items: technologies,
  },
  {
    id: "infra",
    label: "Infra & cloud",
    blurb: "AWS, Linux, automation, observability",
    accent: "from-emerald-400 to-teal-400",
    items: itTools,
  },
  {
    id: "security",
    label: "Security & R&D",
    blurb: "Offensive tooling & network analysis",
    accent: "from-amber-400 to-rose-500",
    items: cybersecurityTools,
  },
  {
    id: "creative",
    label: "Creative lab",
    blurb: "Visual storytelling & motion",
    accent: "from-pink-500 to-indigo-500",
    items: designTools,
  },
];

const Tech = () => {
  const [activeCategory, setActiveCategory] = useState(techCategories[0].id);

  const activeItems = useMemo(() => {
    const found = techCategories.find((cat) => cat.id === activeCategory);
    return found?.items ?? [];
  }, [activeCategory]);

  const activeMeta =
    techCategories.find((cat) => cat.id === activeCategory) ?? techCategories[0];

  return (
    <section>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${styles.sectionSubText} text-center`}
      >
        Stack evolution
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${styles.sectionHeadText} text-center`}
      >
        Toolbox
      </motion.h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-400">
        A rotating mix of languages, frameworks, and platforms that help me move
        from sketch to production quickly—without compromising reliability or
        joy.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {techCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
              activeCategory === category.id
                ? "border-transparent bg-gradient-to-r text-white " +
                  category.accent
                : "border-white/15 bg-white/5 text-slate-300 hover:border-white/30"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs uppercase tracking-[0.5em] text-slate-400">
        {activeMeta.blurb}
      </p>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {activeItems.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/90 shadow-[0_15px_40px_rgba(2,6,23,0.4)] transition-all hover:border-sky-400/50 hover:bg-sky-400/5 hover:shadow-[0_15px_40px_rgba(56,189,248,0.3)]"
          >
            <motion.img
              src={skill.icon}
              alt={skill.name}
              className="h-10 w-10 object-contain"
              loading="lazy"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-sm font-semibold group-hover:text-sky-400 transition-colors">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SectionWrapper(Tech, "skills");
