import type { Theme } from "@/types/theme";

type ThemeMode = "light" | "dark";

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  // Apply all color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });

  // Apply theme class for dark/light mode
  if (theme.isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function getSystemTheme(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredThemeMode(): ThemeMode {
  try {
    return (localStorage.getItem("theme-mode") as ThemeMode) || "dark";
  } catch {
    return "dark";
  }
}

export function setStoredThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem("theme-mode", mode);
  } catch (error) {
    console.error("Failed to store theme mode:", error);
  }
}
