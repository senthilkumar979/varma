import * as React from "react";

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  /**
   * Optional CSS class name to apply to the input
   */
  className?: string;
  /**
   * The type of the input element
   */
  type?: React.HTMLInputTypeAttribute;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * The placeholder text for the input
   */
  placeholder?: string;
  /**
   * The value of the input
   */
  value?: string | number | readonly string[];
  /**
   * The default value of the input
   */
  defaultValue?: string | number | readonly string[];
  /**
   * The name attribute of the input
   */
  name?: string;
  /**
   * The id attribute of the input
   */
  id?: string;
  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;
  /**
   * The minimum value for number inputs
   */
  min?: string | number;
  /**
   * The maximum value for number inputs
   */
  max?: string | number;
  /**
   * The step value for number inputs
   */
  step?: string | number;
  /**
   * The pattern for validation
   */
  pattern?: string;
  /**
   * The maximum length of the input
   */
  maxLength?: number;
  /**
   * The minimum length of the input
   */
  minLength?: number;
  /**
   * Whether the input should auto-complete
   */
  autoComplete?: string;
  /**
   * Whether the input should auto-focus
   */
  autoFocus?: boolean;
  /**
   * Whether the input should spell check
   */
  spellCheck?: boolean;

  /**
   * Whether the input should be multiple (for file inputs)
   */
  multiple?: boolean;
  /**
   * The accept attribute for file inputs
   */
  accept?: string;
}
