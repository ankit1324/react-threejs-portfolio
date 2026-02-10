import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { github } from "../assets";
import GlowCard from "./GlowCard";
import MagneticButton from "./MagneticButton";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const visibleTags = project.tags.slice(0, 2);
  const remainingTagCount = Math.max(project.tags.length - visibleTags.length, 0);

  return (
    <GlowCard
      glowColor="sky"
      className="glass-panel group relative flex flex-col overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.04] p-3.5 transition-all hover:border-white/30 sm:rounded-3xl sm:p-4"
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative flex flex-col"
      >
        <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-sky-500/20 blur-3xl sm:hidden" />
        <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-44">
          <motion.img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
            loading="lazy"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/55 to-slate-950/90" />
          <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-white/90 backdrop-blur-sm sm:text-[0.62rem]">
            Featured
          </div>
          <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[0.58rem] font-semibold text-white/90 backdrop-blur-sm sm:text-[0.62rem]">
            {project.tags.length} Tech
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 hidden items-center justify-center bg-slate-950/60 backdrop-blur-sm sm:flex"
          >
            <p className="text-xs font-semibold text-white">View Details</p>
          </motion.div>
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={`${project.name}-${tag.name}`}
                className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[0.65rem] text-white backdrop-blur-sm"
              >
                #{tag.name}
              </span>
            ))}
            {remainingTagCount > 0 && (
              <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[0.65rem] text-white/90 backdrop-blur-sm">
                +{remainingTagCount}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          <div>
            <h3 className="text-[1.02rem] font-semibold leading-snug text-white transition-colors group-hover:text-sky-400 sm:text-xl">
              {project.name}
            </h3>
            <p className="mt-1.5 text-[0.78rem] uppercase tracking-[0.15em] text-slate-400 sm:hidden">
              Built for real-world usage
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300 line-clamp-3 sm:line-clamp-2 sm:text-sm">
              {project.description}
            </p>
          </div>
          <div className="mt-1 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
            {project.live_project_link && (
              <MagneticButton
                type="button"
                onClick={() => window.open(project.live_project_link, "_blank")}
                className="group relative inline-flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/40 sm:w-auto sm:flex-1 sm:py-1.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Live
                  <span aria-hidden="true">↗</span>
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </MagneticButton>
            )}
            <MagneticButton
              type="button"
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto sm:flex-1 sm:py-1.5"
            >
              <img src={github} alt="GitHub" className="h-4 w-4" />
              Source
            </MagneticButton>
          </div>
        </div>
      </motion.article>
    </GlowCard>
  );
};

const Works = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag.name));
    });
    return ["all", ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === "all" || 
        project.tags.some((tag) => tag.name === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

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
      <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-slate-400 sm:text-sm">
        A handful of experiments, internal tools, and public experiences that
        explore automation, reactive UI, and playful data stories.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-8 max-w-2xl space-y-4"
      >
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none sm:px-6 sm:py-3 sm:text-base"
        />
        <div className="horizontal-scroll -mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                selectedTag === tag
                  ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                  : "border border-white/15 bg-white/5 text-slate-300 hover:border-white/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
