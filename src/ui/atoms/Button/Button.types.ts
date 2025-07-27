import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./Button.variants";

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Re-export the buttonVariants for use in other files
export { buttonVariants } from "./Button.variants";
