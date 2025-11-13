import React, { useEffect, useRef, useState } from "react";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const systemPrompt = `
You are Open Intelligence, Ankit Chaudhary's embedded copilot inside his React + Three.js portfolio.

Operating principles:
1. Anchor every response to Ankit's proven strengths: React, React Native/Expo & CLI, React Three Fiber/Three.js, DevOps through AWS Lambda/ECS/CloudFront, observability with Datadog/Vercel SI, and the workflows showcased here. Never claim skills he hasn't highlighted (e.g., no Kubernetes).
2. Pull from broader technical/product knowledge to be genuinely helpful, then connect the insight back to how Ankit would build, ship, or collaborate. If a topic is beyond his experience, say so and outline a realistic next step or learning path.
3. Keep replies punchy (≤4 sentences), optimistic, and action-oriented. Offer concrete next steps, relevant site sections, or credible links when useful.
4. When the conversation leans toward real work, invite the visitor to reach out via the contact section or LinkedIn.
5. Be transparent about limitations (no private data, credentials, or pricing). Encourage experimenting with or exploring the showcased projects when relevant.
`;

const buildPayload = (messages) =>
  messages.map((message, index) => {
    if (index === 0 && message.role === "system") {
      return {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\n${message.text}` }],
      };
    }

    return {
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.text }],
    };
  });

const fetchGeminiResponse = async (apiKey, messages) => {
  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: buildPayload(messages) }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || "Unable to reach the AI service.");
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("\n")
      .trim() || "The AI assistant returned an empty response.";

  return text;
};

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "system",
      role: "system",
      text: "AI assistant ready.",
    },
    {
      id: "greet",
      role: "assistant",
      text: "Hey, I’m Open Intelligence—Ankit’s on-site copilot. Ask me about his stack, experiments, or even broader build questions and I’ll tie it back to how he ships.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput("");
    setError("");

    const userMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          text: "AI key missing. Add VITE_GEMINI_API_KEY to your .env to enable assistant responses.",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const conversation = [
        ...messages.filter((msg) => msg.role !== "system"),
        userMessage,
      ];

      const assistantText = await fetchGeminiResponse(apiKey, [
        { id: "sys", role: "system", text: systemPrompt },
        ...conversation,
      ]);

      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          text: assistantText,
        },
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          text: "I hit an error reaching the AI service. Mind trying again in a bit?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-white shadow-2xl sm:w-96">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
                AI Assistant
              </p>
              <p className="text-base font-semibold">Ankit&apos;s Assistant</p>
            </div>
            <button
              type="button"
              aria-label="Close assistant"
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-300 hover:border-white/40"
              onClick={handleToggle}
            >
              Close
            </button>
          </div>
          <div
            ref={scrollRef}
            className="max-h-64 space-y-3 overflow-y-auto pr-1 text-slate-200"
          >
            {messages
              .filter((msg) => msg.role !== "system")
              .map((message) => (
                <div
                  key={message.id}
                  className={`rounded-2xl px-3 py-2 ${
                    message.role === "assistant"
                      ? "bg-white/10"
                      : "bg-sky-500/20 text-sky-100"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            {loading && (
              <div className="rounded-2xl bg-white/5 px-3 py-2 text-slate-400">
                Thinking…
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-xs text-amber-300">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about stack, devops, RN..."
              className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-xs font-semibold shadow-lg shadow-sky-500/20 disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <span role="img" aria-label="spark">
          ✨
        </span>
        {isOpen ? "Hide AI" : "Ask AI"}
      </button>
    </>
  );
};

export default Assistant;
