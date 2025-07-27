import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./Command";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Command> = {
  title: "Atoms/Command",
  component: Command,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A command palette component that provides a searchable interface for commands and actions. Includes dialog, input, list, groups, items, and shortcuts.",
      },
    },
    tags: ["autodocs"],
  },
  argTypes: {
    className: {
      control: "text",
      description: "Custom CSS class name",
    },
    disabled: {
      control: "boolean",
      description: "Whether the command component is disabled",
    },
    value: {
      control: "text",
      description: "The value of the command input",
    },
    onValueChange: {
      action: "valueChanged",
      description: "Callback when command value changes",
    },
    shouldFilter: {
      control: "boolean",
      description: "Whether the command should filter items",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the command input",
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

// Basic Command component
export const Default: Story = {
  render: () => (
    <Command className="w-[400px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  ),
};

// Command with groups and items
export const WithGroups: Story = {
  render: () => (
    <Command className="w-[400px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">Calendar</CommandItem>
          <CommandItem value="search">Search</CommandItem>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="new-file">New File</CommandItem>
          <CommandItem value="new-folder">New Folder</CommandItem>
          <CommandItem value="copy">Copy</CommandItem>
          <CommandItem value="paste">Paste</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

// Command with shortcuts
export const WithShortcuts: Story = {
  render: () => (
    <Command className="w-[400px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            Calendar
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem value="search">
            Search
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem value="settings">
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="new-file">
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="new-folder">
            New Folder
            <CommandShortcut>⌘⇧N</CommandShortcut>
          </CommandItem>
          <CommandItem value="copy">
            Copy
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem value="paste">
            Paste
            <CommandShortcut>⌘V</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

// Command with icons
export const WithIcons: Story = {
  render: () => (
    <Command className="w-[400px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Calendar
          </CommandItem>
          <CommandItem value="search">
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </CommandItem>
          <CommandItem value="settings">
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

// Command Dialog
export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Open Command Palette
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="w-full">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandGroup heading="Suggestions">
                <CommandItem value="calendar">Calendar</CommandItem>
                <CommandItem value="search">Search</CommandItem>
                <CommandItem value="settings">Settings</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem value="new-file">New File</CommandItem>
                <CommandItem value="new-folder">New Folder</CommandItem>
                <CommandItem value="copy">Copy</CommandItem>
                <CommandItem value="paste">Paste</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    );
  },
};

// Interactive Command
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState("");

    const items = [
      { value: "calendar", label: "Calendar" },
      { value: "search", label: "Search" },
      { value: "settings", label: "Settings" },
      { value: "new-file", label: "New File" },
      { value: "new-folder", label: "New Folder" },
      { value: "copy", label: "Copy" },
      { value: "paste", label: "Paste" },
    ];

    const filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );

    return (
      <div className="space-y-4">
        <Command className="w-[400px] rounded-lg border shadow-md">
          <CommandInput
            placeholder="Type a command or search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <CommandList>
            {filteredItems.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions">
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(value) => setSelectedValue(value)}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        {selectedValue && (
          <div className="text-sm text-muted-foreground">
            Selected: {selectedValue}
          </div>
        )}
      </div>
    );
  },
};

// Disabled Command
export const Disabled: Story = {
  render: () => (
    <Command className="w-[400px] rounded-lg border shadow-md" disabled>
      <CommandInput placeholder="Type a command or search..." disabled />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar" disabled>
            Calendar
          </CommandItem>
          <CommandItem value="search" disabled>
            Search
          </CommandItem>
          <CommandItem value="settings" disabled>
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <Command className="w-[400px] rounded-lg border shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
      <CommandInput
        placeholder="Type a command or search..."
        className="border-blue-200 focus:border-blue-500"
      />
      <CommandList className="max-h-[200px]">
        <CommandGroup heading="Suggestions">
          <CommandItem
            value="calendar"
            className="hover:bg-blue-100 hover:text-blue-900"
          >
            Calendar
          </CommandItem>
          <CommandItem
            value="search"
            className="hover:bg-purple-100 hover:text-purple-900"
          >
            Search
          </CommandItem>
          <CommandItem
            value="settings"
            className="hover:bg-green-100 hover:text-green-900"
          >
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

// States collection
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Default State</h3>
        <Command className="w-[300px] rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command>
      </div>

      <div>
        <h3 className="font-semibold mb-2">With Items</h3>
        <Command className="w-[300px] rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search">Search</CommandItem>
              <CommandItem value="settings">Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Selected Item</h3>
        <Command className="w-[300px] rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search" selected>
                Search
              </CommandItem>
              <CommandItem value="settings">Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Disabled Item</h3>
        <Command className="w-[300px] rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search">Search</CommandItem>
              <CommandItem value="settings" disabled>
                Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  ),
};

// Accessibility examples
export const AccessibilityExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">With ARIA Labels</h3>
        <Command
          className="w-[400px] rounded-lg border shadow-md"
          aria-label="Command palette"
        >
          <CommandInput
            placeholder="Type a command or search..."
            aria-label="Search commands"
          />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar" aria-label="Open calendar">
                Calendar
              </CommandItem>
              <CommandItem value="search" aria-label="Search files">
                Search
              </CommandItem>
              <CommandItem value="settings" aria-label="Open settings">
                Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div>
        <h3 className="font-semibold mb-2">With Descriptions</h3>
        <Command
          className="w-[400px] rounded-lg border shadow-md"
          aria-describedby="command-description"
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search">Search</CommandItem>
              <CommandItem value="settings">Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <div id="command-description" className="sr-only">
          Use this command palette to quickly access various features and
          actions.
        </div>
      </div>
    </div>
  ),
};
