import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA"
      );

      // Add trail effect
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      };
      trailRef.current = [...trailRef.current, newTrail].slice(-8);
      setTrail(trailRef.current);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="pointer-events-none fixed z-50 hidden h-1 w-1 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 md:block"
          initial={{ x: point.x, y: point.y, opacity: 0.6, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          style={{
            left: 0,
            top: 0,
            transform: `translate(${point.x}px, ${point.y}px)`,
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden rounded-full border-2 md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          width: isPointer ? 48 : 40,
          height: isPointer ? 48 : 40,
          borderColor: isPointer
            ? "rgba(139, 92, 246, 0.8)"
            : "rgba(56, 189, 248, 0.6)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          boxShadow: isPointer
            ? "0 0 20px rgba(139, 92, 246, 0.4)"
            : "0 0 15px rgba(56, 189, 248, 0.3)",
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden rounded-full md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicking ? 1.5 : isPointer ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
        }}
        style={{
          width: 6,
          height: 6,
          background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
          boxShadow: "0 0 10px rgba(56, 189, 248, 0.8)",
        }}
      />

      {/* Hover effect circle */}
      {isPointer && (
        <motion.div
          className="pointer-events-none fixed z-50 hidden rounded-full md:block"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1,
            opacity: 0.3,
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          style={{
            width: 48,
            height: 48,
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)",
          }}
        />
      )}
    </>
  );
};

export default CursorTrail;
