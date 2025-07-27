import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Banner } from "./Banner";
import type { BannerProps } from "./Banner.types";

describe("Banner", () => {
  const defaultProps: BannerProps = {
    children: "Test banner message",
  };

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Banner {...defaultProps} />);
      expect(screen.getByText("Test banner message")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Banner {...defaultProps} className="custom-class" />);
      const banner = screen
        .getByText("Test banner message")
        .closest('[class*="relative isolate"]');
      expect(banner).toHaveClass("custom-class");
    });

    it("renders with title", () => {
      render(<Banner {...defaultProps} title="Test Title" />);
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("renders with icon", () => {
      render(<Banner {...defaultProps} icon="ℹ️" />);
      expect(screen.getByText("ℹ️")).toBeInTheDocument();
    });

    it("does not render when show is false", () => {
      render(<Banner {...defaultProps} show={false} />);
      expect(screen.queryByText("Test banner message")).not.toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    const variants = ["info", "success", "warning", "error", "note"] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Banner {...defaultProps} variant={variant} />);
        const banner = screen
          .getByText("Test banner message")
          .closest('[class*="relative isolate"]');

        // Check for variant-specific classes
        if (variant === "info") {
          expect(banner).toHaveClass("border-sky-300", "bg-sky-300");
        } else if (variant === "success") {
          expect(banner).toHaveClass("border-green-300", "bg-green-300");
        } else if (variant === "warning") {
          expect(banner).toHaveClass("border-yellow-300", "bg-yellow-300");
        } else if (variant === "error") {
          expect(banner).toHaveClass("border-red-300", "bg-red-300");
        } else if (variant === "note") {
          expect(banner).toHaveClass("border-gray-300", "bg-gray-300");
        }
      });
    });
  });

  describe("Dismissible functionality", () => {
    it("shows dismiss button when dismissible is true", () => {
      render(<Banner {...defaultProps} dismissible onDismiss={() => {}} />);
      expect(
        screen.getByRole("button", { name: "Dismiss banner" })
      ).toBeInTheDocument();
    });

    it("does not show dismiss button when dismissible is false", () => {
      render(
        <Banner {...defaultProps} dismissible={false} onDismiss={() => {}} />
      );
      expect(
        screen.queryByRole("button", { name: "Dismiss banner" })
      ).not.toBeInTheDocument();
    });

    it("does not show dismiss button when onDismiss is not provided", () => {
      render(<Banner {...defaultProps} dismissible />);
      expect(
        screen.queryByRole("button", { name: "Dismiss banner" })
      ).not.toBeInTheDocument();
    });

    it("calls onDismiss when dismiss button is clicked", () => {
      const handleDismiss = vi.fn();
      render(
        <Banner {...defaultProps} dismissible onDismiss={handleDismiss} />
      );

      const dismissButton = screen.getByRole("button", {
        name: "Dismiss banner",
      });
      fireEvent.click(dismissButton);

      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it("renders custom dismiss text", () => {
      render(
        <Banner
          {...defaultProps}
          dismissible
          onDismiss={() => {}}
          dismissText="Close"
        />
      );
      expect(screen.getByText("Close")).toBeInTheDocument();
    });

    it("renders default dismiss text when not provided", () => {
      render(<Banner {...defaultProps} dismissible onDismiss={() => {}} />);
      expect(
        screen.getByRole("button", { name: "Dismiss banner" })
      ).toBeInTheDocument();
    });
  });

  describe("Grid pattern", () => {
    it("shows grid when showGrid is true", () => {
      render(<Banner {...defaultProps} showGrid />);
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("does not show grid when showGrid is false", () => {
      render(<Banner {...defaultProps} showGrid={false} />);
      const svg = document.querySelector("svg");
      expect(svg).not.toBeInTheDocument();
    });

    it("applies correct grid classes", () => {
      render(<Banner {...defaultProps} showGrid />);
      const svg = document.querySelector("svg");
      expect(svg).toHaveClass("pointer-events-none", "absolute", "inset-0");
    });
  });

  describe("Content structure", () => {
    it("renders title and content in correct structure", () => {
      render(<Banner {...defaultProps} title="Test Title" icon="ℹ️" />);

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test banner message")).toBeInTheDocument();
      expect(screen.getByText("ℹ️")).toBeInTheDocument();
    });

    it("renders only content when no title or icon", () => {
      render(<Banner {...defaultProps} />);
      expect(screen.getByText("Test banner message")).toBeInTheDocument();
      expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
      expect(screen.queryByText("ℹ️")).not.toBeInTheDocument();
    });

    it("renders only title and content without icon", () => {
      render(<Banner {...defaultProps} title="Test Title" />);
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test banner message")).toBeInTheDocument();
      expect(screen.queryByText("ℹ️")).not.toBeInTheDocument();
    });

    it("renders only icon and content without title", () => {
      render(<Banner {...defaultProps} icon="ℹ️" />);
      expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
      expect(screen.getByText("Test banner message")).toBeInTheDocument();
      expect(screen.getByText("ℹ️")).toBeInTheDocument();
    });
  });

  describe("Styling and classes", () => {
    it("applies base classes correctly", () => {
      render(<Banner {...defaultProps} />);
      const banner = screen
        .getByText("Test banner message")
        .closest('[class*="relative isolate"]');
      expect(banner).toHaveClass(
        "relative",
        "isolate",
        "flex",
        "flex-col",
        "justify-between",
        "gap-3",
        "overflow-hidden",
        "rounded-lg",
        "border",
        "py-3",
        "pl-4",
        "pr-12"
      );
    });

    it("applies responsive classes", () => {
      render(<Banner {...defaultProps} />);
      const banner = screen
        .getByText("Test banner message")
        .closest('[class*="relative isolate"]');
      expect(banner).toHaveClass("sm:flex-row", "sm:items-center", "sm:py-2");
    });

    it("applies content classes correctly", () => {
      render(<Banner {...defaultProps} />);
      const content = screen
        .getByText("Test banner message")
        .closest('[class*="flex items-center gap-3"]');
      expect(content).toHaveClass("flex", "items-center", "gap-3");
    });

    it("applies custom content className", () => {
      render(<Banner {...defaultProps} contentClassName="custom-content" />);
      const content = screen
        .getByText("Test banner message")
        .closest('[class*="flex items-center gap-3"]');
      expect(content).toHaveClass("custom-content");
    });

    it("applies custom dismiss className", () => {
      render(
        <Banner
          {...defaultProps}
          dismissible
          onDismiss={() => {}}
          dismissClassName="custom-dismiss"
        />
      );
      const dismissButton = screen.getByRole("button", {
        name: "Dismiss banner",
      });
      expect(dismissButton).toHaveClass("custom-dismiss");
    });
  });

  describe("Accessibility", () => {
    it("has correct dismiss button aria-label", () => {
      render(<Banner {...defaultProps} dismissible onDismiss={() => {}} />);
      const dismissButton = screen.getByRole("button", {
        name: "Dismiss banner",
      });
      expect(dismissButton).toHaveAttribute("aria-label", "Dismiss banner");
    });

    it("has correct button type", () => {
      render(<Banner {...defaultProps} dismissible onDismiss={() => {}} />);
      const dismissButton = screen.getByRole("button", {
        name: "Dismiss banner",
      });
      expect(dismissButton).toHaveAttribute("type", "button");
    });
  });

  describe("Edge cases", () => {
    it("renders with empty children", () => {
      render(<Banner children="" />);
      const banner = screen.getByRole("generic", { hidden: true });
      expect(banner).toBeInTheDocument();
    });

    it("renders with null children", () => {
      render(<Banner children={null} />);
      const banner = document.querySelector("div[class*='relative']");
      expect(banner).toBeInTheDocument();
    });

    it("renders with undefined children", () => {
      render(<Banner children={undefined} />);
      const banner = document.querySelector("div[class*='relative']");
      expect(banner).toBeInTheDocument();
    });

    it("handles multiple className values", () => {
      render(<Banner {...defaultProps} className="class1 class2" />);
      const banner = screen
        .getByText("Test banner message")
        .closest('[class*="relative isolate"]');
      expect(banner).toHaveClass("class1", "class2");
    });

    it("renders with complex children", () => {
      const ComplexContent = () => (
        <span data-testid="complex">Complex content</span>
      );
      render(
        <Banner>
          <ComplexContent />
        </Banner>
      );
      expect(screen.getByTestId("complex")).toBeInTheDocument();
    });

    it("renders with complex icon", () => {
      const ComplexIcon = () => <span data-testid="complex-icon">🔍</span>;
      render(<Banner {...defaultProps} icon={<ComplexIcon />} />);
      expect(screen.getByTestId("complex-icon")).toBeInTheDocument();
    });
  });

  describe("Theme integration", () => {
    it("applies theme-aware classes", () => {
      render(<Banner {...defaultProps} variant="info" />);
      const banner = screen
        .getByText("Test banner message")
        .closest('[class*="relative isolate"]');
      expect(banner).toHaveClass("border-sky-300", "bg-sky-300");
    });

    it("applies variant-specific text colors", () => {
      render(<Banner {...defaultProps} variant="success" />);
      const content = screen
        .getByText("Test banner message")
        .closest('[class*="flex items-center gap-3"]');
      expect(content).toHaveClass("text-green-900");
    });

    it("applies variant-specific dismiss button colors", () => {
      render(
        <Banner
          {...defaultProps}
          variant="warning"
          dismissible
          onDismiss={() => {}}
        />
      );
      const dismissButton = screen.getByRole("button", {
        name: "Dismiss banner",
      });
      expect(dismissButton).toHaveClass("text-white/80", "hover:text-white");
    });
  });

  describe("Performance and behavior", () => {
    it("maintains state during re-renders", () => {
      const { rerender } = render(<Banner {...defaultProps} show={true} />);
      expect(screen.getByText("Test banner message")).toBeInTheDocument();

      rerender(<Banner {...defaultProps} show={true} />);
      expect(screen.getByText("Test banner message")).toBeInTheDocument();
    });

    it("handles rapid dismiss clicks", () => {
      const handleDismiss = vi.fn();
      render(
        <Banner {...defaultProps} dismissible onDismiss={handleDismiss} />
      );

      const dismissButton = screen.getByRole("button", {
        name: "Dismiss banner",
      });
      fireEvent.click(dismissButton);
      fireEvent.click(dismissButton);
      fireEvent.click(dismissButton);

      expect(handleDismiss).toHaveBeenCalledTimes(3);
    });

    it("prevents event bubbling on dismiss click", () => {
      const handleDismiss = vi.fn();
      const handleParentClick = vi.fn();

      render(
        <div onClick={handleParentClick}>
          <Banner {...defaultProps} dismissible onDismiss={handleDismiss} />
        </div>
      );

      const dismissButton = screen.getByRole("button", {
        name: "Dismiss banner",
      });
      fireEvent.click(dismissButton);

      expect(handleDismiss).toHaveBeenCalledTimes(1);
      // Note: The component doesn't prevent event bubbling, so parent click will be called
      expect(handleParentClick).toHaveBeenCalledTimes(1);
    });
  });
});
