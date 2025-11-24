import { motion } from "framer-motion";

const FloatingIcons = () => {
  const icons = [
    { emoji: "⚡", delay: 0, x: "10%", y: "20%" },
    { emoji: "🚀", delay: 0.5, x: "80%", y: "15%" },
    { emoji: "💻", delay: 1, x: "15%", y: "70%" },
    { emoji: "🎨", delay: 1.5, x: "85%", y: "75%" },
    { emoji: "☁️", delay: 2, x: "50%", y: "40%" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-20">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -100],
          }}
          transition={{
            duration: 8,
            delay: icon.delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          style={{
            left: icon.x,
            top: icon.y,
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
