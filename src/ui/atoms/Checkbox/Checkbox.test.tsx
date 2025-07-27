import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox.types";

const defaultProps: CheckboxProps = {
  id: "test-checkbox",
};

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it("renders with custom className", () => {
      render(<Checkbox {...defaultProps} className="custom-class" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("custom-class");
    });

    it("renders with all HTML checkbox attributes", () => {
      render(
        <Checkbox
          {...defaultProps}
          name="test-name"
          value="test-value"
          required
          readOnly
          tabIndex={0}
        />
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("name", "test-name");
      expect(checkbox).toHaveAttribute("value", "test-value");
      expect(checkbox).toHaveAttribute("required");
      expect(checkbox).toHaveAttribute("readonly");
      expect(checkbox).toHaveAttribute("tabindex", "0");
    });
  });

  describe("States", () => {
    it("renders unchecked state by default", () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });

    it("renders checked state", () => {
      render(<Checkbox {...defaultProps} checked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });

    it("renders disabled state", () => {
      render(<Checkbox {...defaultProps} disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("renders disabled checked state", () => {
      render(<Checkbox {...defaultProps} disabled checked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
      expect(checkbox).toBeChecked();
    });

    it("renders required state", () => {
      render(<Checkbox {...defaultProps} required />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("required");
    });

    it("renders read-only state", () => {
      render(<Checkbox {...defaultProps} readOnly />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("readonly");
    });
  });

  describe("Indeterminate State", () => {
    it("sets indeterminate state correctly", () => {
      render(<Checkbox {...defaultProps} indeterminate />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it("updates indeterminate state when prop changes", () => {
      const { rerender } = render(<Checkbox {...defaultProps} indeterminate />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);

      rerender(<Checkbox {...defaultProps} indeterminate={false} />);
      expect(checkbox.indeterminate).toBe(false);
    });

    it("handles undefined indeterminate prop", () => {
      render(<Checkbox {...defaultProps} indeterminate={undefined} />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);
    });
  });

  describe("Interactions", () => {
    it("calls onChange when clicked", () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onChange={handleChange} />);
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus when focused", () => {
      const handleFocus = vi.fn();
      render(<Checkbox {...defaultProps} onFocus={handleFocus} />);
      const checkbox = screen.getByRole("checkbox");
      fireEvent.focus(checkbox);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when blurred", () => {
      const handleBlur = vi.fn();
      render(<Checkbox {...defaultProps} onBlur={handleBlur} />);
      const checkbox = screen.getByRole("checkbox");
      fireEvent.blur(checkbox);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("calls onChange when disabled but still allows input", () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onChange={handleChange} disabled />);
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalled();
    });

    it("toggles checked state when clicked", () => {
      const { rerender } = render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(<Checkbox {...defaultProps} aria-label="Custom label" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-label", "Custom label");
    });

    it("supports aria-labelledby", () => {
      render(
        <div>
          <label id="label">Checkbox Label</label>
          <Checkbox {...defaultProps} aria-labelledby="label" />
        </div>
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-labelledby", "label");
    });

    it("supports aria-describedby", () => {
      render(
        <div>
          <Checkbox {...defaultProps} aria-describedby="description" />
          <div id="description">Checkbox description</div>
        </div>
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby", "description");
    });

    it("supports aria-invalid", () => {
      render(<Checkbox {...defaultProps} aria-invalid="true" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("has correct focus-visible styles", () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50"
      );
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "peer",
        "border-input",
        "size-4",
        "shrink-0",
        "rounded-[4px]",
        "border",
        "shadow-xs",
        "outline-none"
      );
    });

    it("applies theme-aware classes", () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("border-input", "dark:bg-input/30");
    });

    it("applies checked state classes", () => {
      render(<Checkbox {...defaultProps} checked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "data-[state=checked]:bg-primary",
        "data-[state=checked]:text-primary-foreground",
        "data-[state=checked]:border-primary"
      );
    });

    it("applies disabled state classes", () => {
      render(<Checkbox {...defaultProps} disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("applies transition classes", () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("transition-shadow");
    });
  });

  describe("Form Integration", () => {
    it("works with form elements", () => {
      render(
        <form>
          <Checkbox {...defaultProps} name="test" value="test-value" />
        </form>
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("name", "test");
      expect(checkbox).toHaveAttribute("value", "test-value");
    });

    it("supports required attribute", () => {
      render(<Checkbox {...defaultProps} required />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("required");
    });

    it("supports readOnly attribute", () => {
      render(<Checkbox {...defaultProps} readOnly />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("readonly");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toHaveAttribute("type", "checkbox");
    });
  });

  describe("Edge cases", () => {
    it("handles controlled component correctly", () => {
      const { rerender } = render(
        <Checkbox {...defaultProps} checked={false} />
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox {...defaultProps} checked={true} />);
      expect(checkbox).toBeChecked();
    });

    it("handles multiple className values", () => {
      render(<Checkbox {...defaultProps} className="class1 class2" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("class1", "class2");
    });

    it("handles rapid clicks", () => {
      const handleChange = vi.fn();
      render(<Checkbox {...defaultProps} onChange={handleChange} />);
      const checkbox = screen.getByRole("checkbox");

      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("Performance and behavior", () => {
    it("maintains state during re-renders", () => {
      const { rerender } = render(<Checkbox {...defaultProps} />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();

      rerender(<Checkbox {...defaultProps} />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("handles custom props correctly", () => {
      render(
        <Checkbox
          {...defaultProps}
          data-testid="custom-checkbox"
          data-custom="value"
        />
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-testid", "custom-checkbox");
      expect(checkbox).toHaveAttribute("data-custom", "value");
    });
  });
});
