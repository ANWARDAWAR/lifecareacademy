import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./forms/**/*.{html,js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b7d6ff",
          300: "#83bbff",
          400: "#4e97f8",
          500: "#2f7ce9",
          600: "#1f63cb",
          700: "#1d50a4",
          800: "#1e447f",
          900: "#1e3c6b"
        }
      },
      fontFamily: {
        sans: ["'Google Sans'", "system-ui", "sans-serif"],
        serif: ["var(--font-oswald)", "Oswald", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 20px 50px -18px rgba(31, 99, 203, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
