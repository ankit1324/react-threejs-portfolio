import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { useScrollDirection } from "../hooks/useScrollDirection";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const menuItems = (
    <ul className="flex flex-col md:flex-row gap-6 text-sm font-semibold tracking-wide">
      {navLinks.map((nav) => (
        <li key={nav.id}>
          <a
            href={`#${nav.id}`}
            className={`transition-colors duration-200 ${
              active === nav.title ? "text-white" : "text-slate-300"
            } hover:text-white`}
            onClick={() => {
              setActive(nav.title);
              setOpen(false);
            }}
          >
            {nav.title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === "down" && scrolled ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.paddingX} fixed top-0 left-0 right-0 py-6 z-30 transition-all duration-500`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-6 py-3 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/80 border-white/10 shadow-[0_20px_120px_rgba(6,182,212,0.15)]"
            : "bg-white/5 border-white/10"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-4"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-400 text-lg font-bold text-white shadow-lg shadow-sky-500/30">
            AC
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
              Portfolio
            </p>
            <p className="text-lg font-semibold text-white">
              Ankit Chaudhary
            </p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          {menuItems}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Let&apos;s talk
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          aria-label="Toggle navigation menu"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="mx-auto mt-4 max-w-6xl rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-5 backdrop-blur-2xl">
              {menuItems}
              <a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Start a project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
