import type { Theme } from "@/types/theme";

// Mock API endpoint - replace with your actual API
const THEME_API_URL = "http://localhost:8080/api/theme";

export async function fetchTheme(): Promise<Theme> {
  const response = await fetch(THEME_API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const theme = await response.json();
  return theme;
}

// Fallback dark theme
export const fallbackDarkTheme: Theme = {
  id: "fallback-dark",
  name: "Fallback Dark",
  isDark: true,
  colors: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    cardForeground: "210 40% 98%",
    popover: "222.2 84% 4.9%",
    popoverForeground: "210 40% 98%",
    primary: "210 40% 98%",
    primaryForeground: "222.2 47.4% 11.2%",
    secondary: "217.2 32.6% 17.5%",
    secondaryForeground: "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    mutedForeground: "215 20.2% 65.1%",
    accent: "217.2 32.6% 17.5%",
    accentForeground: "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "210 40% 98%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "212.7 26.8% 83.9%",
    radius: "0.5rem",
  },
};

// Fallback light theme
export const fallbackLightTheme: Theme = {
  id: "fallback-light",
  name: "Fallback Light",
  isDark: false,
  colors: {
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    card: "0 0% 100%",
    cardForeground: "222.2 84% 4.9%",
    popover: "0 0% 100%",
    popoverForeground: "222.2 84% 4.9%",
    primary: "222.2 47.4% 11.2%",
    primaryForeground: "210 40% 98%",
    secondary: "210 40% 96%",
    secondaryForeground: "222.2 47.4% 11.2%",
    muted: "210 40% 96%",
    mutedForeground: "215.4 16.3% 46.9%",
    accent: "210 40% 96%",
    accentForeground: "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 40% 98%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "222.2 84% 4.9%",
    radius: "0.5rem",
  },
};
