import * as React from "react";

export interface DialogProps extends React.ComponentProps<"div"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
}

export interface DialogTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

export interface DialogPortalProps extends React.ComponentProps<"div"> {
  container?: HTMLElement;
}

export interface DialogCloseProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

export interface DialogOverlayProps extends React.ComponentProps<"div"> {
  className?: string;
}

export interface DialogContentProps extends React.ComponentProps<"div"> {
  className?: string;
  children?: React.ReactNode;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  onInteractOutside?: (event: Event) => void;
  forceMount?: boolean;
}

export interface DialogHeaderProps extends React.ComponentProps<"div"> {
  className?: string;
}

export interface DialogFooterProps extends React.ComponentProps<"div"> {
  className?: string;
}

export interface DialogTitleProps extends React.ComponentProps<"div"> {
  className?: string;
}

export interface DialogDescriptionProps extends React.ComponentProps<"div"> {
  className?: string;
}

// Event types for content props
export interface PointerDownOutsideEvent extends Event {
  target: Element;
}
