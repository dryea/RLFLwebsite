"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Phone } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { localize } from "@/lib/localize";

interface ChatMsg {
  from: "bot" | "user";
  text: string;
}

const FAQ_INTENTS: { keywords: string[]; answer: string }[] = [
  { keywords: ["rate", "interest", "ब्याज", "दर"], answer: "Our interest rates start at 3.50% for fixed deposits and 2.75% for savings. Check the Rates page for the latest schedule." },
  { keywords: ["open account", "account", "खाता"], answer: "You can open an account online in minutes! Use the 'Open Account' button to start the process." },
  { keywords: ["loan", "ऋण"], answer: "We offer home, auto, business, education, and personal loans. Use the loan eligibility checker to see how much you can borrow." },
  { keywords: ["emi", "ईएमआई"], answer: "Use our EMI calculator to estimate your monthly instalments instantly." },
  { keywords: ["branch", "शाखा"], answer: "We have 21+ branches across Nepal. Use the Branches page to find the one nearest you." },
  { keywords: ["fd", "fixed deposit", "मुद्दती"], answer: "Our fixed deposits offer up to 6.25% p.a. with flexible tenures. See the Fixed Deposits page for details." },
  { keywords: ["contact", "सम्पर्क", "phone", "फोन"], answer: "You can reach us at +977-01-5361104 or info@reliancenepal.com.np. We're happy to help!" },
  { keywords: ["hours", "banking", "समय"], answer: "Our banking hours are Sunday to Friday (except holidays). See the Banking Hours page for details." },
  { keywords: ["remittance", "रेमिट्यान्स"], answer: "We partner with major remittance providers for fast, secure international transfers. See the Remittance service page." },
];

function botReply(input: string): string {
  const lower = input.toLowerCase();
  for (const intent of FAQ_INTENTS) {
    if (intent.keywords.some((k) => lower.includes(k))) {
      return intent.answer;
    }
  }
  return "I can help with rates, accounts, loans, EMI, branches, and more. For anything else, our team is ready to assist — please contact us directly.";
}

const QUICK_PROMPTS = ["Interest rates", "Open account", "Apply for loan", "Find branch"];

export default function ChatWidget({ lang }: { lang: string }) {
  const isNp = lang === "np";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { from: "bot", text: isNp ? "नमस्ते! म तपाईंलाई कसरी मद्दत गर्न सक्छु?" : "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((m) => [...m, { from: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: botReply(msg) }]);
      setTyping(false);
    }, 700);
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, delay: 1 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:bg-primary-700 hover:scale-105"
        aria-label={isNp ? "च्याट खोल्नुहोस्" : "Open chat"}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="fixed bottom-24 right-5 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            role="dialog"
            aria-label="Chat assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary-700 px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{isNp ? "RFL सहायक" : "RFL Assistant"}</p>
                  <p className="text-[10px] text-white/70">{isNp ? "अनलाइन" : "Online now"}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-white/20" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === "user" ? "rounded-br-sm bg-primary-600 text-white" : "rounded-bl-sm bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div className="flex gap-2 overflow-x-auto border-t border-gray-100 bg-white px-3 py-2">
              {QUICK_PROMPTS.map((q) => (
                <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-primary-200 px-3 py-1 text-xs text-primary-700 hover:bg-primary-50">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-gray-100 bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={isNp ? "सन्देश लेख्नुहोस्..." : "Type a message..."}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary-500"
              />
              <button onClick={() => send()} className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
