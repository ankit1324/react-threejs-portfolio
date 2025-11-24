import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const TestimonialsCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials.length) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-2xl font-bold text-white">
              {current.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white">{current.name}</p>
              <p className="text-sm text-slate-400">{current.designation}</p>
              <p className="text-xs text-slate-500">{current.company}</p>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed">{current.testimonial}</p>
          <div className="mt-6 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-amber-400">
                ⭐
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-sky-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <MagneticButton
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-sky-400/50 hover:bg-sky-400/10"
          >
            ←
          </MagneticButton>
          <MagneticButton
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-sky-400/50 hover:bg-sky-400/10"
          >
            →
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
