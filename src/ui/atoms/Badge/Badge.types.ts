import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import type { badgeVariants } from "./Badge.variants";

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}
