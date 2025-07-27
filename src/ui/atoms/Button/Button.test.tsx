import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button.types";

// Mock Radix UI Slot component
vi.mock("@radix-ui/react-slot", () => ({
  Slot: ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: unknown;
  }) => {
    return (
      <div data-testid="slot" {...props}>
        {children}
      </div>
    );
  },
}));

describe("Button", () => {
  const defaultProps: ButtonProps = {
    children: "Test Button",
  };

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole("button", { name: "Test Button" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("data-slot", "button");
    });

    it("renders with custom className", () => {
      render(<Button {...defaultProps} className="custom-class" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("renders with all HTML button attributes", () => {
      render(
        <Button
          {...defaultProps}
          id="test-id"
          disabled
          aria-label="Custom label"
          data-testid="custom-button"
        />
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "test-id");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-label", "Custom label");
      expect(button).toHaveAttribute("data-testid", "custom-button");
    });
  });

  describe("Variants", () => {
    const variants = [
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
    ] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button {...defaultProps} variant={variant} />);
        const button = screen.getByRole("button");

        // Check for variant-specific classes
        if (variant === "default") {
          expect(button).toHaveClass("bg-primary");
        } else if (variant === "destructive") {
          expect(button).toHaveClass("bg-destructive");
        } else if (variant === "outline") {
          expect(button).toHaveClass("border");
        } else if (variant === "secondary") {
          expect(button).toHaveClass("bg-secondary");
        } else if (variant === "ghost") {
          expect(button).toHaveClass("hover:bg-accent");
        } else if (variant === "link") {
          expect(button).toHaveClass("text-primary");
        }
      });
    });
  });

  describe("Sizes", () => {
    const sizes = ["default", "sm", "lg", "icon"] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size correctly`, () => {
        render(<Button {...defaultProps} size={size} />);
        const button = screen.getByRole("button");

        if (size === "icon") {
          expect(button).toHaveClass("size-9");
        } else if (size === "sm") {
          expect(button).toHaveClass("h-8");
        } else if (size === "lg") {
          expect(button).toHaveClass("h-10");
        } else {
          expect(button).toHaveClass("h-9");
        }
      });
    });
  });

  describe("States", () => {
    it("renders disabled state correctly", () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        "disabled:pointer-events-none",
        "disabled:opacity-50"
      );
    });

    it("renders aria-invalid state correctly", () => {
      render(<Button {...defaultProps} aria-invalid="true" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-invalid", "true");
      expect(button).toHaveClass("aria-invalid:ring-destructive/20");
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<Button {...defaultProps} onClick={handleClick} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(<Button {...defaultProps} onClick={handleClick} disabled />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("asChild prop", () => {
    it("renders as Slot when asChild is true", () => {
      render(<Button {...defaultProps} asChild />);
      const slot = screen.getByTestId("slot");
      expect(slot).toBeInTheDocument();
      expect(slot).toHaveAttribute("data-slot", "button");
    });

    it("renders as button when asChild is false", () => {
      render(<Button {...defaultProps} asChild={false} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  describe("Focus and Accessibility", () => {
    it("supports focus management", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole("button");

      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it("has correct focus-visible styles", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50"
      );
    });

    it("supports aria-describedby", () => {
      render(
        <div>
          <Button {...defaultProps} aria-describedby="description" />
          <div id="description">Button description</div>
        </div>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Complex children", () => {
    it("renders with icon and text", () => {
      render(
        <Button {...defaultProps}>
          <span data-testid="icon">🔍</span>
          Search
        </Button>
      );

      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders with only icon", () => {
      render(
        <Button size="icon">
          <span data-testid="icon">🔍</span>
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-9");
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("renders with empty children", () => {
      render(<Button />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with null children", () => {
      render(<Button>{null}</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with undefined children", () => {
      render(<Button>{undefined}</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("handles multiple className values", () => {
      render(<Button {...defaultProps} className="class1 class2" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("class1", "class2");
    });
  });

  describe("Integration with theme classes", () => {
    it("applies theme-aware classes", () => {
      render(<Button {...defaultProps} variant="default" />);
      const button = screen.getByRole("button");

      // Check for theme-aware classes
      expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("applies hover states correctly", () => {
      render(<Button {...defaultProps} variant="default" />);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("hover:bg-primary/90");
    });

    it("applies focus states correctly", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole("button");

      expect(button).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50"
      );
    });
  });
});
