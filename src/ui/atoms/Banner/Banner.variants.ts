import { cva } from "class-variance-authority";

export const bannerVariants = cva(
  "relative isolate flex flex-col justify-between gap-3 overflow-hidden rounded-lg border py-3 pl-4 pr-12 sm:flex-row sm:items-center sm:py-2",
  {
    variants: {
      variant: {
        info: "border-sky-300 bg-sky-300",
        success: "border-green-300 bg-green-300",
        warning: "border-yellow-300 bg-yellow-300",
        error: "border-red-300 bg-red-300",
        note: "border-gray-300 bg-gray-300",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export const bannerContentVariants = cva("flex items-center gap-3", {
  variants: {
    variant: {
      info: "text-sky-900",
      success: "text-green-900",
      warning: "text-yellow-900",
      error: "text-red-900",
      note: "text-gray-900",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const bannerDismissVariants = cva(
  "absolute inset-y-0 right-2.5 p-1 text-sm underline transition-colors",
  {
    variants: {
      variant: {
        info: "text-white/80 hover:text-white",
        success: "text-white/80 hover:text-white",
        warning: "text-white/80 hover:text-white",
        error: "text-white/80 hover:text-white",
        note: "text-white/80 hover:text-white",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export const bannerDismissIconVariants = cva("w-4 h-4", {
  variants: {
    variant: {
      info: "text-sky-900",
      success: "text-green-900",
      warning: "text-yellow-900",
      error: "text-red-900",
      note: "text-gray-900",
    },
  },
});