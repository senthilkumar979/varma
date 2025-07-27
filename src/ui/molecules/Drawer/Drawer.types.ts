import * as React from "react";

export type DrawerProps = React.ComponentProps<"div">
export type DrawerTriggerProps = React.ComponentProps<"button">
export type DrawerPortalProps = React.ComponentProps<"div">
export type DrawerCloseProps = React.ComponentProps<"button">
export interface DrawerOverlayProps extends React.ComponentProps<"div"> {
  className?: string;
}
export interface DrawerContentProps extends React.ComponentProps<"div"> {
  className?: string;
  children?: React.ReactNode;
}
export interface DrawerHeaderProps extends React.ComponentProps<"div"> {
  className?: string;
}
export interface DrawerFooterProps extends React.ComponentProps<"div"> {
  className?: string;
}
export interface DrawerTitleProps extends React.ComponentProps<"div"> {
  className?: string;
}
export interface DrawerDescriptionProps extends React.ComponentProps<"div"> {
  className?: string;
}
