import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock CSS modules
vi.mock("*.css", () => ({}));

// Mock SVG imports
vi.mock("*.svg", () => ({
  default: "svg-mock",
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

// Mock document.documentElement.style.setProperty
Object.defineProperty(document.documentElement, "style", {
  value: {
    setProperty: vi.fn(),
  },
  writable: true,
});

// Mock classList methods
Object.defineProperty(document.documentElement, "classList", {
  value: {
    add: vi.fn(),
    remove: vi.fn(),
    contains: vi.fn(),
  },
  writable: true,
});

// Setup global test utilities
global.console = {
  ...console,
  // Uncomment to suppress console.log during tests
  // log: vi.fn(),
  // warn: vi.fn(),
  // error: vi.fn(),
};
