import * as React from "react";

export interface PopoverProps extends React.ComponentProps<"div"> {
  /**
   * Whether the popover is open
   */
  open?: boolean;
  /**
   * Callback when the popover open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the popover is modal
   */
  modal?: boolean;
  /**
   * The children to render inside the popover
   */
  children?: React.ReactNode;
  /**
   * Optional CSS class name to apply to the popover
   */
  className?: string;
  /**
   * The default open state
   */
  defaultOpen?: boolean;
}

export interface PopoverTriggerProps extends React.ComponentProps<"button"> {
  /**
   * Optional CSS class name to apply to the trigger
   */
  className?: string;
  /**
   * Whether the trigger is disabled
   */
  disabled?: boolean;
  /**
   * The children to render inside the trigger
   */
  children?: React.ReactNode;
  /**
   * The aria-label for the trigger
   */
  "aria-label"?: string;
  /**
   * The aria-describedby for the trigger
   */
  "aria-describedby"?: string;
}

export interface PopoverContentProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the content
   */
  className?: string;
  /**
   * The alignment of the popover content
   */
  align?: "start" | "center" | "end";
  /**
   * The side offset of the popover content
   */
  sideOffset?: number;
  /**
   * The side of the trigger to show the popover
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Whether to avoid collisions with the viewport
   */
  avoidCollisions?: boolean;
  /**
   * The children to render inside the content
   */
  children?: React.ReactNode;
  /**
   * The aria-label for the content
   */
  "aria-label"?: string;
  /**
   * The aria-describedby for the content
   */
  "aria-describedby"?: string;
}

export interface PopoverAnchorProps extends React.ComponentProps<"div"> {
  /**
   * Optional CSS class name to apply to the anchor
   */
  className?: string;
  /**
   * The children to render inside the anchor
   */
  children?: React.ReactNode;
}
