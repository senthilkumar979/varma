import { ThemeToggle } from "@/components/ThemeToggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

const meta: Meta<typeof Drawer> = {
  title: "Molecules/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Drawer component for modals, sidebars, and bottom/top sheets. Supports directions, header/footer, title/description, and custom content.",
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
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Default Drawer</DrawerTitle>
          <DrawerDescription>This is a default drawer.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Drawer body content goes here.</div>
        <DrawerFooter>
          <DrawerClose className="btn btn-primary">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithHeaderFooter: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer with Header & Footer</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">Main content in the drawer.</div>
        <DrawerFooter>
          <button className="btn btn-secondary">Cancel</button>
          <DrawerClose className="btn btn-primary">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>Show Custom Drawer</DrawerTrigger>
      <DrawerContent>
        <div className="p-6 flex flex-col items-center">
          <span className="text-2xl">🎉</span>
          <p className="mt-4">Custom content inside the drawer!</p>
          <DrawerClose className="mt-6 btn btn-primary">Close</DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithTitleDescription: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>Open Info Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Info Drawer</DrawerTitle>
          <DrawerDescription>
            More information about this drawer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Some informational content.</div>
        <DrawerFooter>
          <DrawerClose className="btn btn-primary">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Directions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["left", "right", "top", "bottom"] as const).map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger>
            Open {direction.charAt(0).toUpperCase() + direction.slice(1)} Drawer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {direction.charAt(0).toUpperCase() + direction.slice(1)} Drawer
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4">Drawer from the {direction}.</div>
            <DrawerFooter>
              <DrawerClose className="btn btn-primary">Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};
