import { cn } from "@/utils/tw-utils";
import { Slot } from "@radix-ui/react-slot";
import type { BadgeProps } from "./Badge.types";
import { badgeVariants } from "./Badge.variants";

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-testid="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export type { BadgeProps } from "./Badge.types";
export { Badge, badgeVariants };
