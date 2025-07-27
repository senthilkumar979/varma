import React from "react";
import { useTheme } from "@/contexts/useTheme";
import { Button } from "@/ui/atoms/Button";

export function ThemeToggle() {
  const { themeMode, setThemeMode, isLoading, error, refreshTheme } =
    useTheme();

  const handleThemeChange = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Theme Controls</h3>

      <div className="flex gap-2">
        <Button
          variant={themeMode === "light" ? "default" : "outline"}
          size="sm"
          onClick={() => handleThemeChange("light")}
          disabled={isLoading}
        >
          Light
        </Button>
        <Button
          variant={themeMode === "dark" ? "default" : "outline"}
          size="sm"
          onClick={() => handleThemeChange("dark")}
          disabled={isLoading}
        >
          Dark
        </Button>
        <Button
          variant={themeMode === "system" ? "default" : "outline"}
          size="sm"
          onClick={() => handleThemeChange("system")}
          disabled={isLoading}
        >
          System
        </Button>
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={refreshTheme}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Refresh Theme from API"}
      </Button>

      {error && <div className="text-sm text-destructive">Error: {error}</div>}

      {isLoading && (
        <div className="text-sm text-muted-foreground">Loading theme...</div>
      )}

      <div className="text-xs text-muted-foreground">
        Current mode: {themeMode}
      </div>
    </div>
  );
}
