import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Tooltip> = {
  title: "Molecules/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Tooltip component for showing additional information on hover. Supports different sides, arrows, and custom content.",
      },
    },
    tags: ["autodocs"],
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover for tooltip with arrow</TooltipTrigger>
      <TooltipContent showArrow>Tooltip with arrow</TooltipContent>
    </Tooltip>
  ),
};

export const DifferentSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center">
      <Tooltip>
        <TooltipTrigger>Top</TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Right</TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Bottom</TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Left</TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover for rich content</TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Rich Tooltip</div>
          <div className="text-xs text-muted-foreground">
            This tooltip contains multiple elements
          </div>
          <div className="flex gap-1">
            <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
              Tag 1
            </span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
              Tag 2
            </span>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger>Controlled tooltip</TooltipTrigger>
        <TooltipContent>This tooltip is controlled by state</TooltipContent>
      </Tooltip>
    );
  },
};

export const WithButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="btn btn-primary">Button with tooltip</button>
      </TooltipTrigger>
      <TooltipContent>This button has a tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover for long content</TooltipTrigger>
      <TooltipContent>
        This is a very long tooltip that demonstrates how the component handles
        content that exceeds the typical width. It should wrap appropriately and
        maintain good readability.
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <Tooltip delayDuration={2000}>
      <TooltipTrigger>Hover me (2s delay)</TooltipTrigger>
      <TooltipContent>This tooltip has a 2-second delay</TooltipContent>
    </Tooltip>
  ),
};
