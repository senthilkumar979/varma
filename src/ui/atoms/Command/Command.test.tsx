import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
import type { CommandProps } from "./Command.types";

const defaultProps: CommandProps = {
  children: "Test command",
};

describe("Command", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Command {...defaultProps} />);
      const command = screen.getByTestId("command");
      expect(command).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Command {...defaultProps} className="custom-class" />);
      const command = screen.getByTestId("command");
      expect(command).toHaveClass("custom-class");
    });

    it("renders children correctly", () => {
      render(<Command>Test content</Command>);
      const command = screen.getByTestId("command");
      expect(command).toHaveTextContent("Test content");
    });
  });

  describe("States", () => {
    it("renders disabled state", () => {
      render(<Command {...defaultProps} disabled />);
      const command = screen.getByTestId("command");
      expect(command).toHaveAttribute("data-disabled", "true");
    });

    it("applies disabled styles", () => {
      render(<Command {...defaultProps} disabled />);
      const command = screen.getByTestId("command");
      expect(command).toHaveClass("opacity-50", "pointer-events-none");
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<Command {...defaultProps} />);
      const command = screen.getByTestId("command");
      expect(command).toHaveClass(
        "bg-popover",
        "text-popover-foreground",
        "flex",
        "h-full",
        "w-full",
        "flex-col",
        "overflow-hidden",
        "rounded-md"
      );
    });

    it("applies theme-aware classes", () => {
      render(<Command {...defaultProps} />);
      const command = screen.getByTestId("command");
      expect(command).toHaveClass("bg-popover", "text-popover-foreground");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Command {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});

describe("CommandDialog", () => {
  describe("Rendering", () => {
    it("renders when open", () => {
      render(
        <CommandDialog open={true}>
          <div>Dialog content</div>
        </CommandDialog>
      );
      const dialog = screen.getByTestId("command-dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      render(
        <CommandDialog open={false}>
          <div>Dialog content</div>
        </CommandDialog>
      );
      const dialog = screen.queryByTestId("command-dialog");
      expect(dialog).not.toBeInTheDocument();
    });

    it("renders with custom title and description", () => {
      render(
        <CommandDialog
          open={true}
          title="Custom Title"
          description="Custom Description"
        >
          <div>Dialog content</div>
        </CommandDialog>
      );
      const dialog = screen.getByTestId("command-dialog");
      expect(dialog).toBeInTheDocument();
      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.getByText("Custom Description")).toBeInTheDocument();
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(
        <CommandDialog open={true}>
          <div>Dialog content</div>
        </CommandDialog>
      );
      const dialog = screen.getByTestId("command-dialog");
      expect(dialog).toHaveClass(
        "fixed",
        "inset-0",
        "z-50",
        "flex",
        "items-center",
        "justify-center",
        "bg-background/80",
        "backdrop-blur-sm"
      );
    });
  });
});

describe("CommandInput", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<CommandInput />);
      const input = screen.getByTestId("command-input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("renders with custom placeholder", () => {
      render(<CommandInput placeholder="Custom placeholder" />);
      const input = screen.getByTestId("command-input");
      expect(input).toHaveAttribute("placeholder", "Custom placeholder");
    });

    it("renders search icon", () => {
      render(<CommandInput />);
      const wrapper = screen.getByTestId("command-input-wrapper");
      const svg = wrapper.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onChange when input changes", () => {
      const handleChange = vi.fn();
      render(<CommandInput onChange={handleChange} />);
      const input = screen.getByTestId("command-input");
      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus when focused", () => {
      const handleFocus = vi.fn();
      render(<CommandInput onFocus={handleFocus} />);
      const input = screen.getByTestId("command-input");
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when blurred", () => {
      const handleBlur = vi.fn();
      render(<CommandInput onBlur={handleBlur} />);
      const input = screen.getByTestId("command-input");
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("States", () => {
    it("renders disabled state", () => {
      render(<CommandInput disabled />);
      const input = screen.getByTestId("command-input");
      expect(input).toBeDisabled();
    });

    it("applies disabled styles", () => {
      render(<CommandInput disabled />);
      const input = screen.getByTestId("command-input");
      expect(input).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<CommandInput />);
      const input = screen.getByTestId("command-input");
      expect(input).toHaveClass(
        "placeholder:text-muted-foreground",
        "flex",
        "h-10",
        "w-full",
        "rounded-md",
        "bg-transparent",
        "py-3",
        "text-sm",
        "outline-none"
      );
    });
  });
});

describe("CommandList", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<CommandList>List content</CommandList>);
      const list = screen.getByTestId("command-list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveTextContent("List content");
    });

    it("renders with custom maxHeight", () => {
      render(<CommandList maxHeight="200px">List content</CommandList>);
      const list = screen.getByTestId("command-list");
      expect(list.style.maxHeight).toBe("200px");
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<CommandList>List content</CommandList>);
      const list = screen.getByTestId("command-list");
      expect(list).toHaveClass(
        "scroll-py-1",
        "overflow-x-hidden",
        "overflow-y-auto"
      );
    });
  });
});

describe("CommandEmpty", () => {
  describe("Rendering", () => {
    it("renders with default message", () => {
      render(<CommandEmpty />);
      const empty = screen.getByTestId("command-empty");
      expect(empty).toBeInTheDocument();
      expect(empty).toHaveTextContent("No results found.");
    });

    it("renders with custom message", () => {
      render(<CommandEmpty>Custom empty message</CommandEmpty>);
      const empty = screen.getByTestId("command-empty");
      expect(empty).toHaveTextContent("Custom empty message");
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<CommandEmpty />);
      const empty = screen.getByTestId("command-empty");
      expect(empty).toHaveClass("py-6", "text-center", "text-sm");
    });
  });
});

describe("CommandGroup", () => {
  describe("Rendering", () => {
    it("renders without heading", () => {
      render(<CommandGroup>Group content</CommandGroup>);
      const group = screen.getByTestId("command-group");
      expect(group).toBeInTheDocument();
      expect(group).toHaveTextContent("Group content");
    });

    it("renders with heading", () => {
      render(<CommandGroup heading="Test Heading">Group content</CommandGroup>);
      const group = screen.getByTestId("command-group");
      expect(group).toBeInTheDocument();
      expect(group).toHaveTextContent("Test Heading");
      expect(group).toHaveTextContent("Group content");
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<CommandGroup>Group content</CommandGroup>);
      const group = screen.getByTestId("command-group");
      expect(group).toHaveClass("text-foreground", "overflow-hidden", "p-1");
    });

    it("applies heading styles", () => {
      render(<CommandGroup heading="Test Heading">Group content</CommandGroup>);
      const heading = screen.getByText("Test Heading");
      expect(heading).toHaveClass(
        "px-2",
        "py-1.5",
        "text-xs",
        "font-medium",
        "text-muted-foreground"
      );
    });
  });
});

describe("CommandSeparator", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<CommandSeparator />);
      const separator = screen.getByTestId("command-separator");
      expect(separator).toBeInTheDocument();
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<CommandSeparator />);
      const separator = screen.getByTestId("command-separator");
      expect(separator).toHaveClass("bg-border", "-mx-1", "h-px");
    });
  });
});

describe("CommandItem", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<CommandItem value="test">Test item</CommandItem>);
      const item = screen.getByTestId("command-item");
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent("Test item");
    });

    it("renders with custom value", () => {
      render(<CommandItem value="custom-value">Test item</CommandItem>);
      const item = screen.getByTestId("command-item");
      expect(item).toHaveAttribute("data-testid", "command-item");
    });
  });

  describe("States", () => {
    it("renders selected state", () => {
      render(
        <CommandItem value="test" selected>
          Test item
        </CommandItem>
      );
      const item = screen.getByTestId("command-item");
      expect(item).toHaveAttribute("data-selected", "true");
    });

    it("renders disabled state", () => {
      render(
        <CommandItem value="test" disabled>
          Test item
        </CommandItem>
      );
      const item = screen.getByTestId("command-item");
      expect(item).toHaveAttribute("data-disabled", "true");
    });

    it("applies selected styles", () => {
      render(
        <CommandItem value="test" selected>
          Test item
        </CommandItem>
      );
      const item = screen.getByTestId("command-item");
      expect(item).toHaveClass("bg-accent", "text-accent-foreground");
    });

    it("applies disabled styles", () => {
      render(
        <CommandItem value="test" disabled>
          Test item
        </CommandItem>
      );
      const item = screen.getByTestId("command-item");
      expect(item).toHaveClass("pointer-events-none", "opacity-50");
    });
  });

  describe("Interactions", () => {
    it("calls onSelect when clicked", () => {
      const handleSelect = vi.fn();
      render(
        <CommandItem value="test" onSelect={handleSelect}>
          Test item
        </CommandItem>
      );
      const item = screen.getByTestId("command-item");
      fireEvent.click(item);
      expect(handleSelect).toHaveBeenCalledWith("test");
    });

    it("does not call onSelect when disabled", () => {
      const handleSelect = vi.fn();
      render(
        <CommandItem value="test" disabled onSelect={handleSelect}>
          Test item
        </CommandItem>
      );
      const item = screen.getByTestId("command-item");
      fireEvent.click(item);
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it("does not call onSelect when no value", () => {
      const handleSelect = vi.fn();
      render(<CommandItem onSelect={handleSelect}>Test item</CommandItem>);
      const item = screen.getByTestId("command-item");
      fireEvent.click(item);
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<CommandItem value="test">Test item</CommandItem>);
      const item = screen.getByTestId("command-item");
      expect(item).toHaveClass(
        "relative",
        "flex",
        "cursor-default",
        "items-center",
        "gap-2",
        "rounded-sm",
        "px-2",
        "py-1.5",
        "text-sm",
        "outline-none",
        "select-none"
      );
    });

    it("applies hover styles when not disabled", () => {
      render(<CommandItem value="test">Test item</CommandItem>);
      const item = screen.getByTestId("command-item");
      expect(item).toHaveClass(
        "hover:bg-accent",
        "hover:text-accent-foreground"
      );
    });
  });
});

describe("CommandShortcut", () => {
  describe("Rendering", () => {
    it("renders with children", () => {
      render(<CommandShortcut>⌘K</CommandShortcut>);
      const shortcut = screen.getByTestId("command-shortcut");
      expect(shortcut).toBeInTheDocument();
      expect(shortcut).toHaveTextContent("⌘K");
    });
  });

  describe("Styling and Classes", () => {
    it("applies base classes correctly", () => {
      render(<CommandShortcut>⌘K</CommandShortcut>);
      const shortcut = screen.getByTestId("command-shortcut");
      expect(shortcut).toHaveClass(
        "text-muted-foreground",
        "ml-auto",
        "text-xs",
        "tracking-widest"
      );
    });
  });
});

describe("Integration", () => {
  it("renders complete command palette", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem value="calendar">Calendar</CommandItem>
            <CommandItem value="search">Search</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="new-file">New File</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByTestId("command")).toBeInTheDocument();
    expect(screen.getByTestId("command-input")).toBeInTheDocument();
    expect(screen.getByTestId("command-list")).toBeInTheDocument();
    expect(screen.getByText("Suggestions")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("New File")).toBeInTheDocument();
  });

  it("handles item selection", () => {
    const handleSelect = vi.fn();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem value="calendar" onSelect={handleSelect}>
              Calendar
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const item = screen.getByText("Calendar");
    fireEvent.click(item);
    expect(handleSelect).toHaveBeenCalledWith("calendar");
  });
});
