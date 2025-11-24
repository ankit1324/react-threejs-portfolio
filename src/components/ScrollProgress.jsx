import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 h-1 origin-left bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 h-1 origin-left bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 blur-sm"
        style={{ scaleX, opacity: 0.5 }}
      />
    </>
  );
};

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      whileHover={{ scale: 1.1, rotate: 360 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="group fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-sky-500/50"
      aria-label="Scroll to top"
    >
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.div>
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 blur-xl transition-opacity group-hover:opacity-70" />
    </motion.button>
  );
};

export default ScrollProgress;
