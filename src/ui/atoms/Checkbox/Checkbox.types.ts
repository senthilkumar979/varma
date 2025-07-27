import * as React from "react";

export interface CheckboxProps extends React.ComponentProps<"input"> {
  /**
   * Optional CSS class name to apply to the checkbox
   */
  className?: string;
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Callback when the checkbox state changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback when the checkbox is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback when the checkbox loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * The name attribute for the checkbox
   */
  name?: string;
  /**
   * The value attribute for the checkbox
   */
  value?: string;
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  /**
   * Whether the checkbox is read-only
   */
  readOnly?: boolean;
  /**
   * The tab index for the checkbox
   */
  tabIndex?: number;
  /**
   * The aria-label for the checkbox
   */
  "aria-label"?: string;
  /**
   * The aria-labelledby for the checkbox
   */
  "aria-labelledby"?: string;
  /**
   * The aria-describedby for the checkbox
   */
  "aria-describedby"?: string;
  /**
   * The aria-invalid state for the checkbox
   */
  "aria-invalid"?: boolean | "true" | "false";
}
