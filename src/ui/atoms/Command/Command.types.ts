import * as React from "react";

export interface CommandProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the command component
   */
  className?: string;
  /**
   * Whether the command component is disabled
   */
  disabled?: boolean;
  /**
   * The value of the command input
   */
  value?: string;
  /**
   * Callback when the command value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether the command should filter items
   */
  shouldFilter?: boolean;
  /**
   * The placeholder text for the command input
   */
  placeholder?: string;
  /**
   * The label for the command component
   */
  label?: string;
  /**
   * The aria-label for the command component
   */
  "aria-label"?: string;
  /**
   * The aria-describedby for the command component
   */
  "aria-describedby"?: string;
}

export interface CommandDialogProps extends React.ComponentProps<"div"> {
  /**
   * Whether the dialog is open
   */
  open?: boolean;
  /**
   * Callback when the dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The title of the dialog
   */
  title?: string;
  /**
   * The description of the dialog
   */
  description?: string;
  /**
   * The children to render inside the dialog
   */
  children?: React.ReactNode;
  /**
   * Optional CSS class name to apply to the dialog
   */
  className?: string;
}

export interface CommandInputProps extends React.ComponentProps<"input"> {
  /**
   * Optional CSS class name to apply to the input
   */
  className?: string;
  /**
   * The placeholder text for the input
   */
  placeholder?: string;
  /**
   * The value of the input
   */
  value?: string;
  /**
   * Callback when the input value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback when the input is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback when the input loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * The aria-label for the input
   */
  "aria-label"?: string;
}

export interface CommandListProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the list
   */
  className?: string;
  /**
   * The children to render inside the list
   */
  children?: React.ReactNode;
  /**
   * The maximum height of the list
   */
  maxHeight?: string;
  /**
   * Whether the list is empty
   */
  empty?: boolean;
}

export interface CommandEmptyProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the empty state
   */
  className?: string;
  /**
   * The message to display when the list is empty
   */
  children?: React.ReactNode;
}

export interface CommandGroupProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the group
   */
  className?: string;
  /**
   * The heading for the group
   */
  heading?: string;
  /**
   * The children to render inside the group
   */
  children?: React.ReactNode;
}

export interface CommandItemProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the item
   */
  className?: string;
  /**
   * The value of the item
   */
  value?: string;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  /**
   * Callback when the item is selected
   */
  onSelect?: (value: string) => void;
  /**
   * The children to render inside the item
   */
  children?: React.ReactNode;
  /**
   * The aria-label for the item
   */
  "aria-label"?: string;
}

export interface CommandSeparatorProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the separator
   */
  className?: string;
}

export interface CommandShortcutProps extends React.ComponentProps<"span"> {
  /**
   * Optional CSS class name to apply to the shortcut
   */
  className?: string;
  /**
   * The shortcut keys to display
   */
  children?: React.ReactNode;
}
