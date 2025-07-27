import type { ReactNode } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextValue {
  theme: Theme | null;
  themeMode: ThemeMode;
  isLoading: boolean;
  error: string | null;
  setThemeMode: (mode: ThemeMode) => void;
  refreshTheme: () => Promise<void>;
}

// Re-export types from the main theme types file
export type { Theme, ThemeMode, ThemeContextType } from "@/types/theme";
