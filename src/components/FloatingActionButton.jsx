import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { resume } from "../assets";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: "📧",
      label: "Email",
      action: () => window.location.href = "mailto:ankitdx245@gmail.com",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      action: () => window.open("https://www.linkedin.com/in/ankitchaudhary1324/", "_blank"),
    },
    {
      icon: "🐙",
      label: "GitHub",
      action: () => window.open("https://github.com/ankit1324", "_blank"),
    },
    {
      icon: "📄",
      label: "Resume",
      action: () => window.open(resume, "_blank"),
    },
  ];

  return (
    <div className="fixed bottom-24 left-8 z-40 hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <MagneticButton
                  onClick={action.action}
                  className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 backdrop-blur-xl transition-all hover:border-sky-400/50 hover:bg-sky-400/10"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-sm font-semibold text-white">
                    {action.label}
                  </span>
                </MagneticButton>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <MagneticButton
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-2xl text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-sky-500/50"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? "✕" : "✨"}
        </motion.span>
      </MagneticButton>
    </div>
  );
};

export default FloatingActionButton;
