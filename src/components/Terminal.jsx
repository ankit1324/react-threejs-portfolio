import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { education } from "../constants";

const terminalPrompt = "ankit@command-room";
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const schoolEntries = education.filter((item) =>
  item.title.toLowerCase().includes("school")
);

const educationSummary = education.map((item) => {
  const highlight = item.points?.find((point) => point && point.trim().length);
  return `${item.date} • ${item.title} @ ${item.company_name}${
    highlight ? ` — ${highlight}` : ""
  }`;
});

const schoolSummary = schoolEntries.length
  ? schoolEntries.map(
      (item) =>
        `${item.date} • ${item.title} (${item.company_name})${
          item.points?.[1] ? ` — ${item.points[1]}` : ""
        }`
    )
  : ["School history coming soon."];

const commandDefinitions = [
  {
    command: "/ankit",
    description: "Quick bio + current focus",
    lines: [
      "Name: Ankit Chaudhary",
      "Role: Software Engineer • Paramotor Digital Technology",
      "Mission: Make 3D-heavy, data-rich apps feel effortless.",
    ],
  },
  {
    command: "/school",
    description: "School milestones",
    lines: schoolSummary,
  },
  {
    command: "/edu",
    description: "Full education runway",
    lines: educationSummary,
  },
  {
    command: "/stack",
    description: "Product engineering stack",
    lines: [
      "Frontend: React 18, React Native, Expo, Tailwind, R3F.",
      "Routing + Data: React Router, TanStack Query, REST/GraphQL.",
      "State: Zustand, Context, event emitters.",
    ],
  },
  {
    command: "/ops",
    description: "Cloud operations overview",
    lines: [
      "Infra: AWS (Lambda, ECS, CloudFront, Route 53).",
      "Pipelines: GitHub Actions + environments guarded by tests.",
      "Observability: Datadog traces + Vercel Speed Insights.",
    ],
  },
  {
    command: "/devops",
    description: "DevOps emphasis (till ECS)",
    lines: [
      "Container stories live on ECS/Fargate (no Kubernetes needed).",
      "IaC via CDK + Terraform snippets for repeatable infra.",
      "Release guardrails: smoke tests + automated rollbacks.",
    ],
  },
  {
    command: "/mobile",
    description: "React Native focus",
    lines: [
      "Native targets built with React Native (iOS + Android).",
      "Performance tuned with Hermes + Flipper profiling.",
      "Shared UI primitives between web + native for parity.",
    ],
  },
  {
    command: "/expo",
    description: "Expo CLI workflow",
    lines: [
      "Expo Router for file-based navigation + OTA updates.",
      "Custom dev clients for camera, sensors, AR hooks.",
      "EAS builds automate signing + store uploads.",
    ],
  },
  {
    command: "/cli",
    description: "React Native CLI workflow",
    lines: [
      "Bare metal builds when native modules need tweaking.",
      "Fastlane + Gradle scripts keep release steps scripted.",
      "Focus on bridging device APIs + offline-first UX.",
    ],
  },
  {
    command: "/3d",
    description: "3D + motion pipeline",
    lines: [
      "Modeling in Blender/Cinema4D → optimized GLTF scenes.",
      "React Three Fiber + Drei + GLSL sparkles.",
      "Cameras choreographed with Framer Motion + Scroll.",
    ],
  },
  {
    command: "/labs",
    description: "R&D sandbox",
    lines: [
      "Currently prototyping command palettes for enterprise dashboards.",
      "Looking at edge functions + lightweight AI copilots.",
      "Goal: keep shipping serious products with indie energy.",
    ],
  },
  {
    command: "/ships",
    description: "Release cadence",
    lines: [
      "Average: 3–4 production pushes/week.",
      "Feature flags + canary routes for safe launches.",
      "Post-release checklist auto-logs in Linear/ClickUp.",
    ],
  },
  {
    command: "/toolbox",
    description: "Productivity toolbox",
    lines: [
      "CLIs: pnpm, Expo, AWS, Amplify, tsc, eslint, playwright.",
      "Design: Figma, Lottie, Protopie for motion previews.",
      "Docs: Notion, Obsidian, Loom for async comms.",
    ],
  },
  {
    command: "/now",
    description: "What I'm currently building",
    lines: [
      "Wrapping a React Native/Expo build for field engineers.",
      "Standing up ECS services that sync telemetry in near real-time.",
      "Exploring AI copilots for deployment summaries.",
    ],
  },
];

const commandMap = Object.fromEntries(
  commandDefinitions.map(({ command, lines }) => [command, lines])
);

const helpLines = [
  ...commandDefinitions.map(
    ({ command, description }) => `${command} — ${description}`
  ),
  "/ai <prompt> — Chat with Gemini 2.5 Flash (set VITE_GEMINI_API_KEY).",
  "/clear — Wipe the terminal history.",
];

const responseMap = {
  ...commandMap,
  "/help": helpLines,
};

const availableCommands = [
  ...commandDefinitions.map((cmd) => cmd.command),
  "/ai",
  "/help",
  "/clear",
];

const statusColor = {
  info: "text-slate-400",
  success: "text-emerald-300",
  running: "text-sky-300",
  warning: "text-amber-200",
  error: "text-rose-300",
};

const quickFacts = [
  {
    label: "Stack",
    value: "React + Three.js",
    detail: "Framer Motion • Tailwind • R3F",
  },
  {
    label: "Mobile",
    value: "React Native",
    detail: "Expo + RN CLI shipping in tandem",
  },
  {
    label: "Ops",
    value: "AWS + GitHub Actions",
    detail: "Lambda • ECS • CloudFront",
  },
  {
    label: "Monitoring",
    value: "Datadog + Vercel SI",
    detail: "Tracing • vitals • RUM hooks",
  },
];

const placeholderCommands = [...commandDefinitions.slice(0, 3).map((c) => c.command), "/ai"].join(
  " · "
);

const fetchGemini = async (apiKey, conversation) => {
  const contents =
    conversation.length > 0
      ? conversation.map((message) => ({
          role: message.role,
          parts: [{ text: message.text }],
        }))
      : [
          {
            role: "user",
            parts: [{ text: "Introduce yourself briefly." }],
          },
        ];

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || "Unable to reach Gemini.");
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("")
      .trim() || "Gemini returned an empty response.";

  return text.split("\n").filter((line) => line.trim().length);
};

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      id: "welcome",
      isSystem: true,
      message: "Welcome aboard. Type /help to explore available commands.",
      status: "info",
    },
  ]);
  const [aiThread, setAiThread] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const appendEntry = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  const updateEntry = (id, updates) => {
    setHistory((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const handleAiCommand = async (rawCommand, promptText) => {
    const entryId = `${Date.now()}-${rawCommand}`;
    const hasPrompt = Boolean(promptText);

    appendEntry({
      id: entryId,
      prompt: terminalPrompt,
      command: rawCommand,
      output: hasPrompt
        ? ["Connecting to Gemini free tier..."]
        : ["Usage: /ai <prompt>. Example: /ai suggest a hero headline."],
      status: hasPrompt ? "running" : "error",
    });

    if (!hasPrompt) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      updateEntry(entryId, {
        output: [
          "Gemini API key missing.",
          "Create a free key at makersuite.google.com and set VITE_GEMINI_API_KEY in your .env file.",
        ],
        status: "warning",
      });
      return;
    }

    try {
      const conversationContext = [
        ...aiThread.map((message) => ({
          role: message.role,
          text: message.text,
        })),
        { role: "user", text: promptText },
      ];

      const lines = await fetchGemini(apiKey, conversationContext);
      const assistantText = lines.join("\n");

      setAiThread([
        ...conversationContext,
        { role: "model", text: assistantText },
      ]);
      updateEntry(entryId, {
        output: lines,
        status: "success",
      });
    } catch (error) {
      updateEntry(entryId, {
        output: [
          "Gemini request failed.",
          error.message || "Please try again in a minute.",
        ],
        status: "error",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const rawCommand = input.trim();
    const normalized = rawCommand.toLowerCase();
    setInput("");

    if (normalized === "/clear") {
      setHistory([]);
      return;
    }

    if (normalized.startsWith("/ai")) {
      const promptText = rawCommand.slice(3).trim();
      handleAiCommand(rawCommand, promptText);
      return;
    }

    const response = responseMap[normalized];
    appendEntry({
      id: `${Date.now()}-${rawCommand}`,
      prompt: terminalPrompt,
      command: rawCommand,
      output:
        response ??
        [
          `Command "${rawCommand}" not found.`,
          `Try one of: ${availableCommands.join(", ")}`,
        ],
      status: response ? "success" : "error",
    });
  };

  return (
    <section>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${styles.sectionSubText} text-center`}
      >
        Live terminal
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${styles.sectionHeadText} text-center`}
      >
        Command room
      </motion.h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-400">
        Fire commands to pull up bios, schooling, React Native workflows,
        DevOps notes—even ask Gemini (free tier) via <code>/ai</code>.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="glass-panel overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-[#040716] to-[#090f29]">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <p className="ml-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              shell · interactive
            </p>
          </div>

          <div
            ref={scrollRef}
            className="max-h-[480px] space-y-4 overflow-y-auto px-5 py-6 font-mono text-sm text-slate-200"
          >
            {history.map((entry) =>
              entry.isSystem ? (
                <p
                  key={entry.id}
                  className={`${statusColor[entry.status]} text-xs`}
                >
                  {entry.message}
                </p>
              ) : (
                <div key={entry.id}>
                  <p className="text-slate-500">
                    {entry.prompt}
                    <span className="text-sky-300"> $</span>{" "}
                    <span className="text-slate-100">{entry.command}</span>
                  </p>
                  <div className="mt-2 space-y-1">
                    {entry.output.map((line, idx) => (
                      <p
                        key={`${entry.id}-line-${idx}`}
                        className={`pl-6 text-xs ${
                          statusColor[entry.status] ?? "text-slate-300"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-3 border-t border-white/10 px-5 py-4 font-mono text-sm text-slate-200"
          >
            <span className="flex-none whitespace-nowrap text-slate-500">
              {terminalPrompt} <span className="text-sky-300">$</span>
            </span>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={`/help • try ${placeholderCommands}`}
              className="min-w-[140px] flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none"
              autoComplete="off"
            />
          </form>
        </div>

        <div className="glass-panel border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Quick facts
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-sky-400/50 hover:bg-sky-400/5 hover:shadow-[0_10px_30px_rgba(56,189,248,0.2)]"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-500">
                  {fact.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                  {fact.value}
                </p>
                <p className="text-xs text-slate-400">{fact.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Terminal, "terminal");
