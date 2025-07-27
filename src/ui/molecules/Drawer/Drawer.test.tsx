import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./index";

function openDrawer() {
  fireEvent.click(screen.getByTestId("drawer-trigger"));
}

describe("Drawer", () => {
  it("renders trigger and content (content hidden by default)", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    );
    expect(screen.getByTestId("drawer-trigger")).toBeInTheDocument();
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("shows content when trigger is clicked", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>Drawer content</DrawerContent>
      </Drawer>
    );
    openDrawer();
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-content")).toHaveTextContent(
      "Drawer content"
    );
  });

  it("hides content when DrawerClose is clicked", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <div>Drawer body</div>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    );
    openDrawer();
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("drawer-close"));
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("renders header, footer, title, and description", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          <div>Body</div>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    openDrawer();
    expect(screen.getByTestId("drawer-title")).toHaveTextContent("Title");
    expect(screen.getByTestId("drawer-description")).toHaveTextContent(
      "Description"
    );
    expect(screen.getByTestId("drawer-header")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-footer")).toBeInTheDocument();
  });

  it("supports directions (left, right, top, bottom)", () => {
    const directions = ["left", "right", "top", "bottom"] as const;

    for (const direction of directions) {
      const { unmount } = render(
        <Drawer direction={direction}>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>Drawer {direction}</DrawerContent>
        </Drawer>
      );

      // Use getAllByTestId to get the first trigger (the one we want)
      const triggers = screen.getAllByTestId("drawer-trigger");
      fireEvent.click(triggers[0]);

      expect(screen.getByTestId("drawer-content")).toBeInTheDocument();

      // Clean up for next direction
      unmount();
    }
  });

  it("applies custom className to DrawerContent", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent className="custom-class">Content</DrawerContent>
      </Drawer>
    );
    openDrawer();
    expect(screen.getByTestId("drawer-content")).toHaveClass("custom-class");
  });

  it("forwards ref to DrawerContent", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent ref={ref}>Content</DrawerContent>
      </Drawer>
    );
    openDrawer();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref to DrawerTrigger", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Drawer>
        <DrawerTrigger ref={ref}>Open</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports aria-label and aria-describedby on trigger and content", () => {
    render(
      <Drawer>
        <DrawerTrigger aria-label="Open drawer" aria-describedby="desc">
          Open
        </DrawerTrigger>
        <DrawerContent
          aria-label="Drawer content"
          aria-describedby="content-desc"
        >
          Content
        </DrawerContent>
      </Drawer>
    );
    openDrawer();
    expect(screen.getByTestId("drawer-trigger")).toHaveAttribute(
      "aria-label",
      "Open drawer"
    );
    expect(screen.getByTestId("drawer-trigger")).toHaveAttribute(
      "aria-describedby",
      "desc"
    );
    expect(screen.getByTestId("drawer-content")).toHaveAttribute(
      "aria-label",
      "Drawer content"
    );
    expect(screen.getByTestId("drawer-content")).toHaveAttribute(
      "aria-describedby",
      "content-desc"
    );
  });

  it("calls onClick on DrawerTrigger if provided", () => {
    const handleClick = vi.fn();
    render(
      <Drawer>
        <DrawerTrigger onClick={handleClick}>Open</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    );
    fireEvent.click(screen.getByTestId("drawer-trigger"));
    expect(handleClick).toHaveBeenCalled();
  });
});
