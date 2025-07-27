import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/tw-utils";
import { inputVariants } from "./Input.variants";
import type { InputProps } from "./Input.types";

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & VariantProps<typeof inputVariants>
>(({ className, type, variant, size, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        inputVariants({ variant, size }),
        type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
        type === "file" &&
          "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
