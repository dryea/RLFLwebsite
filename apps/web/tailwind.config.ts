import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5ebf7",
          100: "#e8d1ef",
          200: "#d4a8df",
          300: "#b97ac9",
          400: "#9e51b0",
          500: "#702B86",
          600: "#5a226b",
          700: "#4a1a58",
          800: "#3a1345",
          900: "#2a0d33",
          DEFAULT: "#702B86",
        },
        secondary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#F2A900",
          600: "#d99600",
          700: "#b87a00",
          800: "#976400",
          900: "#7a5000",
          DEFAULT: "#F2A900",
        },
        accent: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#FAFAFB",
        },
        text: {
          primary: "#1F2937",
          secondary: "#4B5563",
          muted: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          light: "#F3F4F6",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "var(--font-devanagari)", "sans-serif"],
        body: ["var(--font-body)", "var(--font-devanagari)", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.09), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
        "brand": "0 8px 30px rgb(112 43 134 / 0.18)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
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
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) both",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
