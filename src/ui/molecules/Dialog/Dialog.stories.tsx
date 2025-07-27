import type { Meta, StoryObj } from "@storybook/react-vite";
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
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Dialog> = {
  title: "Molecules/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Dialog component for modals and overlays. Supports header/footer, title/description, and custom content.",
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
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Default Dialog</DialogTitle>
          <DialogDescription>This is a default dialog.</DialogDescription>
        </DialogHeader>
        <div className="py-4">Dialog body content goes here.</div>
        <DialogFooter>
          <DialogClose className="btn btn-primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithHeaderFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog with Header & Footer</DialogTitle>
        </DialogHeader>
        <div className="py-4">Main content in the dialog.</div>
        <DialogFooter>
          <button className="btn btn-secondary">Cancel</button>
          <DialogClose className="btn btn-primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Show Custom Dialog</DialogTrigger>
      <DialogContent>
        <div className="p-6 flex flex-col items-center">
          <span className="text-2xl">🎉</span>
          <p className="mt-4">Custom content inside the dialog!</p>
          <DialogClose className="mt-6 btn btn-primary">Close</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const WithTitleDescription: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open Info Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Info Dialog</DialogTitle>
          <DialogDescription>
            More information about this dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">Some informational content.</div>
        <DialogFooter>
          <DialogClose className="btn btn-primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Controlled Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog is controlled by state.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">Controlled content.</div>
          <DialogFooter>
            <button
              className="btn btn-secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <DialogClose className="btn btn-primary">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn btn-primary">Button with Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Button Dialog</DialogTitle>
        </DialogHeader>
        <div className="py-4">This dialog was opened from a button.</div>
        <DialogFooter>
          <DialogClose className="btn btn-primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open Long Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Long Content Dialog</DialogTitle>
        </DialogHeader>
        <div className="py-4 max-h-96 overflow-y-auto">
          <p className="mb-4">
            This dialog contains a lot of content to demonstrate scrolling
            behavior.
          </p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="mb-2">
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose className="btn btn-primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog without Close Button</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          This dialog doesn't have the default close button in the top-right
          corner.
        </div>
        <DialogFooter>
          <DialogClose className="btn btn-primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
