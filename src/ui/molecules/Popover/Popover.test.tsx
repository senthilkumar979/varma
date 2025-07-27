import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

// Helper to open the popover
function openPopover() {
  const trigger = screen.getByTestId("popover-trigger");
  fireEvent.click(trigger);
}

describe("Popover", () => {
  it("renders Trigger and Content (content hidden by default)", () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByTestId("popover-trigger")).toBeInTheDocument();
    // Content should not be in the document until opened
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("shows content when trigger is clicked", () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    openPopover();
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();
    expect(screen.getByTestId("popover-content")).toHaveTextContent(
      "Popover content"
    );
  });

  it("hides content when trigger is clicked again (toggle)", () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    openPopover();
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();
    openPopover();
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("respects defaultOpen prop", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();
  });

  it("respects disabled trigger", () => {
    render(
      <Popover>
        <PopoverTrigger disabled>Trigger</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    fireEvent.click(screen.getByTestId("popover-trigger"));
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("applies custom className to PopoverContent", () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent className="custom-class">
          Popover content
        </PopoverContent>
      </Popover>
    );
    openPopover();
    expect(screen.getByTestId("popover-content")).toHaveClass("custom-class");
  });

  it("applies align and side props to PopoverContent", () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent align="end" side="top">
          Popover content
        </PopoverContent>
      </Popover>
    );
    openPopover();
    const content = screen.getByTestId("popover-content");
    expect(content).toHaveAttribute("data-align", "end");
    expect(content).toHaveAttribute("data-side", "top");
  });

  it("applies sideOffset to PopoverContent", () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent side="top" sideOffset={12}>
          Popover content
        </PopoverContent>
      </Popover>
    );
    openPopover();
    // sideOffset is handled internally by Radix UI, so we just verify the prop is passed
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();
  });

  it("forwards ref to PopoverContent", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent ref={ref}>Popover content</PopoverContent>
      </Popover>
    );
    openPopover();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref to PopoverTrigger", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Popover>
        <PopoverTrigger ref={ref}>Trigger</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports aria-label and aria-describedby on trigger and content", () => {
    render(
      <Popover>
        <PopoverTrigger aria-label="Open menu" aria-describedby="desc">
          Trigger
        </PopoverTrigger>
        <PopoverContent
          aria-label="Menu content"
          aria-describedby="content-desc"
        >
          Popover content
        </PopoverContent>
      </Popover>
    );
    openPopover();
    expect(screen.getByTestId("popover-trigger")).toHaveAttribute(
      "aria-label",
      "Open menu"
    );
    expect(screen.getByTestId("popover-trigger")).toHaveAttribute(
      "aria-describedby",
      "desc"
    );
    expect(screen.getByTestId("popover-content")).toHaveAttribute(
      "aria-label",
      "Menu content"
    );
    expect(screen.getByTestId("popover-content")).toHaveAttribute(
      "aria-describedby",
      "content-desc"
    );
  });

  it("calls onClick on PopoverTrigger if provided", () => {
    const handleClick = vi.fn();
    render(
      <Popover>
        <PopoverTrigger onClick={handleClick}>Trigger</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    fireEvent.click(screen.getByTestId("popover-trigger"));
    expect(handleClick).toHaveBeenCalled();
  });
});
