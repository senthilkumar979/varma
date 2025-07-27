export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  isDark: boolean;
}

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme | null;
  themeMode: ThemeMode;
  isLoading: boolean;
  error: string | null;
  setThemeMode: (mode: ThemeMode) => void;
  refreshTheme: () => Promise<void>;
}
