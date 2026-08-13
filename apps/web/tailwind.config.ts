import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // RFIL Core Brand Colors
        "rfil-blue": "#0F4C81",
        "rfil-gold": "#D4AF37",
        "rfil-green": "#10B981",

        primary: {
          50: "#f0f6fa",
          100: "#dceaf4",
          200: "#bcd8ea",
          300: "#8dc0dd",
          400: "#57a2cc",
          500: "#0F4C81",
          600: "#0c3e6b",
          700: "#0a3357",
          800: "#092b49",
          900: "#0c263e",
          950: "#071829",
          DEFAULT: "#0F4C81",
        },
        secondary: {
          50: "#fdfbe8",
          100: "#fcf4c5",
          200: "#fae78e",
          300: "#f6d451",
          400: "#f1be23",
          500: "#D4AF37",
          600: "#b58b27",
          700: "#916622",
          800: "#785122",
          900: "#664322",
          950: "#3b2310",
          DEFAULT: "#D4AF37",
        },
        accent: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
          DEFAULT: "#10B981",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F8FAFC",
          subtle: "#F1F5F9",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
        },
        border: {
          DEFAULT: "#E2E8F0",
          light: "#F1F5F9",
        },
      },
      fontFamily: {
        heading: ["Inter", "var(--font-heading)", "Mukta", "var(--font-devanagari)", "sans-serif"],
        body: ["Inter", "var(--font-body)", "Mukta", "var(--font-devanagari)", "sans-serif"],
        nepali: ["Mukta", "Khand", "var(--font-devanagari)", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(15 76 129 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(15 76 129 / 0.08), 0 1px 2px -1px rgb(15 76 129 / 0.06)",
        md: "0 4px 6px -1px rgb(15 76 129 / 0.08), 0 2px 4px -2px rgb(15 76 129 / 0.06)",
        lg: "0 10px 15px -3px rgb(15 76 129 / 0.08), 0 4px 6px -4px rgb(15 76 129 / 0.05)",
        xl: "0 20px 25px -5px rgb(15 76 129 / 0.09), 0 8px 10px -6px rgb(15 76 129 / 0.05)",
        brand: "0 8px 30px rgb(15 76 129 / 0.18)",
        gold: "0 8px 30px rgb(212 175 55 / 0.25)",
        glass: "0 8px 32px 0 rgba(15, 76, 129, 0.12), inset 0 0 0 1px rgba(255,255,255,0.15)",
      },
      borderRadius: {
        sm: "0.25rem", // 4px
        DEFAULT: "0.5rem", // 8px (RFIL brand standard)
        md: "0.5rem",
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        full: "9999px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "progress-bar": {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) both",
        shimmer: "shimmer 1.5s infinite",
        kenburns: "kenburns 10s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "progress-bar": "progress-bar linear forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
