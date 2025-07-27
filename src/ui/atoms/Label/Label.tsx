"use client"

import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/tw-utils";
import { labelVariants } from "./Label.variants";
import type { LabelProps } from "./Label.types";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps & VariantProps<typeof labelVariants>
>(({ className, variant, size, isMandatory = false, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    data-slot="label"
    className={cn(labelVariants({ variant, size, isMandatory }), className)}
    aria-required={isMandatory}
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
