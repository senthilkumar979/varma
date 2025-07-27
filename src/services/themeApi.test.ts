import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchTheme, fallbackDarkTheme, fallbackLightTheme } from "./themeApi";
import type { Theme } from "@/types/theme";

// Mock fetch globally
const mockFetch = vi.fn();

describe("themeApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("fetchTheme", () => {
    it("should fetch and return theme data successfully", async () => {
      const mockTheme: Theme = {
        id: "test-theme",
        name: "Test Theme",
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

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockTheme),
      };

      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchTheme();

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/api/theme");
      expect(mockResponse.json).toHaveBeenCalled();
      expect(result).toEqual(mockTheme);
    });

    it("should throw error when response is not ok", async () => {
      const mockResponse = {
        ok: false,
        status: 404,
      };

      mockFetch.mockResolvedValue(mockResponse);

      await expect(fetchTheme()).rejects.toThrow("HTTP error! status: 404");
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/api/theme");
    });

    it("should throw error when fetch fails", async () => {
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValue(networkError);

      await expect(fetchTheme()).rejects.toThrow("Network error");
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/api/theme");
    });

    it("should throw error when JSON parsing fails", async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
      };

      mockFetch.mockResolvedValue(mockResponse);

      await expect(fetchTheme()).rejects.toThrow("Invalid JSON");
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/api/theme");
    });

    it("should handle different HTTP error statuses", async () => {
      const errorStatuses = [400, 401, 403, 500, 502, 503];

      for (const status of errorStatuses) {
        vi.clearAllMocks();
        const mockResponse = {
          ok: false,
          status,
        };

        mockFetch.mockResolvedValue(mockResponse);

        await expect(fetchTheme()).rejects.toThrow(
          `HTTP error! status: ${status}`
        );
        expect(mockFetch).toHaveBeenCalledWith(
          "http://localhost:8080/api/theme"
        );
      }
    });

    it("should handle light theme from API", async () => {
      const mockLightTheme: Theme = {
        id: "api-light-theme",
        name: "API Light Theme",
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

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockLightTheme),
      };

      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchTheme();

      expect(result).toEqual(mockLightTheme);
      expect(result.isDark).toBe(false);
    });

    it("should handle custom theme with different color values", async () => {
      const mockCustomTheme: Theme = {
        id: "custom-theme",
        name: "Custom Theme",
        isDark: true,
        colors: {
          background: "240 10% 3.9%",
          foreground: "0 0% 98%",
          card: "240 10% 3.9%",
          cardForeground: "0 0% 98%",
          popover: "240 10% 3.9%",
          popoverForeground: "0 0% 98%",
          primary: "0 0% 98%",
          primaryForeground: "240 5.9% 10%",
          secondary: "240 3.7% 15.9%",
          secondaryForeground: "0 0% 98%",
          muted: "240 3.7% 15.9%",
          mutedForeground: "240 5% 64.9%",
          accent: "240 3.7% 15.9%",
          accentForeground: "0 0% 98%",
          destructive: "0 62.8% 30.6%",
          destructiveForeground: "0 0% 98%",
          border: "240 3.7% 15.9%",
          input: "240 3.7% 15.9%",
          ring: "240 4.9% 83.9%",
          radius: "0.5rem",
        },
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockCustomTheme),
      };

      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchTheme();

      expect(result).toEqual(mockCustomTheme);
      expect(result.id).toBe("custom-theme");
      expect(result.name).toBe("Custom Theme");
      expect(result.isDark).toBe(true);
    });
  });

  describe("fallbackDarkTheme", () => {
    it("should have correct structure and properties", () => {
      expect(fallbackDarkTheme).toHaveProperty("id");
      expect(fallbackDarkTheme).toHaveProperty("name");
      expect(fallbackDarkTheme).toHaveProperty("isDark");
      expect(fallbackDarkTheme).toHaveProperty("colors");

      expect(fallbackDarkTheme.id).toBe("fallback-dark");
      expect(fallbackDarkTheme.name).toBe("Fallback Dark");
      expect(fallbackDarkTheme.isDark).toBe(true);
    });

    it("should have all required color properties", () => {
      const requiredColors = [
        "background",
        "foreground",
        "card",
        "cardForeground",
        "popover",
        "popoverForeground",
        "primary",
        "primaryForeground",
        "secondary",
        "secondaryForeground",
        "muted",
        "mutedForeground",
        "accent",
        "accentForeground",
        "destructive",
        "destructiveForeground",
        "border",
        "input",
        "ring",
        "radius",
      ];

      requiredColors.forEach((color) => {
        expect(fallbackDarkTheme.colors).toHaveProperty(color);
        expect(
          typeof fallbackDarkTheme.colors[
            color as keyof typeof fallbackDarkTheme.colors
          ]
        ).toBe("string");
      });
    });

    it("should have dark theme color values", () => {
      expect(fallbackDarkTheme.colors.background).toBe("222.2 84% 4.9%");
      expect(fallbackDarkTheme.colors.foreground).toBe("210 40% 98%");
      expect(fallbackDarkTheme.colors.primary).toBe("210 40% 98%");
      expect(fallbackDarkTheme.colors.primaryForeground).toBe(
        "222.2 47.4% 11.2%"
      );
    });

    it("should be a valid Theme object", () => {
      // TypeScript will catch structural issues, but we can test runtime properties
      expect(typeof fallbackDarkTheme.id).toBe("string");
      expect(typeof fallbackDarkTheme.name).toBe("string");
      expect(typeof fallbackDarkTheme.isDark).toBe("boolean");
      expect(typeof fallbackDarkTheme.colors).toBe("object");
    });
  });

  describe("fallbackLightTheme", () => {
    it("should have correct structure and properties", () => {
      expect(fallbackLightTheme).toHaveProperty("id");
      expect(fallbackLightTheme).toHaveProperty("name");
      expect(fallbackLightTheme).toHaveProperty("isDark");
      expect(fallbackLightTheme).toHaveProperty("colors");

      expect(fallbackLightTheme.id).toBe("fallback-light");
      expect(fallbackLightTheme.name).toBe("Fallback Light");
      expect(fallbackLightTheme.isDark).toBe(false);
    });

    it("should have all required color properties", () => {
      const requiredColors = [
        "background",
        "foreground",
        "card",
        "cardForeground",
        "popover",
        "popoverForeground",
        "primary",
        "primaryForeground",
        "secondary",
        "secondaryForeground",
        "muted",
        "mutedForeground",
        "accent",
        "accentForeground",
        "destructive",
        "destructiveForeground",
        "border",
        "input",
        "ring",
        "radius",
      ];

      requiredColors.forEach((color) => {
        expect(fallbackLightTheme.colors).toHaveProperty(color);
        expect(
          typeof fallbackLightTheme.colors[
            color as keyof typeof fallbackLightTheme.colors
          ]
        ).toBe("string");
      });
    });

    it("should have light theme color values", () => {
      expect(fallbackLightTheme.colors.background).toBe("0 0% 100%");
      expect(fallbackLightTheme.colors.foreground).toBe("222.2 84% 4.9%");
      expect(fallbackLightTheme.colors.primary).toBe("222.2 47.4% 11.2%");
      expect(fallbackLightTheme.colors.primaryForeground).toBe("210 40% 98%");
    });

    it("should be a valid Theme object", () => {
      // TypeScript will catch structural issues, but we can test runtime properties
      expect(typeof fallbackLightTheme.id).toBe("string");
      expect(typeof fallbackLightTheme.name).toBe("string");
      expect(typeof fallbackLightTheme.isDark).toBe("boolean");
      expect(typeof fallbackLightTheme.colors).toBe("object");
    });
  });

  describe("Integration tests", () => {
    it("should handle complete API workflow", async () => {
      const mockTheme: Theme = {
        id: "integration-theme",
        name: "Integration Theme",
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

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockTheme),
      };

      mockFetch.mockResolvedValue(mockResponse);

      // Test successful API call
      const apiTheme = await fetchTheme();
      expect(apiTheme).toEqual(mockTheme);

      // Test fallback themes are available
      expect(fallbackDarkTheme.isDark).toBe(true);
      expect(fallbackLightTheme.isDark).toBe(false);

      // Test that fallback themes have different color schemes
      expect(fallbackDarkTheme.colors.background).not.toBe(
        fallbackLightTheme.colors.background
      );
      expect(fallbackDarkTheme.colors.foreground).not.toBe(
        fallbackLightTheme.colors.foreground
      );
    });

    it("should handle API failure and fallback usage", async () => {
      // Mock API failure
      const mockResponse = {
        ok: false,
        status: 500,
      };

      mockFetch.mockResolvedValue(mockResponse);

      // Test that API call throws error
      await expect(fetchTheme()).rejects.toThrow("HTTP error! status: 500");

      // Test that fallback themes are still available
      expect(fallbackDarkTheme).toBeDefined();
      expect(fallbackLightTheme).toBeDefined();
      expect(fallbackDarkTheme.isDark).toBe(true);
      expect(fallbackLightTheme.isDark).toBe(false);
    });

    it("should validate theme structure consistency", () => {
      // Test that both fallback themes have the same structure
      const darkThemeKeys = Object.keys(fallbackDarkTheme);
      const lightThemeKeys = Object.keys(fallbackLightTheme);

      expect(darkThemeKeys).toEqual(lightThemeKeys);

      // Test that both themes have the same color properties
      const darkColorKeys = Object.keys(fallbackDarkTheme.colors);
      const lightColorKeys = Object.keys(fallbackLightTheme.colors);

      expect(darkColorKeys).toEqual(lightColorKeys);

      // Test that all color values are strings
      [...darkColorKeys, ...lightColorKeys].forEach((key) => {
        expect(
          typeof fallbackDarkTheme.colors[
            key as keyof typeof fallbackDarkTheme.colors
          ]
        ).toBe("string");
        expect(
          typeof fallbackLightTheme.colors[
            key as keyof typeof fallbackLightTheme.colors
          ]
        ).toBe("string");
      });
    });
  });
});
