import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Large follower */}
      <motion.div
        className="pointer-events-none fixed z-40 hidden h-64 w-64 rounded-full md:block"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.5,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.4), rgba(139, 92, 246, 0.2), transparent)",
          filter: "blur(40px)",
        }}
      />

      {/* Medium follower */}
      <motion.div
        className="pointer-events-none fixed z-40 hidden h-32 w-32 rounded-full md:block"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          opacity: isVisible ? 0.2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          mass: 0.3,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.3), transparent)",
          filter: "blur(30px)",
        }}
      />
    </>
  );
};

export default MouseFollower;
