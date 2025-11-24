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

  return (
    <GlowCard
      glowColor="sky"
      className="glass-panel group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/30"
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="flex flex-col"
      >
      <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-white/10">
        <motion.img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover"
          loading="lazy"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-950/80" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm"
        >
          <p className="text-sm font-semibold text-white">View Details</p>
        </motion.div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={`${project.name}-${tag.name}`}
              className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div>
          <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-sky-400">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-slate-300 line-clamp-3">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.live_project_link && (
            <MagneticButton
              type="button"
              onClick={() => window.open(project.live_project_link, "_blank")}
              className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/40"
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
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
          >
            <img src={github} alt="GitHub" className="h-5 w-5" />
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
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-400">
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
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
        />
        <div className="flex flex-wrap justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
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

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))
        ) : (
          <div className="col-span-2 py-12 text-center text-slate-400">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
