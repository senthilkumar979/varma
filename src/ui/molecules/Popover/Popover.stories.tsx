import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Popover> = {
  title: "Molecules/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A popover component that displays content in a floating panel. Uses React Context for state management and includes trigger and content components.",
      },
    },
    tags: ["autodocs"],
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the popover is open (controlled)",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback when the popover open state changes",
    },
    modal: {
      control: "boolean",
      description: "Whether the popover is modal",
    },
    defaultOpen: {
      control: "boolean",
      description: "The default open state (uncontrolled)",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Popover (Uncontrolled)
export const Default: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Controlled Popover
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Controlled Popover</h4>
            <p className="text-sm text-muted-foreground">
              This popover is controlled externally.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Popover with form content
export const WithForm: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger>Settings</PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="width" className="text-sm font-medium">
                  Width
                </label>
                <input
                  id="width"
                  defaultValue="100%"
                  className="w-20 rounded border px-2 py-1 text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="height" className="text-sm font-medium">
                  Height
                </label>
                <input
                  id="height"
                  defaultValue="25px"
                  className="w-20 rounded border px-2 py-1 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input id="aspect-ratio" type="checkbox" className="rounded" />
              <label htmlFor="aspect-ratio" className="text-sm font-medium">
                Lock aspect ratio
              </label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Popover with different alignments
export const Alignments: Story = {
  render: () => {
    return (
      <div className="flex space-x-4">
        <Popover>
          <PopoverTrigger>Start Aligned</PopoverTrigger>
          <PopoverContent align="start" className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Start Aligned</h4>
              <p className="text-sm text-muted-foreground">
                This popover is aligned to the start.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>Center Aligned</PopoverTrigger>
          <PopoverContent align="center" className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Center Aligned</h4>
              <p className="text-sm text-muted-foreground">
                This popover is aligned to the center.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>End Aligned</PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">End Aligned</h4>
              <p className="text-sm text-muted-foreground">
                This popover is aligned to the end.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

// Popover with different sides
export const Sides: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger>Top Side</PopoverTrigger>
            <PopoverContent side="top" className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Top Side</h4>
                <p className="text-sm text-muted-foreground">
                  This popover appears on top.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger>Right Side</PopoverTrigger>
            <PopoverContent side="right" className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Right Side</h4>
                <p className="text-sm text-muted-foreground">
                  This popover appears on the right.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger>Bottom Side</PopoverTrigger>
            <PopoverContent side="bottom" className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Bottom Side</h4>
                <p className="text-sm text-muted-foreground">
                  This popover appears on the bottom.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger>Left Side</PopoverTrigger>
            <PopoverContent side="left" className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Left Side</h4>
                <p className="text-sm text-muted-foreground">
                  This popover appears on the left.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

// Popover with custom offset
export const CustomOffset: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger>Custom Offset</PopoverTrigger>
        <PopoverContent sideOffset={20} className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Custom Offset</h4>
            <p className="text-sm text-muted-foreground">
              This popover has a custom side offset of 20px.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Popover with default open state
export const DefaultOpen: Story = {
  render: () => {
    return (
      <Popover defaultOpen={true}>
        <PopoverTrigger>Default Open</PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Default Open</h4>
            <p className="text-sm text-muted-foreground">
              This popover starts in an open state.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Popover with rich content
export const RichContent: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger>Rich Content</PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">User Profile</h4>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent">
                  Profile Settings
                </button>
                <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent">
                  Account Security
                </button>
                <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent">
                  Billing Information
                </button>
                <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent text-destructive">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Disabled Popover
export const Disabled: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger disabled>Disabled Popover</PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Disabled</h4>
            <p className="text-sm text-muted-foreground">
              This popover trigger is disabled.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Custom styling
export const CustomStyling: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600">
          Custom Styled
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-blue-900">
              Custom Styled
            </h4>
            <p className="text-sm text-blue-700">
              This popover has custom gradient styling.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// States collection
export const States: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Default State</h3>
          <Popover>
            <PopoverTrigger>Default</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Default</h4>
                <p className="text-sm text-muted-foreground">
                  Default popover state.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Default Open State</h3>
          <Popover defaultOpen={true}>
            <PopoverTrigger>Default Open</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Default Open</h4>
                <p className="text-sm text-muted-foreground">
                  This popover starts in an open state.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Disabled State</h3>
          <Popover>
            <PopoverTrigger disabled>Disabled</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Disabled</h4>
                <p className="text-sm text-muted-foreground">
                  This trigger is disabled.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

// Accessibility examples
export const AccessibilityExamples: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">With ARIA Labels</h3>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger aria-label="Open user menu">
              User Menu
            </PopoverTrigger>
            <PopoverContent aria-label="User menu options">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">User Menu</h4>
                <p className="text-sm text-muted-foreground">
                  Access your account settings and preferences.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="font-semibold mb-2">With Descriptions</h3>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger aria-describedby="popover-description">
              Settings
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure your application settings.
                </p>
              </div>
            </PopoverContent>
          </Popover>
          <div id="popover-description" className="sr-only">
            Click to open the settings popover menu.
          </div>
        </div>
      </div>
    );
  },
};
