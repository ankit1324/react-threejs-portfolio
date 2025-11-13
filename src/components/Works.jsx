import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { github } from "../assets";

const ProjectCard = ({ project, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="glass-panel flex flex-col rounded-3xl border border-white/10 bg-white/5 p-5"
  >
    <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-white/10">
      <img
        src={project.image}
        alt={project.name}
        className="h-full w-full object-cover transition duration-500 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-950/80" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={`${project.name}-${tag.name}`}
            className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
    <div className="mt-6 flex flex-col gap-3">
      <div>
        <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
        <p className="mt-2 text-sm text-slate-300">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {project.live_project_link && (
          <button
            type="button"
            onClick={() => window.open(project.live_project_link, "_blank")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:translate-y-0.5"
          >
            View Live
            <span aria-hidden="true">↗</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => window.open(project.source_code_link, "_blank")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-white/40"
        >
          <img src={github} alt="GitHub" className="h-5 w-5" />
          Source
        </button>
      </div>
    </div>
  </motion.article>
);

const Works = () => {
  return (
    <section>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${styles.sectionSubText} text-center`}
      >
        Selected builds
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${styles.sectionHeadText} text-center`}
      >
        Projects
      </motion.h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-400">
        A handful of experiments, internal tools, and public experiences that
        explore automation, reactive UI, and playful data stories.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
