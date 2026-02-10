import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { github } from "../assets";

/* ── Decorative SVG Components ── */
const CircleDecoration = ({ className }) => (
  <svg
    className={`pointer-events-none absolute ${className}`}
    viewBox="0 0 100 100"
    fill="none"
  >
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
    <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.08" />
  </svg>
);

const DiamondDecoration = ({ className }) => (
  <svg
    className={`pointer-events-none absolute ${className}`}
    viewBox="0 0 80 80"
    fill="none"
  >
    <rect x="15" y="15" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 5" transform="rotate(20 40 40)" />
    <rect x="25" y="25" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" transform="rotate(35 40 40)" />
  </svg>
);

const DotGrid = ({ className }) => (
  <svg
    className={`pointer-events-none absolute ${className}`}
    viewBox="0 0 60 30"
    fill="currentColor"
  >
    {[0, 1, 2].map((row) =>
      [0, 1, 2, 3, 4, 5].map((col) => (
        <circle key={`${row}-${col}`} cx={5 + col * 10} cy={5 + row * 10} r="1.2" />
      ))
    )}
  </svg>
);

const HexDecoration = ({ className, color }) => (
  <svg
    className={`pointer-events-none absolute ${className}`}
    viewBox="0 0 60 60"
    fill="none"
  >
    <polygon
      points="30,3 54,17 54,43 30,57 6,43 6,17"
      stroke={color}
      strokeWidth="0.8"
      strokeDasharray="4 4"
      opacity="0.3"
    />
    <polygon
      points="30,12 46,21 46,39 30,48 14,39 14,21"
      stroke={color}
      strokeWidth="0.5"
      opacity="0.15"
    />
  </svg>
);

/* ── Color schemes for cards ── */
const accentColors = [
  { from: "#3b82f6", to: "#06b6d4", light: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.2)", glow: "rgba(59,130,246,0.12)" },
  { from: "#8b5cf6", to: "#ec4899", light: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.2)", glow: "rgba(139,92,246,0.12)" },
  { from: "#f59e0b", to: "#ef4444", light: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.2)", glow: "rgba(245,158,11,0.12)" },
  { from: "#10b981", to: "#3b82f6", light: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.2)", glow: "rgba(16,185,129,0.12)" },
  { from: "#ec4899", to: "#8b5cf6", light: "rgba(236,72,153,0.07)", border: "rgba(236,72,153,0.2)", glow: "rgba(236,72,153,0.12)" },
];

/* ── Project Card Component ── */
const ProjectCard = ({ project, index }) => {
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="project-card-v2 group"
    >
      {/* Decorative SVGs */}
      <CircleDecoration className="-right-5 -top-5 h-24 w-24 text-white/20 transition-all duration-500 group-hover:text-white/40" />
      <DiamondDecoration className="-bottom-3 -left-3 h-16 w-16 text-white/15 transition-all duration-500 group-hover:text-white/30" />
      <HexDecoration className="-right-2 bottom-16 h-12 w-12" color={accent.from} />

      {/* Top accent gradient line */}
      <div
        className="project-card-accent-line"
        style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
      />

      {/* Image Section */}
      <div className="project-card-image-wrap">
        <img
          src={project.image}
          alt={project.name}
          className="project-card-img"
          loading="lazy"
        />
        {/* Light overlay — doesn't hide the image */}
        <div className="project-card-img-overlay" />

        {/* Tech badge */}
        <div className="project-card-tech-badge">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" fill={accent.from} opacity="0.85" />
            <circle cx="5" cy="5" r="2" fill="white" opacity="0.5" />
          </svg>
          <span>{project.tags?.[0]?.name || "Project"}</span>
        </div>

        {/* Project number */}
        <div className="project-card-number">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover preview */}
        <div className="project-card-hover-preview">
          <div className="project-card-hover-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            View Project
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="project-card-body">
        <DotGrid className="right-3 top-1 h-6 w-14 text-white/10" />

        {/* Title */}
        <h3 className="project-card-title">{project.name}</h3>

        {/* Description */}
        <p className="project-card-desc">{project.description}</p>

        {/* Tags */}
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span
              key={`${project.name}-${tag.name}`}
              className="project-card-tag"
              style={{
                background: accent.light,
                color: accent.from,
                borderColor: accent.border,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="project-card-btns">
          {project.live_project_link && (
            <button
              onClick={() => window.open(project.live_project_link, "_blank")}
              className="project-card-btn-primary"
              style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </button>
          )}
          <button
            onClick={() => window.open(project.source_code_link, "_blank")}
            className="project-card-btn-secondary"
          >
            <img src={github} alt="GitHub" className="h-4 w-4 brightness-200" />
            Source Code
          </button>
        </div>
      </div>
    </motion.article>
  );
};

/* ── Works Section ── */
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
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTag === "all" ||
        project.tags.some((tag) => tag.name === selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <section className="projects-section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="projects-header"
      >
        <p className={`${styles.sectionSubText} text-center`}>
          Selected builds
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Projects
        </h2>
        <p className="projects-subtitle">
          A handful of experiments, internal tools, and public experiences that
          explore automation, reactive UI, and playful data stories.
        </p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="projects-filters"
      >
        <div className="projects-search-wrapper">
          <svg className="projects-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="projects-search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="projects-search-clear">
              ✕
            </button>
          )}
        </div>
        <div className="projects-tag-filters horizontal-scroll">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`projects-filter-btn ${selectedTag === tag ? "projects-filter-btn--active" : ""}`}
            >
              {tag === "all" ? "All Projects" : tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="projects-empty"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="projects-empty-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <p>No projects found matching your criteria.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedTag("all"); }}
              className="projects-empty-reset"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
