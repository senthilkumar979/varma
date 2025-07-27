"use client";

import { cn } from "@/utils/tw-utils";
import {
  PopoverContent as PopoverContentPrimitive,
  Popover as PopoverPrimitiveRoot,
  PopoverTrigger as PopoverTriggerPrimitive,
} from "@radix-ui/react-popover";
import * as React from "react";

const Popover = ({
  ...props
}: React.ComponentProps<typeof PopoverPrimitiveRoot>) => {
  return (
    <PopoverPrimitiveRoot
      data-testid="popover"
      data-slot="popover"
      {...props}
    />
  );
};

const PopoverTrigger = ({
  ...props
}: React.ComponentProps<typeof PopoverTriggerPrimitive>) => {
  return (
    <PopoverTriggerPrimitive
      data-testid="popover-trigger"
      data-slot="popover-trigger"
      {...props}
    />
  );
};

const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverContentPrimitive>) => {
  return (
    <PopoverContentPrimitive
      data-testid="popover-content"
      data-slot="popover-content"
      data-align={align}
      data-side={props.side}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md shadow-black/5 outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  );
};

export { Popover, PopoverContent, PopoverTrigger };
