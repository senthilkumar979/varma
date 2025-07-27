import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Input } from "./Input";
import type { InputProps } from "./Input.types";

describe("Input", () => {
  const defaultProps: InputProps = {
    placeholder: "Enter text",
  };

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      // Input component doesn't set default type attribute
    });

    it("renders with custom className", () => {
      render(<Input {...defaultProps} className="custom-class" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveClass("custom-class");
    });

    it("renders with all HTML input attributes", () => {
      render(
        <Input
          {...defaultProps}
          id="test-id"
          name="test-name"
          disabled
          required
          readOnly
          aria-label="Custom label"
          data-testid="custom-input"
        />
      );
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("id", "test-id");
      expect(input).toHaveAttribute("name", "test-name");
      expect(input).toBeDisabled();
      expect(input).toBeRequired();
      expect(input).toHaveAttribute("readonly");
      expect(input).toHaveAttribute("aria-label", "Custom label");
      expect(input).toHaveAttribute("data-testid", "custom-input");
    });
  });

  describe("Variants", () => {
    const variants = ["default", "error", "success", "warning"] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Input {...defaultProps} variant={variant} />);
        const input = screen.getByPlaceholderText("Enter text");

        // Check for variant-specific classes
        if (variant === "default") {
          expect(input).toHaveClass("border-input");
        } else if (variant === "error") {
          expect(input).toHaveClass("border-destructive");
        } else if (variant === "success") {
          expect(input).toHaveClass("border-green-500");
        } else if (variant === "warning") {
          expect(input).toHaveClass("border-yellow-500");
        }
      });
    });
  });

  describe("Sizes", () => {
    const sizes = ["sm", "default", "lg", "xl"] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size correctly`, () => {
        render(<Input {...defaultProps} size={size} />);
        const input = screen.getByPlaceholderText("Enter text");

        if (size === "sm") {
          expect(input).toHaveClass("h-7", "text-xs");
        } else if (size === "lg") {
          expect(input).toHaveClass("h-11", "text-base");
        } else if (size === "xl") {
          expect(input).toHaveClass("h-12", "text-lg");
        } else {
          expect(input).toHaveClass("h-9", "text-sm");
        }
      });
    });
  });

  describe("Input Types", () => {
    const inputTypes = [
      "text",
      "email",
      "password",
      "number",
      "tel",
      "url",
      "search",
      "file",
      "date",
      "time",
      "datetime-local",
      "month",
      "week",
    ] as const;

    inputTypes.forEach((type) => {
      it(`renders ${type} type correctly`, () => {
        render(<Input {...defaultProps} type={type} />);
        const input = screen.getByPlaceholderText("Enter text");
        expect(input).toHaveAttribute("type", type);
      });
    });
  });

  describe("States", () => {
    it("renders disabled state correctly", () => {
      render(<Input {...defaultProps} disabled />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeDisabled();
      expect(input).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("renders required state correctly", () => {
      render(<Input {...defaultProps} required />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeRequired();
    });

    it("renders read-only state correctly", () => {
      render(<Input {...defaultProps} readOnly />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("readonly");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when value changes", () => {
      const handleChange = vi.fn();
      render(<Input {...defaultProps} onChange={handleChange} />);

      const input = screen.getByPlaceholderText("Enter text");
      fireEvent.change(input, { target: { value: "test" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus when focused", () => {
      const handleFocus = vi.fn();
      render(<Input {...defaultProps} onFocus={handleFocus} />);

      const input = screen.getByPlaceholderText("Enter text");
      fireEvent.focus(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when blurred", () => {
      const handleBlur = vi.fn();
      render(<Input {...defaultProps} onBlur={handleBlur} />);

      const input = screen.getByPlaceholderText("Enter text");
      fireEvent.blur(input);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("calls onChange when disabled but still allows input", () => {
      const handleChange = vi.fn();
      render(<Input {...defaultProps} onChange={handleChange} disabled />);

      const input = screen.getByPlaceholderText("Enter text");
      fireEvent.change(input, { target: { value: "test" } });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("supports aria-describedby", () => {
      render(
        <div>
          <Input {...defaultProps} aria-describedby="description" />
          <div id="description">Input description</div>
        </div>
      );
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("aria-describedby", "description");
    });

    it("supports aria-invalid", () => {
      render(<Input {...defaultProps} aria-invalid="true" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("has correct focus-visible styles", () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/20"
      );
    });
  });

  describe("Special Input Types", () => {
    it("applies search-specific styles for search type", () => {
      render(<Input {...defaultProps} type="search" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveClass(
        "[&::-webkit-search-cancel-button]:appearance-none",
        "[&::-webkit-search-decoration]:appearance-none"
      );
    });

    it("applies file-specific styles for file type", () => {
      render(<Input {...defaultProps} type="file" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveClass(
        "p-0",
        "pr-3",
        "italic",
        "text-muted-foreground/70"
      );
    });
  });

  describe("Validation", () => {
    it("supports pattern validation", () => {
      render(<Input {...defaultProps} pattern="[A-Za-z]{3}" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("pattern", "[A-Za-z]{3}");
    });

    it("supports min/max for number inputs", () => {
      render(
        <Input {...defaultProps} type="number" min="0" max="100" step="5" />
      );
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "100");
      expect(input).toHaveAttribute("step", "5");
    });

    it("supports minLength/maxLength", () => {
      render(<Input {...defaultProps} minLength={3} maxLength={10} />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("minlength", "3");
      expect(input).toHaveAttribute("maxlength", "10");
    });
  });

  describe("Edge cases", () => {
    it("renders with empty value", () => {
      render(<Input {...defaultProps} value="" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveValue("");
    });

    it("renders with null value", () => {
      render(<Input {...defaultProps} value={null as any} />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
    });

    it("renders with undefined value", () => {
      render(<Input {...defaultProps} value={undefined as any} />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
    });

    it("handles multiple className values", () => {
      render(<Input {...defaultProps} className="class1 class2" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveClass("class1", "class2");
    });
  });

  describe("Integration with theme classes", () => {
    it("applies theme-aware classes", () => {
      render(<Input {...defaultProps} variant="default" />);
      const input = screen.getByPlaceholderText("Enter text");

      // Check for theme-aware classes
      expect(input).toHaveClass(
        "border-input",
        "bg-background",
        "text-foreground"
      );
    });

    it("applies placeholder styles correctly", () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByPlaceholderText("Enter text");

      expect(input).toHaveClass("placeholder:text-muted-foreground/70");
    });

    it("applies focus states correctly", () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByPlaceholderText("Enter text");

      expect(input).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:outline-none",
        "focus-visible:ring-[3px]",
        "focus-visible:ring-ring/20"
      );
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      // Input component doesn't set default type attribute
    });
  });

  describe("File input specific", () => {
    it("supports multiple file selection", () => {
      render(<Input {...defaultProps} type="file" multiple />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("multiple");
    });

    it("supports accept attribute for file inputs", () => {
      render(<Input {...defaultProps} type="file" accept=".pdf,.doc,.docx" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("accept", ".pdf,.doc,.docx");
    });
  });
});
