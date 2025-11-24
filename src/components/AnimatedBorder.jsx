import { motion } from "framer-motion";

const AnimatedBorder = ({ children, className = "" }) => {
  return (
    <div className={`group relative ${className}`}>
      <motion.div
        className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 opacity-0 blur-sm transition-opacity group-hover:opacity-100"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      <div className="relative rounded-[inherit] bg-slate-900">{children}</div>
    </div>
  );
};

export default AnimatedBorder;
