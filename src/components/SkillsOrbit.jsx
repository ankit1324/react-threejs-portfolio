import { motion } from "framer-motion";
import { useState } from "react";

const SkillsOrbit = ({ skills = [], radius = 150 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      {/* Center core */}
      <motion.div
        className="absolute z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-violet-500 to-pink-500 shadow-[0_0_60px_rgba(56,189,248,0.6)]"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className="text-2xl font-bold text-white">Skills</span>
      </motion.div>

      {/* Orbiting skills */}
      {skills.slice(0, 8).map((skill, index) => {
        const angle = (index / skills.slice(0, 8).length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={skill.name}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x,
              y,
              opacity: 1,
              rotate: -360,
            }}
            transition={{
              x: { duration: 1, delay: index * 0.1 },
              y: { duration: 1, delay: index * 0.1 },
              opacity: { duration: 0.5, delay: index * 0.1 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-slate-900/80 p-2 backdrop-blur-xl"
              whileHover={{ scale: 1.3, zIndex: 20 }}
              animate={{
                boxShadow:
                  hoveredIndex === index
                    ? "0 0 30px rgba(56, 189, 248, 0.6)"
                    : "0 0 10px rgba(56, 189, 248, 0.2)",
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="h-full w-full object-contain"
              />
            </motion.div>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl"
              >
                {skill.name}
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Orbit rings */}
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full border border-sky-400/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-[320px] w-[320px] rounded-full border border-violet-400/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default SkillsOrbit;
