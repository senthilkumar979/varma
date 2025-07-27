import * as React from "react";

export type BannerVariant = "info" | "success" | "warning" | "error" | "note";

export interface BannerProps {
  /** Whether the banner is visible */
  show?: boolean;
  /** Callback when banner is dismissed */
  onDismiss?: () => void;
  /** The variant/type of banner */
  variant?: BannerVariant;
  /** Icon to display in the banner */
  icon?: React.ReactNode;
  /** Title text for the banner */
  title?: React.ReactNode;
  /** Main content of the banner */
  children: React.ReactNode;
  /** Whether to show the dismiss button */
  dismissible?: boolean;
  /** Custom dismiss button text/icon */
  dismissText?: React.ReactNode;
  /** Whether to show the grid pattern background */
  showGrid?: boolean;
  /** Custom className for the banner */
  className?: string;
  /** Custom className for the content area */
  contentClassName?: string;
  /** Custom className for the dismiss button */
  dismissClassName?: string;
}
