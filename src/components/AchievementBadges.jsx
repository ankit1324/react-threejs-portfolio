import { motion } from "framer-motion";
import { useState } from "react";

const AchievementBadges = () => {
  const [hoveredBadge, setHoveredBadge] = useState(null);

  const badges = [
    {
      icon: "🏆",
      title: "Top Performer",
      description: "Consistently delivered high-quality projects",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: "⚡",
      title: "Fast Learner",
      description: "Quickly adapts to new technologies",
      color: "from-sky-400 to-blue-500",
    },
    {
      icon: "🎯",
      title: "Problem Solver",
      description: "Expert at debugging and optimization",
      color: "from-violet-400 to-purple-500",
    },
    {
      icon: "🚀",
      title: "Innovation Leader",
      description: "Drives technical innovation",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: "🤝",
      title: "Team Player",
      description: "Excellent collaboration skills",
      color: "from-emerald-400 to-green-500",
    },
    {
      icon: "📚",
      title: "Continuous Learner",
      description: "Always expanding knowledge",
      color: "from-cyan-400 to-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          onHoverStart={() => setHoveredBadge(index)}
          onHoverEnd={() => setHoveredBadge(null)}
          className="relative"
        >
          <div
            className={`flex aspect-square flex-col items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br ${badge.color} p-4 shadow-lg`}
          >
            <span className="text-4xl mb-2">{badge.icon}</span>
            <span className="text-xs font-bold text-white text-center">
              {badge.title}
            </span>
          </div>
          <AnimatePresence>
            {hoveredBadge === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -bottom-16 left-1/2 z-10 w-48 -translate-x-1/2 rounded-xl border border-white/20 bg-slate-900/95 p-3 text-center backdrop-blur-xl"
              >
                <p className="text-xs text-slate-300">{badge.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementBadges;
