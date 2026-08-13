"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Phone, ShieldCheck } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { localize } from "@/lib/localize";

interface ChatMsg {
  from: "bot" | "user";
  text: string;
}

const FAQ_INTENTS: { keywords: string[]; answer: string }[] = [
  { keywords: ["rate", "interest", "ब्याज", "दर"], answer: "Our interest rates start at 6.25% p.a. for Fixed Deposits and up to 5.75% for Savings accounts. Check the Interest Rates page for the full schedule." },
  { keywords: ["open account", "account", "खाता"], answer: "You can open an account online in minutes! Use the 'Open Account' button in the navigation header to begin your application." },
  { keywords: ["loan", "ऋण", "कर्जा"], answer: "We offer Home Loans, Auto Loans, Business/SME Loans, and Personal Loans. Check the Loan Enquiry page or EMI Calculator." },
  { keywords: ["emi", "ईएमआई"], answer: "Use our interactive EMI calculator to estimate your monthly instalments and view your complete amortization schedule." },
  { keywords: ["branch", "शाखा"], answer: "We have 21+ branches across Nepal including Kathmandu, Butwal, Pokhara, and Kohalpur. Visit our Branch Locator page to find one near you." },
  { keywords: ["fd", "fixed deposit", "मुद्दती"], answer: "Our Fixed Deposits offer up to 6.25% p.a. with flexible tenure options. Visit our Fixed Deposits product page for details." },
  { keywords: ["remittance", "रेमिट्यान्स"], answer: "We partner with global remittance network providers for fast, instant account deposits or branch payouts across Nepal." },
  { keywords: ["contact", "सम्पर्क", "phone", "फोन"], answer: "You can reach our central head office at +977-01-5361104 or email info@reliancenepal.com.np. Toll-Free: 1810-5000-417." },
];

function botReply(input: string): string {
  const lower = input.toLowerCase();
  for (const intent of FAQ_INTENTS) {
    if (intent.keywords.some((k) => lower.includes(k))) {
      return intent.answer;
    }
  }
  return "I can help with interest rates, digital banking, loan applications, fixed deposits, and branch locations. How else can I assist you?";
}

const QUICK_PROMPTS = ["Interest rates", "Open account", "Apply for loan", "Find branch"];

export default function ChatWidget({ lang }: { lang: string }) {
  const isNp = lang === "np";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { from: "bot", text: isNp ? "नमस्ते! म रिलायन्स फाइनान्स स्मार्ट सहायक हुँ। म तपाईंलाई कसरी मद्दत गर्न सक्छु?" : "Hello! Welcome to Reliance Finance. How can I assist your banking needs today?" },
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
    }, 600);
  }

  return (
    <>
      {/* Floating Widget Trigger */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, delay: 0.8 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-brand shadow-primary-900/30 transition-all hover:bg-primary-700 hover:scale-105 active:scale-95"
        aria-label={isNp ? "च्याट खोल्नुहोस्" : "Open chat assistant"}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="fixed bottom-24 right-5 z-50 flex h-[500px] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            role="dialog"
            aria-label="Chat assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 px-4 py-3.5 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-secondary-400 border border-white/20">
                  <Bot className="h-5 w-5" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-primary-950" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold">{isNp ? "RFL डिजिटल सहायक" : "RFL Smart Assistant"}</p>
                  <p className="text-[10px] text-slate-300 font-medium">{isNp ? "अनलाइन | नेपाल राष्ट्र बैंक नियन्त्रित" : "Online | NRB Class C Licensed"}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-1 text-slate-300 transition-colors hover:bg-white/15 hover:text-white" aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-xs bg-primary-600 text-white font-medium shadow-sm"
                        : "rounded-bl-xs bg-white text-slate-800 border border-slate-200/80 shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-xs bg-white px-4 py-3 border border-slate-200/80 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white px-3 py-2">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-primary-200 bg-primary-50/50 px-3 py-1 text-[11px] font-bold text-primary-700 transition-colors hover:bg-primary-100"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 border-t border-slate-200/80 bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={isNp ? "सन्देश लेख्नुहोस्..." : "Ask a question..."}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-primary-500 focus:bg-white"
              />
              <button
                onClick={() => send()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-500 text-slate-950 font-bold shadow-sm transition-all hover:bg-secondary-400 active:scale-95"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
