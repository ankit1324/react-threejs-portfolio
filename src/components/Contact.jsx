import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast";
import Confetti from "react-confetti";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const staggerReveal = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in every field so I can get back to you.", {
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    emailjs
      .send(
        "service_8kfphq8",
        "template_n0xy874",
        {
          from_name: form.name,
          to_name: "Ankit Chaudhary",
          from_email: form.email,
          to_email: "ankitdx245@gmail.com",
          message: form.message,
        },
        "lzCupwe-D0fCLkJA5",
      )
      .then(
        () => {
          setLoading(false);
          setSent(true);
          setForm({ name: "", email: "", message: "" });
          toast.success("Message sent. I’ll reply shortly.");
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            setSent(false);
          }, 4000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("Something went wrong. Please try again soon.");
        },
      );
  };

  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false);
  }, []);

  return (
    <section className="relative">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid rgba(148,163,184,0.3)",
          },
        }}
      />
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={windowSize.width > 768 ? 200 : 120}
          recycle={false}
          onConfettiComplete={handleConfettiComplete}
        />
      )}

      <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`${styles.sectionSubText} text-left`}
              >
                Say hello
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className={`${styles.sectionHeadText} text-left`}
              >
                Contact
              </motion.h3>
            </div>
            <motion.a
              href="tel:+919805531236"
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full rounded-2xl border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white/80 transition hover:border-white/40 sm:w-auto"
            >
              +91 98055 31236
            </motion.a>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="mt-4 text-xs leading-relaxed text-slate-400 sm:text-sm"
          >
            Tell me about the product, team, or crazy idea you&apos;re building.
            I usually respond within 24 hours.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            variants={staggerReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-8 space-y-4 sm:mt-10 sm:space-y-6"
          >
            <motion.div variants={itemReveal} className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <motion.label
                variants={itemReveal}
                whileHover={{ y: -2 }}
                className="flex flex-col text-xs font-semibold text-slate-200 sm:text-sm"
              >
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Who should I thank?"
                  className="mt-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none sm:py-3 sm:text-base"
                />
              </motion.label>
              <motion.label
                variants={itemReveal}
                whileHover={{ y: -2 }}
                className="flex flex-col text-xs font-semibold text-slate-200 sm:text-sm"
              >
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="mt-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none sm:py-3 sm:text-base"
                />
              </motion.label>
            </motion.div>
            <motion.label
              variants={itemReveal}
              whileHover={{ y: -2 }}
              className="flex flex-col text-xs font-semibold text-slate-200 sm:text-sm"
            >
              Message
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the vision, the problems, or the vibe you’d like to create."
                className="mt-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none sm:py-4 sm:text-base"
              />
            </motion.label>
            <motion.button
              type="submit"
              disabled={loading}
              variants={itemReveal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-3xl sm:py-4"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                  />
                  Sending...
                </>
              ) : sent ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    ✓
                  </motion.span>
                  Delivered — talk soon!
                </>
              ) : (
                "Send message"
              )}
            </motion.button>
          </motion.form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-400 sm:text-xs sm:tracking-[0.4em]">
                Availability
              </p>
              <p className="text-sm font-semibold text-white sm:text-base">
                Open for new collaborations
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 px-3 py-1 text-xs text-slate-300">
              GMT+5:30
            </div>
          </div>
          <div className="h-[300px] w-full sm:h-[420px]">
            <EarthCanvas />
          </div>
          <motion.div
            variants={staggerReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-4 border-t border-white/10 px-4 py-5 text-xs text-slate-300 sm:px-6 sm:py-6 sm:text-sm"
          >
            <motion.div
              variants={itemReveal}
              whileHover={{ x: 4 }}
              className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>Email</span>
              <a
                href="mailto:ankitdx245@gmail.com"
                className="font-semibold text-white hover:underline"
              >
                ankitdx245@gmail.com
              </a>
            </motion.div>
            <motion.div
              variants={itemReveal}
              whileHover={{ x: 4 }}
              className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>Current base</span>
              <p className="font-semibold text-white">
                Mumbai · Himachal Pradesh
              </p>
            </motion.div>
            <motion.div
              variants={itemReveal}
              whileHover={{ x: 4 }}
              className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>Response time</span>
              <p className="font-semibold text-white">~24 hours</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");
