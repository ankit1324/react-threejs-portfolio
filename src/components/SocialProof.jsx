import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const SocialProof = () => {
  const stats = [
    { value: 50, suffix: "+", label: "Projects Completed", icon: "🚀" },
    { value: 99, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
    { value: 5, suffix: "+", label: "Years Experience", icon: "💼" },
    { value: 1000, suffix: "+", label: "Commits", icon: "💻" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-sky-400/50 hover:bg-sky-400/5"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/10 via-transparent to-violet-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="text-4xl mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold text-white">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialProof;
