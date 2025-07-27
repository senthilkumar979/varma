import * as React from "react";
import { cn } from "@/utils/tw-utils";

// Context for tooltip state
interface TooltipContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  delayDuration: number;
  disableHoverableContent: boolean;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a TooltipProvider");
  }
  return context;
};

// Provider component
export const TooltipProvider: React.FC<{
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}> = ({ children, delayDuration = 700, disableHoverableContent = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <TooltipContext.Provider
      value={{
        isOpen,
        setIsOpen,
        delayDuration,
        disableHoverableContent,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

// Root component
export const Tooltip: React.FC<{
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  disableHoverableContent?: boolean;
}> = ({
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  delayDuration,
  disableHoverableContent,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <TooltipContext.Provider
      value={{
        isOpen: currentOpen,
        setIsOpen: handleOpenChange,
        delayDuration: delayDuration ?? 700,
        disableHoverableContent: disableHoverableContent ?? false,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

// Trigger component
export const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
  }
>(({ children, asChild = false, className, ...props }, ref) => {
  const { setIsOpen, delayDuration } = useTooltipContext();
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const handleMouseEnter = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delayDuration);
  }, [setIsOpen, delayDuration]);

  const handleMouseLeave = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }, [setIsOpen]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerProps = {
    ref,
    className,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
    ...props,
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      triggerProps as React.ComponentProps<typeof children>
    );
  }

  return (
    <div data-testid="tooltip-trigger" {...triggerProps}>
      {children}
    </div>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

// Content component
export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?:
      | number
      | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
    arrowPadding?: number;
    sticky?: "partial" | "always";
    hideWhenDetached?: boolean;
    updatePositionStrategy?: "optimized" | "always";
    onPlaced?: () => void;
    forceMount?: boolean;
    showArrow?: boolean;
    className?: string;
  }
>(
  (
    {
      children,
      side = "top",
      sideOffset = 4,
      alignOffset = 0,
      forceMount = false,
      showArrow = false,
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen } = useTooltipContext();

    if (!isOpen && !forceMount) {
      return null;
    }

    const getPositionClasses = () => {
      const baseClasses =
        "fixed z-50 max-w-[280px] rounded-lg border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

      const sideClasses = {
        top: "data-[side=top]:slide-in-from-bottom-2",
        bottom: "data-[side=bottom]:slide-in-from-top-2",
        left: "data-[side=left]:slide-in-from-right-2",
        right: "data-[side=right]:slide-in-from-left-2",
      };

      return cn(baseClasses, sideClasses[side], className);
    };

    return (
      <div
        ref={ref}
        data-testid="tooltip-content"
        data-side={side}
        className={getPositionClasses()}
        style={
          {
            "--side-offset": `${sideOffset}px`,
            "--align-offset": `${alignOffset}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
        {showArrow && (
          <div
            className="absolute w-2 h-2 bg-popover border border-border rotate-45"
            style={{
              [side]: "-4px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          />
        )}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";
