import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";
import type { LabelProps } from "./Label.types";

describe("Label", () => {
  const defaultProps: LabelProps = {
    children: "Test Label",
  };

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Label {...defaultProps} />);
      const label = screen.getByText("Test Label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute("data-slot", "label");
    });

    it("renders with custom className", () => {
      render(<Label {...defaultProps} className="custom-class" />);
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("custom-class");
    });

    it("renders with all HTML label attributes", () => {
      render(
        <Label
          {...defaultProps}
          id="test-id"
          htmlFor="input-id"
          aria-label="Custom label"
          data-testid="custom-label"
        />
      );
      const label = screen.getByText("Test Label");
      expect(label).toHaveAttribute("id", "test-id");
      expect(label).toHaveAttribute("for", "input-id");
      expect(label).toHaveAttribute("aria-label", "Custom label");
      expect(label).toHaveAttribute("data-testid", "custom-label");
    });
  });

  describe("Variants", () => {
    const variants = ["default", "muted", "error", "success", "warning"] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Label {...defaultProps} variant={variant} />);
        const label = screen.getByText("Test Label");

        // Check for variant-specific classes
        if (variant === "default") {
          expect(label).toHaveClass("text-foreground");
        } else if (variant === "muted") {
          expect(label).toHaveClass("text-muted-foreground");
        } else if (variant === "error") {
          expect(label).toHaveClass("text-destructive");
        } else if (variant === "success") {
          expect(label).toHaveClass("text-green-600");
        } else if (variant === "warning") {
          expect(label).toHaveClass("text-yellow-600");
        }
      });
    });
  });

  describe("Sizes", () => {
    const sizes = ["sm", "default", "lg", "xl"] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size correctly`, () => {
        render(<Label {...defaultProps} size={size} />);
        const label = screen.getByText("Test Label");

        if (size === "sm") {
          expect(label).toHaveClass("text-xs");
        } else if (size === "lg") {
          expect(label).toHaveClass("text-base");
        } else if (size === "xl") {
          expect(label).toHaveClass("text-lg");
        } else {
          expect(label).toHaveClass("text-sm");
        }
      });
    });
  });

  describe("States", () => {
    it("renders disabled state correctly when parent is disabled", () => {
      render(
        <div data-disabled="true">
          <Label {...defaultProps} />
        </div>
      );
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass(
        "group-data-[disabled=true]:pointer-events-none",
        "group-data-[disabled=true]:opacity-50"
      );
    });

    it("renders peer disabled state correctly", () => {
      render(
        <div>
          <input disabled />
          <Label {...defaultProps} />
        </div>
      );
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass(
        "peer-disabled:cursor-not-allowed",
        "peer-disabled:opacity-50"
      );
    });
  });

  describe("Accessibility", () => {
    it("supports htmlFor attribute", () => {
      render(<Label {...defaultProps} htmlFor="input-id" />);
      const label = screen.getByText("Test Label");
      expect(label).toHaveAttribute("for", "input-id");
    });

    it("supports aria-describedby", () => {
      render(
        <div>
          <Label {...defaultProps} aria-describedby="description" />
          <div id="description">Label description</div>
        </div>
      );
      const label = screen.getByText("Test Label");
      expect(label).toHaveAttribute("aria-describedby", "description");
    });

    it("has correct select-none class for accessibility", () => {
      render(<Label {...defaultProps} />);
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("select-none");
    });
  });

  describe("Complex children", () => {
    it("renders with icon and text", () => {
      render(
        <Label {...defaultProps}>
          <span data-testid="icon">📝</span>
          Form Label
        </Label>
      );

      expect(screen.getByText("Form Label")).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders with only icon", () => {
      render(
        <Label>
          <span data-testid="icon">📝</span>
        </Label>
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("renders with empty children", () => {
      render(<Label />);
      const label = screen.getByAttribute("data-slot", "label");
      expect(label).toBeInTheDocument();
    });

    it("renders with null children", () => {
      render(<Label>{null}</Label>);
      const label = screen.getByAttribute("data-slot", "label");
      expect(label).toBeInTheDocument();
    });

    it("renders with undefined children", () => {
      render(<Label>{undefined}</Label>);
      const label = screen.getByAttribute("data-slot", "label");
      expect(label).toBeInTheDocument();
    });

    it("handles multiple className values", () => {
      render(<Label {...defaultProps} className="class1 class2" />);
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("class1", "class2");
    });
  });

  describe("Integration with theme classes", () => {
    it("applies theme-aware classes", () => {
      render(<Label {...defaultProps} variant="default" />);
      const label = screen.getByText("Test Label");

      // Check for theme-aware classes
      expect(label).toHaveClass("text-foreground");
    });

    it("applies dark mode classes correctly", () => {
      render(<Label {...defaultProps} variant="success" />);
      const label = screen.getByText("Test Label");

      expect(label).toHaveClass("text-green-600", "dark:text-green-400");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLLabelElement>();
      render(<Label {...defaultProps} ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
      expect(ref.current).toHaveAttribute("data-slot", "label");
    });
  });
}); 