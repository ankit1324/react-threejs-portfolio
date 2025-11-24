import { motion } from "framer-motion";

const TimelineVertical = ({ items = [] }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <motion.div
        className="absolute left-8 top-0 h-full w-[2px] bg-gradient-to-b from-sky-400 via-violet-500 to-pink-500"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative flex gap-8"
          >
            {/* Timeline dot */}
            <motion.div
              className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-slate-950 bg-gradient-to-br from-sky-400 to-violet-500 shadow-lg"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl">{item.icon || "📍"}</span>
            </motion.div>

            {/* Content */}
            <motion.div
              className="glass-panel flex-1 rounded-2xl border border-white/10 bg-white/5 p-6"
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  {item.date}
                </span>
              </div>
              <p className="mb-2 text-sm text-slate-400">{item.subtitle}</p>
              <p className="text-sm text-slate-300">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TimelineVertical;
