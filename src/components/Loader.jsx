import { Html, useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export const PageLoader = ({ onComplete }) => {
  const labels = ["DEV", "ENGINEER", "ANKIT CHAUDHARY"];
  const [progress, setProgress] = useState(1);
  const [labelIndex, setLabelIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) return 100;
        return value + 1;
      });
    }, 26);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100 || labelIndex !== -1) return;
    const delay = setTimeout(() => setLabelIndex(0), 350);
    return () => clearTimeout(delay);
  }, [progress, labelIndex]);

  useEffect(() => {
    if (labelIndex < 0) return undefined;

    if (labelIndex < labels.length - 1) {
      const timer = setTimeout(() => {
        setLabelIndex((value) => value + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }

    const completeTimer = setTimeout(() => {
      if (typeof onComplete === "function") {
        onComplete();
      }
    }, 1500);

    return () => clearTimeout(completeTimer);
  }, [labelIndex, labels.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#030014] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(248, 250, 252, 0.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.16),transparent_70%)]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />

      <div className="relative z-10 px-6 text-center">
        <AnimatePresence mode="wait">
          {labelIndex < 0 ? (
            <motion.div
              key="counter"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div
                className="font-ndot text-4xl tracking-[0.18em] text-white sm:text-6xl md:text-7xl"
                style={{ textShadow: "0 0 18px rgba(255,255,255,0.25)" }}
              >
                {progress}%
              </div>
              <div className="mt-4 text-[0.6rem] uppercase tracking-[0.45em] text-white/70">
                loading
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`label-${labelIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div
                className="font-ndot text-3xl tracking-[0.1em] text-white sm:text-5xl md:text-6xl"
                style={{ textShadow: "0 0 18px rgba(255,255,255,0.25)" }}
              >
                {labels[labelIndex]}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-white/70"
                    animate={{ opacity: [0.2, 0.9, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CanvasLoader;
