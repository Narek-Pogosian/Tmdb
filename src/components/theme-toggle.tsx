"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      className="rounded p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
      onClick={toggleTheme}
    >
      <Moon className="size-5 dark:hidden" />
      <Sun className="hidden size-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default ThemeToggle;
