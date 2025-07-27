import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/utils/tw-utils";
import type { ButtonProps } from "./Button.types";
import { buttonVariants } from "./Button.variants";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
