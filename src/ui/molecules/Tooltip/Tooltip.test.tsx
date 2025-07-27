import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index";

// Helper to wait for tooltip to appear
const waitForTooltip = async () => {
  await waitFor(() => {
    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
  }, { timeout: 1000 });
};

describe("Tooltip", () => {
  const renderTooltip = (children: React.ReactNode) => {
    return render(
      <TooltipProvider>
        {children}
      </TooltipProvider>
    );
  };

  it("renders trigger but not content initially", () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
    expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
  });

  it("shows content on hover", async () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByTestId("tooltip-trigger"));
    await waitForTooltip();
    expect(screen.getByTestId("tooltip-content")).toHaveTextContent("Tooltip content");
  });

  it("hides content on mouse leave", async () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByTestId("tooltip-trigger"));
    await waitForTooltip();
    
    fireEvent.mouseLeave(screen.getByTestId("tooltip-trigger"));
    await waitFor(() => {
      expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
    });
  });

  it("supports different sides", async () => {
    const sides = ["top", "right", "bottom", "left"] as const;
    
    for (const side of sides) {
      const { unmount } = renderTooltip(
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent side={side}>Tooltip {side}</TooltipContent>
        </Tooltip>
      );
      
      fireEvent.mouseEnter(screen.getByTestId("tooltip-trigger"));
      await waitForTooltip();
      expect(screen.getByTestId("tooltip-content")).toHaveAttribute("data-side", side);
      
      // Clean up
      fireEvent.mouseLeave(screen.getByTestId("tooltip-trigger"));
      await waitFor(() => {
        expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
      });
      
      unmount();
    }
  });

  it("shows arrow when showArrow is true", async () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent showArrow>Tooltip with arrow</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByTestId("tooltip-trigger"));
    await waitForTooltip();
    
    const tooltipContent = screen.getByTestId("tooltip-content");
    expect(tooltipContent.querySelector(".absolute.w-2.h-2")).toBeInTheDocument();
  });

  it("does not show arrow when showArrow is false", async () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip without arrow</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByTestId("tooltip-trigger"));
    await waitForTooltip();
    
    const tooltipContent = screen.getByTestId("tooltip-content");
    expect(tooltipContent.querySelector(".absolute.w-2.h-2")).not.toBeInTheDocument();
  });

  it("supports controlled state", async () => {
    const onOpenChange = vi.fn();
    
    renderTooltip(
      <Tooltip open={true} onOpenChange={onOpenChange}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Controlled tooltip</TooltipContent>
      </Tooltip>
    );
    
    // Content should be visible immediately when open is true
    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
  });

  it("forwards ref to TooltipTrigger", () => {
    const ref = React.createRef<HTMLDivElement>();
    
    renderTooltip(
      <Tooltip>
        <TooltipTrigger ref={ref}>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref to TooltipContent", async () => {
    const ref = React.createRef<HTMLDivElement>();
    
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent ref={ref}>Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByTestId("tooltip-trigger"));
    await waitForTooltip();
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className to TooltipContent", async () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent className="custom-class">Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByTestId("tooltip-trigger"));
    await waitForTooltip();
    
    expect(screen.getByTestId("tooltip-content")).toHaveClass("custom-class");
  });

  it("supports keyboard navigation", async () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.focus(screen.getByTestId("tooltip-trigger"));
    await waitForTooltip();
    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
    
    fireEvent.blur(screen.getByTestId("tooltip-trigger"));
    await waitFor(() => {
      expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
    });
  });

  it("supports asChild prop with button", async () => {
    renderTooltip(
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Button with tooltip</button>
        </TooltipTrigger>
        <TooltipContent>Button tooltip</TooltipContent>
      </Tooltip>
    );
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    
    fireEvent.mouseEnter(button);
    await waitForTooltip();
    expect(screen.getByTestId("tooltip-content")).toHaveTextContent("Button tooltip");
  });

  it("calls onClick on trigger if provided", async () => {
    const handleClick = vi.fn();
    
    renderTooltip(
      <Tooltip>
        <TooltipTrigger onClick={handleClick}>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );
    
    fireEvent.click(screen.getByTestId("tooltip-trigger"));
    expect(handleClick).toHaveBeenCalled();
  });
});
