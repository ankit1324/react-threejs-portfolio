import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import aiAvatar from "../assets/ai-avater/ai-avater.png";
import aiAvatarGif from "../assets/ai-avater/ai-video.gif";
import profilePhoto from "../assets/pfp.png";
import { resume as resumePdf } from "../assets";
import {
  projects,
  technologies,
  itTools,
  cybersecurityTools,
  designTools,
  extracurricular,
  experiences,
  education as educationItems,
} from "../constants";

const tileIconClass = "h-4 w-4";
const childCloseButtonClass =
  "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-light leading-none text-slate-600 transition hover:border-slate-400 hover:text-slate-900";

const MeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="9" cy="10" r="1.1" fill="currentColor" />
    <circle cx="15" cy="10" r="1.1" fill="currentColor" />
    <path
      d="M8 14c1 1.3 2.2 2 4 2s3-.7 4-2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <rect x="3" y="6" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 11h18" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 6V4.5h6V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const EducationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7.5 12v3.2c0 1.1 2 2.3 4.5 2.3s4.5-1.2 4.5-2.3V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ExperienceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <rect x="3" y="6" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 6V4.8c0-.9.7-1.6 1.6-1.6h4.8c.9 0 1.6.7 1.6 1.6V6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 11h18" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const SkillsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <path d="M12 3 4 7l8 4 8-4-8-4Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="m4 12 8 4 8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="m4 17 8 4 8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.5 18.5c1.3-2.6 3-4 5.5-4s4.2 1.4 5.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="17.5" cy="12.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 17c.8.5 1.5 1.2 2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CertificationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <rect x="4" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="m10 16-1 4 3-2 3 2-1-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={tileIconClass}>
    <path d="M7 3h8l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10 12h6M10 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const AnimatedMainLogo = () => (
  <motion.svg
    viewBox="0 0 64 64"
    className="h-9 w-9"
    aria-label="Animated brand logo"
    role="img"
    animate={{
      y: [0, -1.2, 0],
      scale: [1, 1.03, 1],
    }}
    transition={{
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.path
      d="M6 10 30 22v10l-8-4v24l-10-5V20L6 17V10Z"
      fill="#020617"
      animate={{ x: [0, -0.9, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M58 10 34 22v10l8-4v24l10-5V20l6-3V10Z"
      fill="#020617"
      animate={{ x: [0, 0.9, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

const contactTileStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.12,
    },
  },
};

const contactTileReveal = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const quickTabs = [
  { id: "me", label: "Me", icon: MeIcon, color: "text-[#2ca6a2]" },
  { id: "projects", label: "Projects", icon: ProjectsIcon, color: "text-[#46a069]" },
  { id: "education", label: "Edu", icon: EducationIcon, color: "text-[#0ea5a3]" },
  { id: "experience", label: "Work", icon: ExperienceIcon, color: "text-[#2563eb]" },
  { id: "certifications", label: "Cert", icon: CertificationIcon, color: "text-[#f59e0b]" },
  { id: "resume", label: "Resume", icon: ResumeIcon, color: "text-[#0f172a]" },
  { id: "skills", label: "Skills", icon: SkillsIcon, color: "text-[#8870e9]" },
  { id: "contact", label: "Contact", icon: ContactIcon, color: "text-[#be922a]" },
];

const tileQueryPrompts = {
  me: "Tell me about yourself in a short intro.",
  projects: "Show me your best projects with outcomes and links.",
  education: "Summarize your education and core coursework.",
  experience: "List your work experience and major impact.",
  certifications: "Show your certifications and credentials.",
  resume: "Preview your resume and provide a download option.",
  skills: "What are your skills? Give me a list of soft and hard skills.",
  contact: "How can I contact you and collaborate with you?",
};

const aiDelayByTab = {
  me: 900,
  education: 1300,
  experience: 1450,
  contact: 1200,
  certifications: 1650,
  resume: 1250,
  projects: 2000,
  skills: 2100,
};

const generatingResponseText = "Generating response...";
const AI_CHAT_TAB_ID = "ai-chat";
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const askAiSystemPrompt = `
You are Ankit Chaudhary's portfolio assistant.
Respond in 3-5 concise sentences.
Anchor replies to Ankit's strengths: React, React Native, TypeScript, Node.js, Three.js, AWS, and delivery-focused engineering.
If asked about collaboration, suggest contacting through the portfolio contact section or LinkedIn.
If information is not available in portfolio context, say that clearly and offer a practical next step.
`;

const fakeThinkingSteps = [
  "Understanding your request",
  "Searching profile context",
  "Crafting the best answer",
];

const buildGeminiPrompt = (question, historyMessages = []) => {
  const recentHistory = historyMessages
    .slice(-8)
    .map((message) => {
      const speaker = message.role === "assistant" ? "Assistant" : "User";
      return `${speaker}: ${message.text}`;
    })
    .join("\n\n");

  return `${askAiSystemPrompt}

${recentHistory ? `Conversation so far:\n${recentHistory}\n\n` : ""}User: ${question}
Assistant:`;
};

const fetchAskAiResponse = async (apiKey, question, historyMessages = []) => {
  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: buildGeminiPrompt(question, historyMessages) }],
        },
      ],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 300,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || "Unable to reach Gemini right now.");
  }

  const data = await response.json();
  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("\n")
      .trim() || "Gemini returned an empty response."
  );
};

const normalizeNames = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const label = String(item || "").trim();
    if (!label) return;
    const key = label.toLowerCase();
    if (!map.has(key)) map.set(key, label);
  });
  return Array.from(map.values());
};

const ChildCloseButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={childCloseButtonClass}
    aria-label="Close section"
  >
    ×
  </button>
);

const Hero = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [pendingTab, setPendingTab] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [typedGeneratingText, setTypedGeneratingText] = useState("");
  const [thinkingStepIndex, setThinkingStepIndex] = useState(0);
  const [projectStartIndex, setProjectStartIndex] = useState(0);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [isAvatarAnimating, setIsAvatarAnimating] = useState(false);
  const [gifRunId, setGifRunId] = useState(0);
  const [askInput, setAskInput] = useState("");
  const [askAiLoading, setAskAiLoading] = useState(false);
  const [askAiQuestion, setAskAiQuestion] = useState("");
  const [askAiResponse, setAskAiResponse] = useState("");
  const [askAiError, setAskAiError] = useState("");
  const [fullChatInput, setFullChatInput] = useState("");
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      id: "ai-welcome",
      role: "assistant",
      text: "Hey, I am your AI agent. Ask me about projects, stack, experience, or collaboration.",
    },
  ]);
  const hasAutoPlayedRef = useRef(false);
  const animationTimerRef = useRef(null);
  const aiTransitionTimerRef = useRef(null);
  const fullChatScrollRef = useRef(null);

  useEffect(() => {
    const gifImage = new Image();
    gifImage.src = aiAvatarGif;
    gifImage.onload = () => setGifLoaded(true);

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      if (aiTransitionTimerRef.current) {
        clearTimeout(aiTransitionTimerRef.current);
      }
      gifImage.onload = null;
    };
  }, []);

  const runAvatarAnimation = useCallback(() => {
    if (!gifLoaded) return;

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    setGifRunId((value) => value + 1);
    setIsAvatarAnimating(true);

    animationTimerRef.current = setTimeout(() => {
      setIsAvatarAnimating(false);
    }, 2400);
  }, [gifLoaded]);

  useEffect(() => {
    if (!gifLoaded || hasAutoPlayedRef.current) return undefined;

    const timer = setTimeout(() => {
      runAvatarAnimation();
      hasAutoPlayedRef.current = true;
    }, 1200);

    return () => clearTimeout(timer);
  }, [gifLoaded, runAvatarAnimation]);

  const avatarSource = isAvatarAnimating
    ? `${aiAvatarGif}?run=${gifRunId}`
    : aiAvatar;

  const isProjectsView = activeTab === "projects";
  const isMeView = activeTab === "me";
  const visibleProjectCount = Math.min(3, projects.length);
  const visibleProjects = useMemo(() => {
    if (!projects.length) return [];
    return Array.from({ length: visibleProjectCount }, (_, offset) => {
      return projects[(projectStartIndex + offset) % projects.length];
    });
  }, [projectStartIndex, visibleProjectCount]);

  const moveProjectsLeft = () => {
    setProjectStartIndex((value) => {
      if (!projects.length) return value;
      if (value === 0) return projects.length - 1;
      return value - 1;
    });
  };

  const moveProjectsRight = () => {
    setProjectStartIndex((value) => {
      if (!projects.length) return value;
      return (value + 1) % projects.length;
    });
  };

  const cancelAiPreview = useCallback(() => {
    if (aiTransitionTimerRef.current) {
      clearTimeout(aiTransitionTimerRef.current);
    }
    setIsAiThinking(false);
    setPendingTab(null);
    setActiveTab(null);
  }, []);

  const triggerTabWithAi = useCallback((tabId) => {
    if (!tabId) return;
    if (aiTransitionTimerRef.current) {
      clearTimeout(aiTransitionTimerRef.current);
    }
    const delay = aiDelayByTab[tabId] ?? 1500;

    setPendingTab(tabId);
    setIsAiThinking(true);
    setActiveTab(null);

    aiTransitionTimerRef.current = setTimeout(() => {
      setActiveTab(tabId);
      setIsAiThinking(false);
      setPendingTab(null);
    }, delay);
  }, []);

  const submitAiQuestion = useCallback(
    async (question) => {
      const trimmedQuestion = question.trim();
      if (!trimmedQuestion || askAiLoading) return;

      const userMessage = {
        id: `${Date.now()}-user`,
        role: "user",
        text: trimmedQuestion,
      };
      const historyForPrompt = aiChatMessages.filter(
        (message) => message.id !== "ai-welcome",
      );

      setAskAiQuestion(trimmedQuestion);
      setAskAiError("");
      setAskAiResponse("");
      setAskAiLoading(true);
      setAiChatMessages((prev) => [...prev, userMessage]);

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        const keyError = "AI key missing. Add VITE_GEMINI_API_KEY to your .env file.";
        setAskAiError(keyError);
        setAiChatMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-assistant-error`,
            role: "assistant",
            text: keyError,
          },
        ]);
        setAskAiLoading(false);
        return;
      }

      try {
        const answer = await fetchAskAiResponse(
          apiKey,
          trimmedQuestion,
          historyForPrompt,
        );
        setAskAiResponse(answer);
        setAiChatMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-assistant`,
            role: "assistant",
            text: answer,
          },
        ]);
      } catch (error) {
        const message =
          error.message || "I hit an error reaching Gemini. Please try again.";
        setAskAiError(message);
        setAiChatMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-assistant-error`,
            role: "assistant",
            text: message,
          },
        ]);
      } finally {
        setAskAiLoading(false);
      }
    },
    [aiChatMessages, askAiLoading],
  );

  const handleAskSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const question = askInput.trim();
      if (!question) return;
      setAskInput("");
      await submitAiQuestion(question);
    },
    [askInput, submitAiQuestion],
  );

  const handleFullChatSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const question = fullChatInput.trim();
      if (!question) return;
      setFullChatInput("");
      await submitAiQuestion(question);
    },
    [fullChatInput, submitAiQuestion],
  );

  useEffect(() => {
    if (!isAiThinking) {
      setTypedGeneratingText("");
      return undefined;
    }

    let cursor = 0;
    setTypedGeneratingText("");

    const typeTimer = setInterval(() => {
      cursor += 1;
      setTypedGeneratingText(generatingResponseText.slice(0, cursor));
      if (cursor >= generatingResponseText.length) {
        clearInterval(typeTimer);
      }
    }, 50);

    return () => clearInterval(typeTimer);
  }, [isAiThinking, pendingTab]);

  useEffect(() => {
    if (!isAiThinking) {
      setThinkingStepIndex(0);
      return undefined;
    }

    setThinkingStepIndex(0);

    const stepTimer = setInterval(() => {
      setThinkingStepIndex((prev) =>
        Math.min(prev + 1, fakeThinkingSteps.length - 1),
      );
    }, 460);

    return () => clearInterval(stepTimer);
  }, [isAiThinking, pendingTab]);

  useEffect(() => {
    if (activeTab !== AI_CHAT_TAB_ID) return;
    fullChatScrollRef.current?.scrollTo({
      top: fullChatScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeTab, aiChatMessages, askAiLoading]);

  const skillsContent = useMemo(() => {
    const techNames = technologies.map((item) => item.name);
    const itToolNames = itTools.map((item) => item.name);
    const securityNames = cybersecurityTools.map((item) => item.name);
    const creativeNames = designTools.map((item) => item.name);

    const frontend = normalizeNames(
      techNames.filter((name) =>
        /(html|css|javascript|typescript|react|tailwind)/i.test(name),
      ),
    );

    const backendSystems = normalizeNames([
      ...techNames.filter(
        (name) =>
          /(java|python|c\+\+|powershell|kali|mongo|postgre|aws|linux)/i.test(name),
      ),
      ...itToolNames,
      ...securityNames.filter((name) => /(wireshark|nmap|metasploit|hydra|aircrack|john)/i.test(name)),
    ]);

    const aiFullstack = normalizeNames([
      ...techNames.filter((name) => /(react native|react js|typescript|aws|mongo|postgre)/i.test(name)),
      ...itToolNames.filter((name) => /(aws ecs|docker|github actions|expo cli)/i.test(name)),
      "Automation Workflows",
      "API Integrations",
      "Cloud Deployments",
    ]);

    return {
      frontend,
      backendSystems,
      creative: normalizeNames(creativeNames),
      softSkills: [
        "Communication",
        "Problem-Solving",
        "Adaptability",
        "Learning Agility",
        "Teamwork",
        "Creativity",
        "Focus",
      ],
      aiFullstack,
    };
  }, []);

  const certificationContent = useMemo(() => {
    const types = normalizeNames(extracurricular.map((item) => item.type));
    return { types };
  }, []);

  const isContactView = activeTab === "contact";
  const isCertificationsView = activeTab === "certifications";
  const isSkillsView = activeTab === "skills";
  const isEducationView = activeTab === "education";
  const isExperienceView = activeTab === "experience";
  const isResumeView = activeTab === "resume";
  const isAiFullChatView = activeTab === AI_CHAT_TAB_ID;
  const isAiPreviewView = isAiThinking && Boolean(pendingTab);
  const aiPromptText =
    tileQueryPrompts[pendingTab] || "Thinking about your request...";
  const activeViewKey = isAiPreviewView ? `ai-${pendingTab}` : activeTab || "home";
  const isExpandedView =
    isAiPreviewView ||
    isProjectsView ||
    isSkillsView ||
    isContactView ||
    isCertificationsView ||
    isResumeView ||
    isEducationView ||
    isExperienceView ||
    isAiFullChatView;

  return (
    <section
      id="home"
      className="relative -mx-6 min-h-screen overflow-hidden bg-[#f3f4f6] px-6 pt-14 pb-24 text-slate-900 sm:-mx-12 sm:px-12 sm:pt-16 lg:-mx-20 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className={`mx-auto text-center ${isExpandedView ? "max-w-6xl" : "max-w-4xl"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeViewKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {isAiPreviewView ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-2 max-w-5xl text-left"
            >
              <div className="text-left">
                <ChildCloseButton onClick={cancelAiPreview} />
              </div>

              <div className="mt-3 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_10px_24px_rgba(15,23,42,0.1)]">
                  <img src={aiAvatar} alt="AI avatar" className="h-full w-full object-cover" />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mx-auto mt-8 inline-flex max-w-4xl rounded-full bg-[#1a7ef0] px-8 py-4 text-[1.05rem] font-medium text-white sm:text-[1.2rem]"
                >
                  {aiPromptText}
                </motion.p>

                <p className="mt-5 text-sm font-medium tracking-wide text-slate-600">
                  {typedGeneratingText}
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="ml-1 inline-block"
                  >
                    |
                  </motion.span>
                </p>

                <div className="mx-auto mt-7 grid max-w-md gap-2.5 text-left">
                  {fakeThinkingSteps.map((step, index) => {
                    const isComplete = index < thinkingStepIndex;
                    const isCurrent = index === thinkingStepIndex;

                    return (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                          isComplete || isCurrent
                            ? "border-sky-300 bg-sky-50 text-slate-700"
                            : "border-slate-200 bg-white/70 text-slate-500"
                        }`}
                      >
                        <span className="inline-flex h-4 w-4 items-center justify-center text-xs">
                          {isComplete ? "✓" : isCurrent ? "…" : "○"}
                        </span>
                        <span>{step}</span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-center gap-2">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={`thinking-dot-${dot}`}
                      animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: dot * 0.18,
                      }}
                      className="h-2.5 w-2.5 rounded-full bg-slate-800"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : isAiFullChatView ? (
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />

              <motion.div
                layout
                className="relative overflow-hidden rounded-[30px] border border-slate-300 bg-gradient-to-br from-[#f8fbff] via-white to-[#f1f5ff] shadow-[0_25px_80px_rgba(15,23,42,0.16)]"
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-20 top-[-120px] h-80 w-80 rounded-full bg-sky-300/30 blur-3xl"
                  animate={{ x: [0, 35, 0], y: [0, 28, 0], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 bottom-[-120px] h-96 w-96 rounded-full bg-blue-400/25 blur-3xl"
                  animate={{ x: [0, -24, 0], y: [0, -30, 0], opacity: [0.45, 0.75, 0.45] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <div className="relative z-10 grid gap-5 p-4 sm:p-6 lg:grid-cols-[0.34fr_0.66fr]">
                  <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                    className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-md"
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                      <img src={aiAvatar} alt="AI avatar" className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                      Full chat
                    </p>
                    <h2 className="mt-2 text-[1.8rem] font-black leading-tight text-slate-900 sm:text-[2.2rem]">
                      AI Agent
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Ask about stack, projects, delivery process, or collaboration ideas. The agent keeps chat context while you continue the conversation.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[0.66rem] uppercase tracking-[0.2em] text-slate-500">Messages</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">{aiChatMessages.length}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[0.66rem] uppercase tracking-[0.2em] text-slate-500">Status</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">
                          {askAiLoading ? "Thinking" : "Live"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab(null)}
                      className="mt-5 inline-flex rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                      Back to portfolio
                    </button>
                  </motion.aside>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 }}
                    className="flex h-[560px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/85 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                          Conversation
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">Ask me anything</p>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Gemini 2.5 Flash
                      </span>
                    </div>

                    <div
                      ref={fullChatScrollRef}
                      className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5"
                    >
                      {aiChatMessages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.28, delay: index * 0.03 }}
                          className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                            message.role === "assistant"
                              ? "mr-auto bg-slate-100 text-slate-800"
                              : "ml-auto bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                          }`}
                        >
                          {message.text}
                        </motion.div>
                      ))}
                      {askAiLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mr-auto inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600"
                        >
                          <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500" />
                          Thinking...
                        </motion.div>
                      )}
                    </div>

                    <form
                      onSubmit={handleFullChatSubmit}
                      className="border-t border-slate-200 bg-white px-4 py-4 sm:px-5"
                    >
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2 shadow-[0_6px_20px_rgba(15,23,42,0.06)]">
                        <input
                          type="text"
                          value={fullChatInput}
                          onChange={(event) => setFullChatInput(event.target.value)}
                          placeholder="Ask about projects, skills, architecture..."
                          className="w-full bg-transparent px-1 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none"
                          autoComplete="off"
                          disabled={askAiLoading}
                        />
                        <button
                          type="submit"
                          disabled={!fullChatInput.trim() || askAiLoading}
                          className={`inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
                            fullChatInput.trim() && !askAiLoading
                              ? "bg-gradient-to-r from-sky-500 to-blue-500 hover:brightness-95"
                              : "cursor-not-allowed bg-slate-300 text-slate-500"
                          }`}
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ) : isProjectsView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />
              <h2 className="text-[2.7rem] font-extrabold leading-none tracking-tight text-slate-900 sm:text-[3.5rem]">
                My Projects
              </h2>

              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project) => (
                  <article
                    key={`${project.name}-${project.image}`}
                    className="group relative min-h-[340px] overflow-hidden rounded-[24px] border border-black/10 bg-black"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/95" />

                    <div className="relative z-10 flex h-full flex-col justify-between p-5">
                      <div>
                        <p className="text-sm font-medium text-white/80">
                          {project.tags?.[0]?.name?.replace(/-/g, " ") || "Featured Project"}
                        </p>
                        <h3 className="mt-1 text-[1.45rem] font-semibold leading-tight text-white sm:text-[1.6rem]">
                          {project.name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <p className="line-clamp-2 text-sm leading-relaxed text-white/85">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.live_project_link && (
                            <button
                              type="button"
                              onClick={() => window.open(project.live_project_link, "_blank")}
                              className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-100"
                            >
                              Live
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => window.open(project.source_code_link, "_blank")}
                            className="rounded-full border border-white/45 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                          >
                            Source
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={moveProjectsLeft}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
                  aria-label="Previous projects"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={moveProjectsRight}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
                  aria-label="Next projects"
                >
                  →
                </button>
              </div>

              <p className="mt-8 text-[1.2rem] leading-relaxed text-slate-800 sm:text-[1.45rem]">
                I&apos;ve got some exciting projects under my belt. Here are a few highlights:
              </p>
            </motion.div>
          ) : isSkillsView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[2.8rem] font-extrabold leading-none tracking-tight text-slate-400 sm:text-[4rem]">
                  Skills &amp; Expertise
                </h2>
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <img src={aiAvatar} alt="Ankit icon" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="mt-8 space-y-8">
                {[
                  { title: "Frontend Development", list: skillsContent.frontend },
                  { title: "Backend & Systems", list: skillsContent.backendSystems },
                  { title: "Design & Creative Tools", list: skillsContent.creative },
                  { title: "Soft Skills", list: skillsContent.softSkills },
                  { title: "AI & Fullstack Engineering", list: skillsContent.aiFullstack },
                ].map((group) => (
                  <div key={group.title}>
                    <h3 className="text-[1.9rem] font-semibold tracking-tight text-slate-900 sm:text-[2.3rem]">
                      {group.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {group.list.map((item, index) => (
                        <motion.span
                          key={`${group.title}-${item}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.46, delay: index * 0.1 }}
                          className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 sm:text-[1.14rem]"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : isContactView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[2.8rem] font-extrabold leading-none tracking-tight text-slate-400 sm:text-[4rem]">
                  Contact &amp; Collaboration
                </h2>
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <img src={aiAvatar} alt="Ankit icon" className="h-full w-full object-cover" />
                </div>
              </div>

              <p className="mt-5 text-[1.2rem] leading-relaxed text-slate-700 sm:text-[1.35rem]">
                Tell me about the product, team, or crazy idea you&apos;re building. I usually respond within 24 hours.
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-[1.9rem] font-semibold tracking-tight text-slate-900 sm:text-[2.3rem]">
                    Reach Me
                  </h3>
                  <motion.div
                    variants={contactTileStagger}
                    initial="hidden"
                    animate="show"
                    className="mt-3 flex flex-wrap gap-3"
                  >
                    <motion.a
                      variants={contactTileReveal}
                      href="mailto:ankitdx245@gmail.com"
                      className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 transition hover:bg-slate-800 sm:text-[1.14rem]"
                    >
                      ankitdx245@gmail.com
                    </motion.a>
                    <motion.a
                      variants={contactTileReveal}
                      href="tel:+919805531236"
                      className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 transition hover:bg-slate-800 sm:text-[1.14rem]"
                    >
                      +91 98055 31236
                    </motion.a>
                    <motion.span
                      variants={contactTileReveal}
                      className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 sm:text-[1.14rem]"
                    >
                      Chandigarh · Himachal Pradesh
                    </motion.span>
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-[1.9rem] font-semibold tracking-tight text-slate-900 sm:text-[2.3rem]">
                    Profiles
                  </h3>
                  <motion.div
                    variants={contactTileStagger}
                    initial="hidden"
                    animate="show"
                    className="mt-3 flex flex-wrap gap-3"
                  >
                    <motion.a
                      variants={contactTileReveal}
                      href="https://www.linkedin.com/in/ankitchaudhary1324/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 transition hover:bg-slate-800 sm:text-[1.14rem]"
                    >
                      LinkedIn
                    </motion.a>
                    <motion.a
                      variants={contactTileReveal}
                      href="https://github.com/ankit1324"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 transition hover:bg-slate-800 sm:text-[1.14rem]"
                    >
                      GitHub
                    </motion.a>
                    <motion.a
                      variants={contactTileReveal}
                      href={resumePdf}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 transition hover:bg-slate-800 sm:text-[1.14rem]"
                    >
                      Resume
                    </motion.a>
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-[1.9rem] font-semibold tracking-tight text-slate-900 sm:text-[2.3rem]">
                    Availability
                  </h3>
                  <motion.div
                    variants={contactTileStagger}
                    initial="hidden"
                    animate="show"
                    className="mt-3 flex flex-wrap gap-3"
                  >
                    {[
                      "Open for new collaborations",
                      "React Native Apps",
                      "Web Platforms",
                      "Cloud Automation",
                      "Full Stack Builds",
                    ].map((item) => (
                      <motion.span
                        variants={contactTileReveal}
                        key={item}
                        className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 sm:text-[1.14rem]"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : isResumeView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[2.8rem] font-extrabold leading-none tracking-tight text-slate-400 sm:text-[4rem]">
                  Resume
                </h2>
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <img src={aiAvatar} alt="Ankit icon" className="h-full w-full object-cover" />
                </div>
              </div>

              <p className="mt-5 text-[1.1rem] leading-relaxed text-slate-700 sm:text-[1.25rem]">
                Preview my latest resume and download a copy instantly.
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.34fr_0.66fr]">
                <div className="rounded-3xl border border-slate-300 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Resume Actions
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">
                    AnkitChaudhary.pdf
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Contains profile summary, technical stack, project highlights, and work history.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={resumePdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-xl bg-[#12151d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Open Preview
                    </a>
                    <a
                      href={resumePdf}
                      download="AnkitChaudhary.pdf"
                      className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                  <iframe
                    src={resumePdf}
                    title="Resume preview"
                    className="h-[620px] w-full"
                  />
                </div>
              </div>
            </motion.div>
          ) : isCertificationsView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[2.8rem] font-extrabold leading-none tracking-tight text-slate-400 sm:text-[4rem]">
                  Certifications
                </h2>
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <img src={aiAvatar} alt="Ankit icon" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-[1.9rem] font-semibold tracking-tight text-slate-900 sm:text-[2.3rem]">
                    Certificate Tracks
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {certificationContent.types.map((item, index) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.46, delay: index * 0.11 }}
                        className="rounded-2xl bg-[#12151d] px-5 py-2 text-[1rem] font-medium text-slate-100 sm:text-[1.14rem]"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[1.9rem] font-semibold tracking-tight text-slate-900 sm:text-[2.3rem]">
                    Credentials
                  </h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {extracurricular.map((cert, index) => (
                      <motion.article
                        key={cert.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.14 }}
                        className="rounded-3xl border border-slate-300 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                          {cert.date}
                        </p>
                        <h4 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
                          {cert.title}
                        </h4>
                        <p className="mt-2 text-sm text-slate-600">
                          {cert.type}
                        </p>
                        <a
                          href={cert.credential}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex rounded-full bg-[#12151d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          View Credential
                        </a>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : isEducationView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[2.8rem] font-extrabold leading-none tracking-tight text-slate-400 sm:text-[4rem]">
                  Education
                </h2>
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <img src={aiAvatar} alt="Ankit icon" className="h-full w-full object-cover" />
                </div>
              </div>

              <p className="mt-5 text-[1.1rem] leading-relaxed text-slate-700 sm:text-[1.25rem]">
                Academic background and key coursework that shaped my engineering foundation.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {educationItems.map((item, index) => (
                  <motion.article
                    key={`${item.company_name}-${item.date}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="rounded-3xl border border-slate-300 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-2">
                        <img
                          src={item.icon}
                          alt={item.company_name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                          {item.date}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold leading-snug text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">{item.company_name}</p>
                      </div>
                    </div>
                    {item.points?.filter((point) => point && point.trim().length > 0).length > 0 && (
                      <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                        {item.points
                          .filter((point) => point && point.trim().length > 0)
                          .map((point, pointIndex) => (
                            <li key={`${item.title}-point-${pointIndex}`} className="flex gap-2">
                              <span className="text-sky-500">▹</span>
                              <span>{point}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ) : isExperienceView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-2 max-w-6xl text-left"
            >
              <ChildCloseButton onClick={() => setActiveTab(null)} />
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[2.8rem] font-extrabold leading-none tracking-tight text-slate-400 sm:text-[4rem]">
                  Work Experience
                </h2>
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <img src={aiAvatar} alt="Ankit icon" className="h-full w-full object-cover" />
                </div>
              </div>

              <p className="mt-5 text-[1.1rem] leading-relaxed text-slate-700 sm:text-[1.25rem]">
                Product delivery experience across frontend engineering, cloud infrastructure, and collaboration.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {experiences.map((role, index) => (
                  <motion.article
                    key={`${role.company_name}-${role.date}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="rounded-3xl border border-slate-300 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-2">
                        <img
                          src={role.icon}
                          alt={role.company_name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                          {role.date}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold leading-snug text-slate-900">
                          {role.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">{role.company_name}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                      {role.points.map((point, pointIndex) => (
                        <li key={`${role.title}-point-${pointIndex}`} className="flex gap-2">
                          <span className="text-sky-500">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ) : isMeView ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-2 max-w-5xl"
            >
              <div className="text-left">
                <ChildCloseButton onClick={() => setActiveTab(null)} />
              </div>
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                <img src={aiAvatar} alt="Ankit icon" className="h-full w-full object-cover" />
              </div>

              <div className="mt-8 grid items-start gap-8 text-left lg:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                  <img
                    src={profilePhoto}
                    alt="Ankit Chaudhary"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h2 className="text-[2.3rem] font-bold leading-tight text-slate-900 sm:text-[2.8rem]">
                    Ankit Chaudhary
                  </h2>
                  <p className="mt-2 text-lg text-slate-500 sm:text-2xl">
                    React Native Developer
                    <span className="mx-3 text-slate-300">•</span>
                    Full Stack Engineer
                  </p>
                  <p className="mt-5 text-[1.15rem] leading-relaxed text-slate-800 sm:text-[1.3rem]">
                    Hey 👋 I build performant mobile and web products with clean architecture, reusable components, and fast developer workflows.
                  </p>
                  <p className="mt-4 text-[1.1rem] leading-relaxed text-slate-700 sm:text-[1.22rem]">
                    I focus on React Native, React, TypeScript, Node.js, and cloud deployments that scale from MVP to production.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {["React Native", "React", "TypeScript", "Node.js", "AWS", "Three.js"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <AnimatedMainLogo />
                </div>
                <p className="mt-4 text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.3rem]">
                  Hey, I&apos;m Ankit
                  <span className="ml-2">👋</span>
                </p>
                <h1 className="mt-2 text-[2.8rem] font-black leading-[0.95] tracking-tight sm:text-[4.6rem]">
                  Software Engineer
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mx-auto mt-8 h-56 w-56 overflow-hidden rounded-full bg-white shadow-[0_25px_60px_rgba(15,23,42,0.12)] sm:h-64 sm:w-64"
              >
                <img
                  src={avatarSource}
                  alt="Ankit profile"
                  className="h-full w-full cursor-pointer object-cover"
                  loading="eager"
                  onClick={runAvatarAnimation}
                />
              </motion.div>
            </>
          )}
            </motion.div>
          </AnimatePresence>

          {!isAiPreviewView && !isAiFullChatView && (
            <>
              <form
                onSubmit={handleAskSubmit}
                className="mx-auto mt-10 flex w-full max-w-2xl items-center rounded-full border border-slate-300 bg-white px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
              >
                <input
                  type="text"
                  value={askInput}
                  onChange={(event) => setAskInput(event.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-transparent px-4 py-2 text-base text-slate-700 placeholder:text-slate-500 outline-none"
                  aria-label="Ask me anything"
                  autoComplete="off"
                  disabled={askAiLoading}
                />
                <button
                  type="submit"
                  disabled={!askInput.trim() || askAiLoading}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-xl text-white transition ${
                    askInput.trim() && !askAiLoading
                      ? "bg-[#6aa5ff] hover:bg-[#4f91f7]"
                      : "cursor-not-allowed bg-slate-300 text-slate-500"
                  }`}
                  aria-label="Submit question"
                >
                  ↑
                </button>
              </form>
              {(askAiLoading || askAiResponse || askAiError) && (
                <div className="mx-auto mt-4 w-full max-w-2xl rounded-[24px] border border-slate-300 bg-white p-4 text-left shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">
                      <img src={aiAvatar} alt="AI avatar" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Ask AI
                      </p>
                      {askAiQuestion && (
                        <p className="mt-1 text-sm text-slate-600">
                          <span className="font-semibold text-slate-800">You:</span> {askAiQuestion}
                        </p>
                      )}
                      <div
                        className={`mt-3 rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed whitespace-pre-line ${
                          askAiError
                            ? "bg-rose-50 text-rose-700"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {askAiLoading
                          ? "Thinking..."
                          : askAiError || askAiResponse}
                      </div>
                    </div>
                    <div className="ml-3 flex shrink-0 flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab(AI_CHAT_TAB_ID)}
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                      >
                        Chat
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (askAiLoading) return;
                          setAskAiQuestion("");
                          setAskAiResponse("");
                          setAskAiError("");
                        }}
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
                        aria-label="Dismiss AI response"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mx-auto mt-7 grid w-full max-w-[1240px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-8">
                {quickTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => triggerTabWithAi(tab.id)}
                    className={`flex h-[78px] flex-col items-center justify-center rounded-[18px] border bg-white px-3 py-2 transition ${
                      activeTab === tab.id || pendingTab === tab.id
                        ? "border-slate-400 shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                        : "border-slate-300/90 hover:border-slate-400"
                    }`}
                  >
                    <span className={tab.color}>
                      <tab.icon />
                    </span>
                    <span className="mt-1.5 text-[1.05rem] font-medium leading-none text-slate-700 sm:text-[1.15rem]">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

      </div>

      {!isMeView && !isExpandedView && (
        <p className="pointer-events-none absolute bottom-[-12px] left-1/2 -translate-x-1/2 select-none text-[5.2rem] font-black leading-none tracking-[0.065em] text-slate-300/20 sm:bottom-[-18px] sm:text-[10.8rem]">
          Chaudhary
        </p>
      )}
    </section>
  );
};

export default Hero;
