import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./index";

// Helper to wait for dialog to appear
const waitForDialog = async () => {
  await waitFor(
    () => {
      expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    },
    { timeout: 1000 }
  );
};

describe("Dialog", () => {
  it("renders trigger but not content initially", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog content</DialogContent>
      </Dialog>
    );

    expect(screen.getByTestId("dialog-trigger")).toBeInTheDocument();
    expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument();
  });

  it("shows content when trigger is clicked", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();
    expect(screen.getByTestId("dialog-content")).toHaveTextContent(
      "Dialog content"
    );
  });

  it("hides content when close button is clicked", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <div>Dialog body</div>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("dialog-close"));
    await waitFor(() => {
      expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument();
    });
  });

  it("renders header, footer, title, and description", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <div>Body</div>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();

    expect(screen.getByTestId("dialog-title")).toHaveTextContent("Title");
    expect(screen.getByTestId("dialog-description")).toHaveTextContent(
      "Description"
    );
    expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-footer")).toBeInTheDocument();
  });

  it("supports controlled state", async () => {
    const onOpenChange = vi.fn();

    render(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Controlled dialog</DialogContent>
      </Dialog>
    );

    // Content should be visible immediately when open is true
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
  });

  it("supports uncontrolled state", async () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Uncontrolled dialog</DialogContent>
      </Dialog>
    );

    // Content should be visible immediately when defaultOpen is true
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
  });

  it("applies custom className to DialogContent", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent className="custom-class">Content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();
    expect(screen.getByTestId("dialog-content")).toHaveClass("custom-class");
  });

  it("forwards ref to DialogContent", async () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent ref={ref}>Content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref to DialogTrigger", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <Dialog>
        <DialogTrigger ref={ref}>Open Dialog</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports asChild prop with button", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Button with dialog</button>
        </DialogTrigger>
        <DialogContent>Button dialog</DialogContent>
      </Dialog>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    await waitForDialog();
    expect(screen.getByTestId("dialog-content")).toHaveTextContent(
      "Button dialog"
    );
  });

  it("calls onClick on trigger if provided", async () => {
    const handleClick = vi.fn();

    render(
      <Dialog>
        <DialogTrigger onClick={handleClick}>Open Dialog</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("supports keyboard navigation (Escape key)", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument();
    });
  });

  it("supports aria attributes", async () => {
    render(
      <Dialog>
        <DialogTrigger aria-label="Open dialog" aria-describedby="desc">
          Open
        </DialogTrigger>
        <DialogContent
          aria-label="Dialog content"
          aria-describedby="content-desc"
        >
          Content
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();

    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute(
      "aria-label",
      "Open dialog"
    );
    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute(
      "aria-describedby",
      "desc"
    );
    expect(screen.getByTestId("dialog-content")).toHaveAttribute(
      "aria-label",
      "Dialog content"
    );
    expect(screen.getByTestId("dialog-content")).toHaveAttribute(
      "aria-describedby",
      "content-desc"
    );
  });

  it("renders overlay when dialog is open", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();

    expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
  });

  it("renders close button in top-right corner", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    await waitForDialog();

    // The close button should be present (it's part of DialogContent by default)
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
