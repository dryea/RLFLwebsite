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
        heading: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        full: "9999px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
