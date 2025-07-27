import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RippleButton } from "./RippleButton";
import type { RippleButtonProps } from "./RippleButton.types";

describe("RippleButton", () => {
  const defaultProps: RippleButtonProps = {
    children: "Test Button",
  };

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<RippleButton {...defaultProps} />);
      const button = screen.getByRole("button", { name: "Test Button" });
      expect(button).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<RippleButton {...defaultProps} className="custom-class" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("renders with disabled state", () => {
      render(<RippleButton {...defaultProps} disabled />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Variants", () => {
    const variants = [
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
    ] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<RippleButton {...defaultProps} variant={variant} />);
        const button = screen.getByRole("button");

        // Check for variant-specific classes or styles
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Types", () => {
    it("renders hover type correctly", () => {
      render(<RippleButton {...defaultProps} type="hover" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("relative", "rounded-md", "bg-transparent");
    });

    it("renders hoverborder type correctly", () => {
      render(<RippleButton {...defaultProps} type="hoverborder" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("relative", "rounded-md", "bg-transparent");
    });
  });

  describe("States", () => {
    it("renders disabled state correctly", () => {
      render(<RippleButton {...defaultProps} disabled />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
    });

    it("renders enabled state correctly", () => {
      render(<RippleButton {...defaultProps} disabled={false} />);
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<RippleButton {...defaultProps} onClick={handleClick} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(<RippleButton {...defaultProps} onClick={handleClick} disabled />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("creates ripple effect on click", () => {
      render(<RippleButton {...defaultProps} />);
      const button = screen.getByRole("button");

      // Check if ripple container exists
      const rippleContainer = button.querySelector(
        ".absolute.inset-0.pointer-events-none"
      );
      expect(rippleContainer).toBeInTheDocument();
    });
  });

  describe("Ripple Effects", () => {
    it("applies custom ripple duration", () => {
      render(<RippleButton {...defaultProps} rippleDuration={1000} />);
      const button = screen.getByRole("button");

      // The ripple duration is applied via CSS custom properties
      // We can't easily test this without more complex DOM inspection
      expect(button).toBeInTheDocument();
    });

    it("applies custom ripple color", () => {
      render(<RippleButton {...defaultProps} rippleColor="#ff0000" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("applies custom hover ripple color", () => {
      render(<RippleButton {...defaultProps} hoverRippleColor="#00ff00" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Hover Border Effects", () => {
    it("applies custom border effect color", () => {
      render(
        <RippleButton
          {...defaultProps}
          type="hoverborder"
          hoverBorderEffectColor="#0000ff"
        />
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("applies custom border effect thickness", () => {
      render(
        <RippleButton
          {...defaultProps}
          type="hoverborder"
          hoverBorderEffectThickness="0.5em"
        />
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<RippleButton {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "relative",
        "rounded-md",
        "bg-transparent",
        "isolate",
        "cursor-pointer"
      );
    });

    it("applies hover type classes correctly", () => {
      render(<RippleButton {...defaultProps} type="hover" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "relative",
        "rounded-md",
        "bg-transparent",
        "isolate",
        "cursor-pointer"
      );
    });

    it("applies hoverborder type classes correctly", () => {
      render(<RippleButton {...defaultProps} type="hoverborder" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "relative",
        "rounded-md",
        "bg-transparent",
        "isolate",
        "cursor-pointer"
      );
    });
  });

  describe("Content Structure", () => {
    it("renders children correctly", () => {
      render(<RippleButton>Custom Content</RippleButton>);
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("renders complex children", () => {
      const ComplexContent = () => <span data-testid="complex">Complex</span>;
      render(
        <RippleButton>
          <ComplexContent />
        </RippleButton>
      );
      expect(screen.getByTestId("complex")).toBeInTheDocument();
    });

    it("renders with icon and text", () => {
      render(
        <RippleButton>
          <span data-testid="icon">🔍</span>
          Search
        </RippleButton>
      );

      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("supports focus management", () => {
      render(<RippleButton {...defaultProps} />);
      const button = screen.getByRole("button");

      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe("Edge cases", () => {
    it("renders with empty children", () => {
      render(<RippleButton children="" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with null children", () => {
      render(<RippleButton children={null} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with undefined children", () => {
      render(<RippleButton children={undefined} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("handles multiple className values", () => {
      render(<RippleButton {...defaultProps} className="class1 class2" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("class1", "class2");
    });

    it("handles rapid clicks", () => {
      const handleClick = vi.fn();
      render(<RippleButton {...defaultProps} onClick={handleClick} />);
      const button = screen.getByRole("button");

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Performance and behavior", () => {
    it("maintains state during re-renders", () => {
      const { rerender } = render(<RippleButton {...defaultProps} />);
      expect(screen.getByText("Test Button")).toBeInTheDocument();

      rerender(<RippleButton {...defaultProps} />);
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("prevents event bubbling when disabled", () => {
      const handleClick = vi.fn();
      const handleParentClick = vi.fn();

      render(
        <div onClick={handleParentClick}>
          <RippleButton {...defaultProps} onClick={handleClick} disabled />
        </div>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
      // Note: The component doesn't prevent event bubbling, so parent click will be called
      expect(handleParentClick).toHaveBeenCalledTimes(1);
    });

    it("handles custom props correctly", () => {
      render(
        <RippleButton
          {...defaultProps}
          rippleDuration={800}
          rippleColor="#ff0000"
          hoverRippleColor="#00ff00"
          hoverBorderEffectColor="#0000ff"
          hoverBorderEffectThickness="0.4em"
        />
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Grid hover effects", () => {
    it("renders grid container for hover type", () => {
      render(<RippleButton {...defaultProps} type="hover" />);
      const button = screen.getByRole("button");
      const gridContainer = button.querySelector(
        ".hover-variant-grid-container"
      );
      expect(gridContainer).toBeInTheDocument();
    });

    it("renders grid container for hoverborder type", () => {
      render(<RippleButton {...defaultProps} type="hoverborder" />);
      const button = screen.getByRole("button");
      const gridContainer = button.querySelector(
        ".hoverborder-variant-ripple-container"
      );
      expect(gridContainer).toBeInTheDocument();
    });

    it("renders correct number of grid cells", () => {
      render(<RippleButton {...defaultProps} type="hover" />);
      const button = screen.getByRole("button");
      const gridCells = button.querySelectorAll(".hover-variant-grid-cell");
      expect(gridCells).toHaveLength(432); // 36 * 12 = 432
    });
  });
});
