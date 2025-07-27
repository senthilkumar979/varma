import type { Theme } from "@/types/theme";

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

export function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredThemeMode(): "light" | "dark" | "system" {
  try {
    return (
      (localStorage.getItem("theme-mode") as "light" | "dark" | "system") ||
      "system"
    );
  } catch {
    return "system";
  }
}

export function setStoredThemeMode(mode: "light" | "dark" | "system"): void {
  try {
    localStorage.setItem("theme-mode", mode);
  } catch (error) {
    console.error("Failed to store theme mode:", error);
  }
}
