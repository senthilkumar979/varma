import {
  fallbackDarkTheme,
  fallbackLightTheme,
  fetchTheme,
} from "@/services/themeApi";
import type { Theme, ThemeContextType, ThemeMode } from "@/types/theme";
import {
  applyTheme,
  getStoredThemeMode,
  setStoredThemeMode,
} from "@/utils/themeUtils";
import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext.context";
import type { ThemeProviderProps } from "./ThemeContext.types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [themeModeState, setThemeModeState] = useState<ThemeMode>(
    getStoredThemeMode()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFallbackTheme = (mode: "light" | "dark") => {
    const fallbackTheme =
      mode === "dark" ? fallbackDarkTheme : fallbackLightTheme;
    setTheme(fallbackTheme);
    applyTheme(fallbackTheme);
  };

  const loadThemeFromAPI = async () => {
    try {
      const apiTheme = await fetchTheme();
      setTheme(apiTheme);
      applyTheme(apiTheme);
    } catch (err) {
      console.error("Failed to load theme from API:", err);
      setError("Failed to load theme from API");
      // Always default to dark theme when API fails
      const fallbackTheme = fallbackDarkTheme;
      setTheme(fallbackTheme);
      applyTheme(fallbackTheme);
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    setStoredThemeMode(mode);
    loadFallbackTheme(mode);
  };

  const refreshTheme = async () => {
    setIsLoading(true);
    setError(null);
    await loadThemeFromAPI();
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeTheme = async () => {
      // Immediately load dark theme to prevent flash
      loadFallbackTheme("dark");
      setIsLoading(true);
      await loadThemeFromAPI();
      setIsLoading(false);
    };
    initializeTheme();
  }, []);

  const value: ThemeContextType = {
    theme,
    themeMode: themeModeState,
    isLoading,
    error,
    setThemeMode,
    refreshTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
