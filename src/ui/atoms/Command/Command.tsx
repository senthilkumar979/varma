import * as React from "react";
import { cn } from "@/utils/tw-utils";
import type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandSeparatorProps,
  CommandItemProps,
  CommandShortcutProps,
} from "./Command.types";

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, children, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="command"
        data-testid="command"
        data-disabled={disabled}
        className={cn(
          "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Command.displayName = "Command";

const CommandDialog = React.forwardRef<HTMLDivElement, CommandDialogProps>(
  (
    {
      className,
      title = "Command Palette",
      description = "Search for a command to run...",
      children,
      open,

      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(open ?? false);

    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    // handleOpenChange is available for future use
    // const handleOpenChange = (newOpen: boolean) => {
    //   setIsOpen(newOpen);
    //   onOpenChange?.(newOpen);
    // };

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        data-slot="command-dialog"
        data-testid="command-dialog"
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
          <div className="sr-only">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {children}
        </div>
      </div>
    );
  }
);

CommandDialog.displayName = "CommandDialog";

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, placeholder = "Search...", ...props }, ref) => {
    return (
      <div
        data-slot="command-input-wrapper"
        data-testid="command-input-wrapper"
        className="flex h-9 items-center gap-2 border-b px-3"
      >
        <svg
          className="size-4 shrink-0 opacity-50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={ref}
          data-slot="command-input"
          data-testid="command-input"
          type="text"
          placeholder={placeholder}
          className={cn(
            "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CommandInput.displayName = "CommandInput";

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, maxHeight = "300px", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="command-list"
        data-testid="command-list"
        className={cn(
          "scroll-py-1 overflow-x-hidden overflow-y-auto",
          className
        )}
        style={{ maxHeight }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandList.displayName = "CommandList";

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children = "No results found.", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="command-empty"
        data-testid="command-empty"
        className={cn("py-6 text-center text-sm", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandEmpty.displayName = "CommandEmpty";

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="command-group"
        data-testid="command-group"
        className={cn("text-foreground overflow-hidden p-1", className)}
        {...props}
      >
        {heading && (
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CommandGroup.displayName = "CommandGroup";

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="command-separator"
      data-testid="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
});

CommandSeparator.displayName = "CommandSeparator";

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  (
    { className, value, disabled, selected, onSelect, children, ...props },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && onSelect && value) {
        onSelect(value);
      }
    };

    return (
      <div
        ref={ref}
        data-slot="command-item"
        data-testid="command-item"
        data-selected={selected}
        data-disabled={disabled}
        className={cn(
          "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none",
          selected && "bg-accent text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          !disabled && "hover:bg-accent hover:text-accent-foreground",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandItem.displayName = "CommandItem";

const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="command-shortcut"
        data-testid="command-shortcut"
        className={cn(
          "text-muted-foreground ml-auto text-xs tracking-widest",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
