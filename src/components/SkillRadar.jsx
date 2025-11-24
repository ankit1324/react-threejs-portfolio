import { motion } from "framer-motion";
import { useState } from "react";

const SkillRadar = ({ skills = [] }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const defaultSkills = [
    { name: "React", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 88 },
    { name: "AWS", level: 82 },
    { name: "Three.js", level: 80 },
  ];

  const displaySkills = skills.length ? skills : defaultSkills;
  const maxLevel = 100;
  const centerX = 200;
  const centerY = 200;
  const maxRadius = 150;

  const getPoint = (index, level) => {
    const angle = (index / displaySkills.length) * 2 * Math.PI - Math.PI / 2;
    const radius = (level / maxLevel) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const polygonPoints = displaySkills
    .map((skill, index) => {
      const point = getPoint(index, skill.level);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <div className="relative flex items-center justify-center">
      <svg width="400" height="400" className="overflow-visible">
        {/* Background circles */}
        {[25, 50, 75, 100].map((percent) => (
          <circle
            key={percent}
            cx={centerX}
            cy={centerY}
            r={(percent / 100) * maxRadius}
            fill="none"
            stroke="rgba(56, 189, 248, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {displaySkills.map((_, index) => {
          const point = getPoint(index, 100);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="rgba(56, 189, 248, 0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(56, 189, 248, 0.2)"
          stroke="rgba(56, 189, 248, 0.8)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Skill points */}
        {displaySkills.map((skill, index) => {
          const point = getPoint(index, skill.level);
          return (
            <motion.g key={skill.name}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={hoveredSkill === index ? 8 : 6}
                fill="url(#gradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="cursor-pointer"
              />
              {hoveredSkill === index && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={12}
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.5)"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Skill labels */}
      {displaySkills.map((skill, index) => {
        const labelPoint = getPoint(index, 110);
        return (
          <motion.div
            key={skill.name}
            className="absolute text-center"
            style={{
              left: labelPoint.x,
              top: labelPoint.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <p
              className={`text-sm font-semibold transition-all ${
                hoveredSkill === index ? "text-sky-400 scale-110" : "text-white"
              }`}
            >
              {skill.name}
            </p>
            <p className="text-xs text-slate-400">{skill.level}%</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillRadar;
