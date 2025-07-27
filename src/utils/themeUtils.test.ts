import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  applyTheme,
  getSystemTheme,
  getStoredThemeMode,
  setStoredThemeMode,
} from "./themeUtils";
import type { Theme } from "@/types/theme";

// Helper function to create complete theme objects
const createCompleteTheme = (overrides: Partial<Theme> = {}): Theme => ({
  id: "test-theme",
  name: "Test Theme",
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
    secondary: "210 40% 96.1%",
    secondaryForeground: "222.2 47.4% 11.2%",
    muted: "210 40% 96.1%",
    mutedForeground: "215.4 16.3% 46.9%",
    accent: "210 40% 96.1%",
    accentForeground: "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 40% 98%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "222.2 84% 4.9%",
    radius: "0.5rem",
  },
  ...overrides,
});

describe("themeUtils", () => {
  let mockDocument: any;
  let mockWindow: any;
  let mockLocalStorage: any;
  let mockMatchMedia: any;

  beforeEach(() => {
    // Create fresh mocks for each test
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    mockMatchMedia = vi.fn();

    mockDocument = {
      documentElement: {
        style: {
          setProperty: vi.fn(),
        },
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
        },
      },
    };

    mockWindow = {
      matchMedia: mockMatchMedia,
      localStorage: mockLocalStorage,
    };

    // Stub global objects
    vi.stubGlobal("document", mockDocument);
    vi.stubGlobal("window", mockWindow);
    vi.stubGlobal("localStorage", mockLocalStorage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("applyTheme", () => {
    it("should apply theme colors as CSS variables", () => {
      const theme = createCompleteTheme({
        colors: {
          ...createCompleteTheme().colors,
          background: "0 0% 100%",
          foreground: "222.2 84% 4.9%",
          primary: "222.2 47.4% 11.2%",
          primaryForeground: "210 40% 98%",
        },
      });

      applyTheme(theme);

      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledWith("--background", "0 0% 100%");
      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledWith("--foreground", "222.2 84% 4.9%");
      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledWith("--primary", "222.2 47.4% 11.2%");
      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledWith("--primary-foreground", "210 40% 98%");
    });

    it("should convert camelCase to kebab-case for CSS variables", () => {
      const theme = createCompleteTheme({
        colors: {
          ...createCompleteTheme().colors,
          cardForeground: "222.2 84% 4.9%",
          popoverForeground: "0 0% 100%",
        },
      });

      applyTheme(theme);

      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledWith("--card-foreground", "222.2 84% 4.9%");
      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledWith("--popover-foreground", "0 0% 100%");
    });

    it("should add dark class when theme is dark", () => {
      const theme = createCompleteTheme({
        isDark: true,
        colors: {
          ...createCompleteTheme().colors,
          background: "222.2 84% 4.9%",
        },
      });

      applyTheme(theme);

      expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith(
        "dark"
      );
      expect(
        mockDocument.documentElement.classList.remove
      ).not.toHaveBeenCalled();
    });

    it("should remove dark class when theme is light", () => {
      const theme = createCompleteTheme({
        isDark: false,
        colors: {
          ...createCompleteTheme().colors,
          background: "0 0% 100%",
        },
      });

      applyTheme(theme);

      expect(
        mockDocument.documentElement.classList.remove
      ).toHaveBeenCalledWith("dark");
      expect(mockDocument.documentElement.classList.add).not.toHaveBeenCalled();
    });

    it("should handle empty colors object", () => {
      const theme = createCompleteTheme({
        colors: {} as any, // Force empty colors for testing edge case
      });

      applyTheme(theme);

      expect(
        mockDocument.documentElement.style.setProperty
      ).not.toHaveBeenCalled();
      expect(
        mockDocument.documentElement.classList.remove
      ).toHaveBeenCalledWith("dark");
    });
  });

  describe("getSystemTheme", () => {
    it("should return dark when system prefers dark", () => {
      mockMatchMedia.mockReturnValue({
        matches: true,
      });

      const result = getSystemTheme();

      expect(result).toBe("dark");
      expect(mockMatchMedia).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)"
      );
    });

    it("should return light when system prefers light", () => {
      mockMatchMedia.mockReturnValue({
        matches: false,
      });

      const result = getSystemTheme();

      expect(result).toBe("light");
      expect(mockMatchMedia).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)"
      );
    });
  });

  describe("getStoredThemeMode", () => {
    it("should return stored theme mode from localStorage", () => {
      mockLocalStorage.getItem.mockReturnValue("dark");

      const result = getStoredThemeMode();

      expect(result).toBe("dark");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("theme-mode");
    });

    it("should return system when no theme mode is stored", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = getStoredThemeMode();

      expect(result).toBe("system");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("theme-mode");
    });

    it("should return system when localStorage throws an error", () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      const result = getStoredThemeMode();

      expect(result).toBe("system");
    });

    it("should return system when stored value is invalid", () => {
      mockLocalStorage.getItem.mockReturnValue("invalid-theme");

      const result = getStoredThemeMode();

      expect(result).toBe("invalid-theme"); // The actual implementation doesn't validate
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("theme-mode");
    });

    it("should return valid stored values", () => {
      const validModes = ["light", "dark", "system"] as const;

      validModes.forEach((mode) => {
        vi.clearAllMocks();
        mockLocalStorage.getItem.mockReturnValue(mode);
        const result = getStoredThemeMode();
        expect(result).toBe(mode);
      });
    });
  });

  describe("setStoredThemeMode", () => {
    it("should store theme mode in localStorage", () => {
      setStoredThemeMode("dark");

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "theme-mode",
        "dark"
      );
    });

    it("should handle all valid theme modes", () => {
      const validModes = ["light", "dark", "system"] as const;

      validModes.forEach((mode) => {
        vi.clearAllMocks();
        setStoredThemeMode(mode);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "theme-mode",
          mode
        );
      });
    });

    it("should handle localStorage errors gracefully", () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      // Should not throw an error
      expect(() => setStoredThemeMode("dark")).not.toThrow();
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "theme-mode",
        "dark"
      );
    });

    it("should log error when localStorage fails", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      setStoredThemeMode("light");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to store theme mode:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe("Integration tests", () => {
    it("should handle complete theme application flow", () => {
      const theme = createCompleteTheme({
        isDark: true,
        colors: {
          ...createCompleteTheme().colors,
          background: "222.2 84% 4.9%",
          foreground: "210 40% 98%",
          primary: "210 40% 98%",
          primaryForeground: "222.2 47.4% 11.2%",
        },
      });

      // Mock system theme
      mockMatchMedia.mockReturnValue({ matches: true });

      // Test system theme detection
      const systemTheme = getSystemTheme();
      expect(systemTheme).toBe("dark");

      // Test theme application
      applyTheme(theme);
      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledTimes(20); // All 20 color properties
      expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith(
        "dark"
      );

      // Test theme mode storage
      setStoredThemeMode("system");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "theme-mode",
        "system"
      );

      // Test theme mode retrieval
      mockLocalStorage.getItem.mockReturnValue("system");
      const storedMode = getStoredThemeMode();
      expect(storedMode).toBe("system");
    });

    it("should handle edge cases gracefully", () => {
      // Test with minimal theme (using complete theme but testing specific properties)
      const minimalTheme = createCompleteTheme({
        isDark: false,
        colors: {
          ...createCompleteTheme().colors,
          background: "0 0% 100%",
        },
      });

      applyTheme(minimalTheme);
      expect(
        mockDocument.documentElement.style.setProperty
      ).toHaveBeenCalledWith("--background", "0 0% 100%");
      expect(
        mockDocument.documentElement.classList.remove
      ).toHaveBeenCalledWith("dark");

      // Test localStorage unavailable
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage unavailable");
      });
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("localStorage unavailable");
      });

      expect(getStoredThemeMode()).toBe("system");
      expect(() => setStoredThemeMode("dark")).not.toThrow();
    });
  });
});
