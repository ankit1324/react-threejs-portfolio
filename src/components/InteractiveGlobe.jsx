import { motion } from "framer-motion";

const InteractiveGlobe = () => {
  const locations = [
    { name: "Mumbai", x: 60, y: 55, active: true },
    { name: "Himachal Pradesh", x: 58, y: 45, active: true },
    { name: "Remote", x: 50, y: 50, active: false },
  ];

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Globe grid */}
      <svg className="absolute inset-0 h-full w-full opacity-20">
        {/* Latitude lines */}
        {[...Array(9)].map((_, i) => (
          <motion.ellipse
            key={`lat-${i}`}
            cx="50%"
            cy="50%"
            rx="45%"
            ry={`${5 + i * 5}%`}
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
        {/* Longitude lines */}
        {[...Array(12)].map((_, i) => (
          <motion.ellipse
            key={`lon-${i}`}
            cx="50%"
            cy="50%"
            rx={`${5 + i * 3.75}%`}
            ry="45%"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
      </svg>

      {/* Location markers */}
      {locations.map((location, index) => (
        <motion.div
          key={location.name}
          className="absolute"
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <motion.div
            className={`relative flex h-4 w-4 items-center justify-center rounded-full ${
              location.active ? "bg-sky-400" : "bg-slate-500"
            }`}
            animate={
              location.active
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(56, 189, 248, 0.7)",
                      "0 0 0 10px rgba(56, 189, 248, 0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="h-2 w-2 rounded-full bg-white" />
          </motion.div>
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-xl"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {location.name}
          </motion.div>
        </motion.div>
      ))}

      {/* Rotating glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default InteractiveGlobe;
