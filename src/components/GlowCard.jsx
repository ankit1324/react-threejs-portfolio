import { useState } from "react";
import { motion } from "framer-motion";

const GlowCard = ({ children, className = "", glowColor = "sky" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors = {
    sky: "rgba(56, 189, 248, 0.4)",
    violet: "rgba(139, 92, 246, 0.4)",
    pink: "rgba(236, 72, 153, 0.4)",
  };

  return (
    <motion.div
      className={`group relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 40%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default GlowCard;
