import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "./Textarea";
import type { TextareaProps } from "./Textarea.types";

describe("Textarea", () => {
  const defaultProps: TextareaProps = {
    placeholder: "Enter your message here...",
    rows: 4,
  };

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Textarea {...defaultProps} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("data-slot", "textarea");
      expect(textarea).toHaveAttribute(
        "placeholder",
        "Enter your message here..."
      );
    });

    it("renders with custom className", () => {
      render(<Textarea {...defaultProps} className="custom-class" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("custom-class");
    });

    it("renders with all HTML textarea attributes", () => {
      render(
        <Textarea
          {...defaultProps}
          id="test-id"
          disabled
          aria-label="Custom label"
          data-testid="custom-textarea"
          rows={6}
          cols={50}
          maxLength={100}
        />
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("id", "test-id");
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveAttribute("aria-label", "Custom label");
      expect(textarea).toHaveAttribute("data-testid", "custom-textarea");
      expect(textarea).toHaveAttribute("rows", "6");
      expect(textarea).toHaveAttribute("cols", "50");
      expect(textarea).toHaveAttribute("maxLength", "100");
    });
  });

  describe("Helper Text", () => {
    it("renders helper text when provided", () => {
      render(<Textarea {...defaultProps} helperText="This is helper text" />);
      expect(screen.getByText("This is helper text")).toBeInTheDocument();
      expect(screen.getByText("This is helper text")).toHaveAttribute(
        "aria-live",
        "polite"
      );
    });

    it("does not render helper text when not provided", () => {
      render(<Textarea {...defaultProps} />);
      expect(screen.queryByText("This is helper text")).not.toBeInTheDocument();
    });

    it("does not render helper text when isError is true", () => {
      render(
        <Textarea
          {...defaultProps}
          helperText="This should not show"
          isError={true}
        />
      );
      expect(
        screen.queryByText("This should not show")
      ).not.toBeInTheDocument();
    });

    it("renders helper text with correct styling", () => {
      render(<Textarea {...defaultProps} helperText="Helper text" />);
      const helperText = screen.getByText("Helper text");
      expect(helperText).toHaveClass(
        "mt-2",
        "text-xs",
        "text-muted-foreground"
      );
    });
  });

  describe("Error State", () => {
    it("applies error styles when isError is true", () => {
      render(<Textarea {...defaultProps} isError={true} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("aria-invalid:border-destructive");
    });

    it("does not show helper text when in error state", () => {
      render(
        <Textarea
          {...defaultProps}
          helperText="This should not show"
          isError={true}
        />
      );
      expect(
        screen.queryByText("This should not show")
      ).not.toBeInTheDocument();
    });

    it("applies error styling when in error state", () => {
      render(<Textarea {...defaultProps} isError={true} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("aria-invalid:border-destructive");
    });
  });

  describe("End Icon", () => {
    it("renders end icon when provided", () => {
      render(<Textarea {...defaultProps} endIcon="📝" />);
      expect(screen.getByText("📝")).toBeInTheDocument();
    });

    it("does not render end icon when not provided", () => {
      render(<Textarea {...defaultProps} />);
      expect(screen.queryByText("📝")).not.toBeInTheDocument();
    });

    it("applies correct padding when end icon is present", () => {
      render(<Textarea {...defaultProps} endIcon="📝" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("pe-15");
    });

    it("renders end icon", () => {
      render(<Textarea {...defaultProps} endIcon="📝" />);
      expect(screen.getByText("📝")).toBeInTheDocument();
    });

    it("renders complex end icon", () => {
      const ComplexIcon = () => <span data-testid="complex-icon">🔍</span>;
      render(<Textarea {...defaultProps} endIcon={<ComplexIcon />} />);
      expect(screen.getByTestId("complex-icon")).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders disabled state correctly", () => {
      render(<Textarea {...defaultProps} disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("renders with default value", () => {
      render(<Textarea {...defaultProps} defaultValue="Initial value" />);
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("Initial value");
    });

    it("renders with controlled value", () => {
      render(
        <Textarea
          {...defaultProps}
          value="Controlled value"
          onChange={() => {}}
        />
      );
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("Controlled value");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when text is entered", () => {
      const handleChange = vi.fn();
      render(<Textarea {...defaultProps} onChange={handleChange} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "New text" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus when focused", () => {
      const handleFocus = vi.fn();
      render(<Textarea {...defaultProps} onFocus={handleFocus} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.focus(textarea);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when blurred", () => {
      const handleBlur = vi.fn();
      render(<Textarea {...defaultProps} onBlur={handleBlur} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.blur(textarea);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("calls onChange when disabled but still allows input", () => {
      const handleChange = vi.fn();
      render(<Textarea {...defaultProps} onChange={handleChange} disabled />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "New text" } });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Focus and Accessibility", () => {
    it("supports focus management", () => {
      render(<Textarea {...defaultProps} />);
      const textarea = screen.getByRole("textbox");

      textarea.focus();
      expect(document.activeElement).toBe(textarea);
    });

    it("has correct focus-visible styles", () => {
      render(<Textarea {...defaultProps} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50"
      );
    });

    it("supports aria-describedby", () => {
      render(
        <div>
          <Textarea {...defaultProps} aria-describedby="description" />
          <div id="description">Textarea description</div>
        </div>
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-describedby", "description");
    });

    it("supports aria-label", () => {
      render(<Textarea {...defaultProps} aria-label="Custom label" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-label", "Custom label");
    });

    it("supports aria-labelledby", () => {
      render(
        <div>
          <label id="label">Textarea Label</label>
          <Textarea {...defaultProps} aria-labelledby="label" />
        </div>
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-labelledby", "label");
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<Textarea {...defaultProps} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass(
        "border-input",
        "placeholder:text-muted-foreground",
        "min-h-16",
        "w-full",
        "rounded-md",
        "border",
        "bg-transparent",
        "px-3",
        "py-2",
        "text-base",
        "shadow-xs",
        "outline-none",
        "resize-none"
      );
    });

    it("applies theme-aware classes", () => {
      render(<Textarea {...defaultProps} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-input", "dark:bg-input/30");
    });

    it("applies responsive text size", () => {
      render(<Textarea {...defaultProps} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("text-base", "md:text-sm");
    });

    it("applies transition classes", () => {
      render(<Textarea {...defaultProps} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("transition-[color,box-shadow]");
    });
  });

  describe("Edge cases", () => {
    it("renders with empty placeholder", () => {
      render(<Textarea rows={4} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    it("renders with null endIcon", () => {
      render(<Textarea {...defaultProps} endIcon={null} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
      expect(textarea).not.toHaveClass("pe-15");
    });

    it("renders with undefined endIcon", () => {
      render(<Textarea {...defaultProps} endIcon={undefined} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
      expect(textarea).not.toHaveClass("pe-15");
    });

    it("handles multiple className values", () => {
      render(<Textarea {...defaultProps} className="class1 class2" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("class1", "class2");
    });

    it("handles empty helperText", () => {
      render(<Textarea {...defaultProps} helperText="" />);
      // Empty helperText should not be rendered
      expect(screen.queryByText("")).not.toBeInTheDocument();
    });

    it("handles whitespace-only helperText", () => {
      render(<Textarea {...defaultProps} helperText="   " />);
      expect(screen.queryByText("   ")).not.toBeInTheDocument();
    });
  });

  describe("Form integration", () => {
    it("works with form elements", () => {
      render(
        <form>
          <Textarea {...defaultProps} name="message" />
        </form>
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("name", "message");
    });

    it("supports required attribute", () => {
      render(<Textarea {...defaultProps} required />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("required");
    });

    it("supports readOnly attribute", () => {
      render(<Textarea {...defaultProps} readOnly />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("readOnly");
    });

    it("supports autoComplete attribute", () => {
      render(<Textarea {...defaultProps} autoComplete="off" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("autoComplete", "off");
    });
  });

  describe("Performance and behavior", () => {
    it("maintains value during re-renders", () => {
      const { rerender } = render(
        <Textarea {...defaultProps} value="Test value" onChange={() => {}} />
      );
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("Test value");

      rerender(
        <Textarea {...defaultProps} value="Test value" onChange={() => {}} />
      );
      expect(textarea.value).toBe("Test value");
    });

    it("handles rapid value changes", () => {
      const handleChange = vi.fn();
      render(<Textarea {...defaultProps} onChange={handleChange} />);
      const textarea = screen.getByRole("textbox");

      fireEvent.change(textarea, { target: { value: "First" } });
      fireEvent.change(textarea, { target: { value: "Second" } });
      fireEvent.change(textarea, { target: { value: "Third" } });

      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });
});
