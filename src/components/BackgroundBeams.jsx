import { motion } from "framer-motion";

const BackgroundBeams = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated beams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-px bg-gradient-to-b from-transparent via-sky-400/20 to-transparent"
          initial={{ x: `${20 * i}%`, opacity: 0 }}
          animate={{
            x: [`${20 * i}%`, `${20 * i + 10}%`, `${20 * i}%`],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal beams */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"
          initial={{ y: `${30 * i}%`, opacity: 0 }}
          animate={{
            y: [`${30 * i}%`, `${30 * i + 10}%`, `${30 * i}%`],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Radial gradient spots */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default BackgroundBeams;
