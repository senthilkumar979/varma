import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex h-9 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error:
          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
        success:
          "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20",
        warning:
          "border-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20",
      },
      size: {
        sm: "h-7 px-2 py-1 text-xs",
        default: "h-9 px-3 py-2 text-sm",
        lg: "h-11 px-4 py-3 text-base",
        xl: "h-12 px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
