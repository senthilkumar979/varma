import type { MouseEvent, ReactNode } from "react";

export type RippleButtonType = "hover" | "hoverborder";
export type RippleButtonVariant =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "dark";

export interface RippleButtonProps {
  /** The content to display inside the button */
  children: ReactNode;
  /** Callback when button is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Custom className for the button */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The type of ripple effect */
  type?: RippleButtonType;
  /** The visual variant of the button */
  variant?: RippleButtonVariant;
  /** User override for the JS click ripple color */
  rippleColor?: string;
  /** Duration for the JS click ripple (all types) */
  rippleDuration?: number;
  /** Custom hover ripple color */
  hoverRippleColor?: string;
  /** Color of the visual effect forming the border */
  hoverBorderEffectColor?: string;
  /** Thickness of the border effect (e.g., "0.3em", "2px") */
  hoverBorderEffectThickness?: string;
}
