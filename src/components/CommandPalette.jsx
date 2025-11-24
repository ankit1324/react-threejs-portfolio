import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const commands = [
    { name: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }), icon: "🏠" },
    { name: "About", action: () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }), icon: "👤" },
    { name: "Projects", action: () => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }), icon: "💼" },
    { name: "Contact", action: () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), icon: "📧" },
    { name: "GitHub", action: () => window.open("https://github.com/ankit1324", "_blank"), icon: "🐙" },
    { name: "LinkedIn", action: () => window.open("https://www.linkedin.com/in/ankitchaudhary1324/", "_blank"), icon: "💼" },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (action) => {
    action();
    setIsOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-1/4 z-50 w-full max-w-2xl -translate-x-1/2 rounded-3xl border border-white/20 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
              autoFocus
            />
            <div className="mt-4 max-h-96 space-y-2 overflow-y-auto">
              {filteredCommands.map((cmd, index) => (
                <motion.button
                  key={cmd.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCommand(cmd.action)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-left transition-all hover:border-sky-400/50 hover:bg-sky-400/10"
                >
                  <span className="text-2xl">{cmd.icon}</span>
                  <span className="font-semibold text-white">{cmd.name}</span>
                </motion.button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Press ESC to close</span>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
