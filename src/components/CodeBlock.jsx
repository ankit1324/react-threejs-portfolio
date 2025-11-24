import { useState } from "react";
import { motion } from "framer-motion";

const CodeBlock = ({ code, language = "javascript" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {language}
        </span>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition-all hover:border-sky-400/50 hover:bg-sky-400/10"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </motion.button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm text-slate-300">{code}</code>
      </pre>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

export default CodeBlock;
