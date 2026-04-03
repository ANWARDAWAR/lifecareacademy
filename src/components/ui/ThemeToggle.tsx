"use client";

import { useCallback, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "themechange";

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

interface ThemeToggleProps {
  className?: string;
  ariaLabel?: string;
}

export default function ThemeToggle({
  className = "",
  ariaLabel = "Toggle dark mode"
}: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setTheme = useCallback((theme: Theme, persist: boolean) => {
    const dark = theme === "dark";
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";

    if (persist) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    setIsDark(dark);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme: Theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : getSystemTheme();

    setTheme(initialTheme, false);
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const onMediaThemeChange = (event: MediaQueryListEvent) => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return;
      }

      setTheme(event.matches ? "dark" : "light", false);
    };

    const onStorageChange = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      if (event.newValue === "dark" || event.newValue === "light") {
        setTheme(event.newValue, false);
        return;
      }

      setTheme(getSystemTheme(), false);
    };

    const onThemeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onMediaThemeChange);
    } else {
      mediaQuery.addListener(onMediaThemeChange);
    }

    window.addEventListener("storage", onStorageChange);
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", onMediaThemeChange);
      } else {
        mediaQuery.removeListener(onMediaThemeChange);
      }

      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
    };
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark", true);
  };

  return (
    <button
      type="button"
      className={`${className} relative`}
      aria-label={ariaLabel}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <FaMoon
        className={`moon-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          mounted && !isDark ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <FaSun
        className={`sun-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          mounted && isDark ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">
        {mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}
