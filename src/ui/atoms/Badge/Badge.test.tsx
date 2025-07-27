import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from "./Badge";

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

describe("Badge", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Badge>Test Badge</Badge>);

      const badge = screen.getByText("Test Badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute("data-slot", "badge");
    });

    it("should render with custom className", () => {
      render(<Badge className="custom-class">Test Badge</Badge>);

      const badge = screen.getByText("Test Badge");
      expect(badge).toHaveClass("custom-class");
    });

    it("should render with all variants", () => {
      const variants = [
        "default",
        "secondary",
        "destructive",
        "outline",
      ] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Badge variant={variant}>{`${variant} badge`}</Badge>
        );

        const badge = screen.getByText(`${variant} badge`);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveAttribute("data-slot", "badge");

        unmount();
      });
    });

    it("should render with children content", () => {
      render(
        <Badge>
          <span>Custom content</span>
        </Badge>
      );

      expect(screen.getByText("Custom content")).toBeInTheDocument();
    });

    it("should render with icon and text", () => {
      render(
        <Badge>
          <svg data-testid="icon" />
          Badge with icon
        </Badge>
      );

      expect(screen.getByText("Badge with icon")).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply default variant styles", () => {
      render(<Badge variant="default">Default Badge</Badge>);

      const badge = screen.getByText("Default Badge");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-primary",
        "text-primary-foreground"
      );
    });

    it("should apply secondary variant styles", () => {
      render(<Badge variant="secondary">Secondary Badge</Badge>);

      const badge = screen.getByText("Secondary Badge");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-secondary",
        "text-secondary-foreground"
      );
    });

    it("should apply destructive variant styles", () => {
      render(<Badge variant="destructive">Destructive Badge</Badge>);

      const badge = screen.getByText("Destructive Badge");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-destructive",
        "text-white"
      );
    });

    it("should apply outline variant styles", () => {
      render(<Badge variant="outline">Outline Badge</Badge>);

      const badge = screen.getByText("Outline Badge");
      expect(badge).toHaveClass("text-foreground");
    });

    it("should use default variant when no variant is specified", () => {
      render(<Badge>Default Badge</Badge>);

      const badge = screen.getByText("Default Badge");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-primary",
        "text-primary-foreground"
      );
    });
  });

  describe("asChild prop", () => {
    it("should render as span by default", () => {
      render(<Badge>Test Badge</Badge>);

      const badge = screen.getByText("Test Badge");
      expect(badge.tagName).toBe("SPAN");
    });

    it("should render as Slot when asChild is true", () => {
      render(
        <Badge asChild>
          <button type="button">Button Badge</button>
        </Badge>
      );

      const slot = screen.getByTestId("slot");
      expect(slot).toBeInTheDocument();
      expect(slot).toHaveTextContent("Button Badge");
    });

    it("should pass props to Slot when asChild is true", () => {
      render(
        <Badge asChild variant="destructive">
          <a href="/test">Link Badge</a>
        </Badge>
      );

      const slot = screen.getByTestId("slot");
      expect(slot).toBeInTheDocument();
      expect(slot).toHaveAttribute("data-slot", "badge");
    });
  });

  describe("Accessibility", () => {
    it("should support role attribute", () => {
      render(<Badge role="status">Status Badge</Badge>);

      const badge = screen.getByRole("status");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent("Status Badge");
    });

    it("should support aria-label attribute", () => {
      render(<Badge aria-label="Status indicator">Badge</Badge>);

      const badge = screen.getByLabelText("Status indicator");
      expect(badge).toBeInTheDocument();
    });

    it("should support aria-labelledby attribute", () => {
      render(
        <div>
          <span id="label">Badge Label</span>
          <Badge aria-labelledby="label">Badge</Badge>
        </div>
      );

      const badge = screen.getByLabelText("Badge Label");
      expect(badge).toBeInTheDocument();
    });

    it("should support aria-describedby attribute", () => {
      render(
        <div>
          <span id="description">Badge description</span>
          <Badge aria-describedby="description">Badge</Badge>
        </div>
      );

      const badge = screen.getByText("Badge");
      expect(badge).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Interactions", () => {
    it("should handle click events", () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Clickable Badge</Badge>);

      const badge = screen.getByText("Clickable Badge");
      fireEvent.click(badge);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should handle mouse events", () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();

      render(
        <Badge onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover Badge
        </Badge>
      );

      const badge = screen.getByText("Hover Badge");
      fireEvent.mouseEnter(badge);
      fireEvent.mouseLeave(badge);

      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it("should handle focus events", () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();

      render(
        <Badge onFocus={handleFocus} onBlur={handleBlur} tabIndex={0}>
          Focusable Badge
        </Badge>
      );

      const badge = screen.getByText("Focusable Badge");
      fireEvent.focus(badge);
      fireEvent.blur(badge);

      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", () => {
      const handleKeyDown = vi.fn();
      render(
        <Badge onKeyDown={handleKeyDown} tabIndex={0}>
          Keyboard Badge
        </Badge>
      );

      const badge = screen.getByText("Keyboard Badge");
      fireEvent.keyDown(badge, { key: "Enter" });

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      render(<Badge></Badge>);

      const badge = screen.getByRole("generic", { hidden: true });
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute("data-slot", "badge");
    });

    it("should handle null children", () => {
      render(<Badge>{null}</Badge>);

      const badge = screen.getByRole("generic", { hidden: true });
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute("data-slot", "badge");
    });

    it("should handle undefined children", () => {
      render(<Badge>{undefined}</Badge>);

      const badge = screen.getByRole("generic", { hidden: true });
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute("data-slot", "badge");
    });

    it("should handle very long text", () => {
      const longText =
        "This is a very long badge text that should be handled properly without breaking the layout or causing overflow issues";
      render(<Badge>{longText}</Badge>);

      const badge = screen.getByText(longText);
      expect(badge).toBeInTheDocument();
    });

    it("should handle special characters", () => {
      const specialText =
        "Badge with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?";
      render(<Badge>{specialText}</Badge>);

      const badge = screen.getByText(specialText);
      expect(badge).toBeInTheDocument();
    });

    it("should handle HTML entities", () => {
      render(<Badge>&lt;Badge&gt;</Badge>);

      const badge = screen.getByText("<Badge>");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Integration with other elements", () => {
    it("should work as a link when asChild is true", () => {
      render(
        <Badge asChild>
          <a href="/test" data-testid="link">
            Link Badge
          </a>
        </Badge>
      );

      const link = screen.getByTestId("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveTextContent("Link Badge");
    });

    it("should work as a button when asChild is true", () => {
      const handleClick = vi.fn();
      render(
        <Badge asChild>
          <button type="button" onClick={handleClick} data-testid="button">
            Button Badge
          </button>
        </Badge>
      );

      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Button Badge");

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should work with form elements", () => {
      render(
        <Badge asChild>
          <label htmlFor="input" data-testid="label">
            Label Badge
          </label>
        </Badge>
      );

      const label = screen.getByTestId("label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Label Badge");
    });
  });

  describe("Theme integration", () => {
    it("should apply theme-aware classes", () => {
      render(<Badge variant="default">Themed Badge</Badge>);

      const badge = screen.getByText("Themed Badge");
      expect(badge).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("should apply dark mode classes when available", () => {
      render(<Badge variant="destructive">Dark Mode Badge</Badge>);

      const badge = screen.getByText("Dark Mode Badge");
      expect(badge).toHaveClass("dark:bg-destructive/60");
    });

    it("should apply focus-visible classes", () => {
      render(<Badge variant="outline">Focus Badge</Badge>);

      const badge = screen.getByText("Focus Badge");
      expect(badge).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50"
      );
    });
  });

  describe("CSS Classes", () => {
    it("should have base classes", () => {
      render(<Badge>Base Badge</Badge>);

      const badge = screen.getByText("Base Badge");
      expect(badge).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center",
        "rounded-md",
        "border",
        "px-2",
        "py-0.5",
        "text-xs",
        "font-medium",
        "w-fit",
        "whitespace-nowrap",
        "shrink-0"
      );
    });

    it("should have transition classes", () => {
      render(<Badge>Transition Badge</Badge>);

      const badge = screen.getByText("Transition Badge");
      expect(badge).toHaveClass("transition-[color,box-shadow]");
    });

    it("should have overflow classes", () => {
      render(<Badge>Overflow Badge</Badge>);

      const badge = screen.getByText("Overflow Badge");
      expect(badge).toHaveClass("overflow-hidden");
    });

    it("should have icon-specific classes", () => {
      render(
        <Badge>
          <svg data-testid="icon" />
          Icon Badge
        </Badge>
      );

      const badge = screen.getByText("Icon Badge");
      expect(badge).toHaveClass(
        "[&>svg]:size-3",
        "[&>svg]:pointer-events-none"
      );
    });
  });
});
