import { ThemeToggle } from "@/components/ThemeToggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "error", "success", "warning"],
      description: "The visual style variant of the label",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
      description: "The size of the label text",
    },
    htmlFor: {
      control: "text",
      description: "The ID of the form control the label is associated with",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
    variant: "default",
    size: "default",
  },
};

export const Muted: Story = {
  args: {
    children: "Muted Label",
    variant: "muted",
    size: "default",
  },
};

export const Error: Story = {
  args: {
    children: "Error Label",
    variant: "error",
    size: "default",
  },
};

export const Success: Story = {
  args: {
    children: "Success Label",
    variant: "success",
    size: "default",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Label",
    variant: "warning",
    size: "default",
    isMandatory: true,
  },
};

export const Small: Story = {
  args: {
    children: "Small Label",
    variant: "default",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Label",
    variant: "default",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    children: "Extra Large Label",
    variant: "default",
    size: "xl",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span>📝</span>
        Form Label
      </>
    ),
    variant: "default",
    size: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label variant="default">Default Label</Label>
      <Label variant="muted">Muted Label</Label>
      <Label variant="error">Error Label</Label>
      <Label variant="success">Success Label</Label>
      <Label variant="warning">Warning Label</Label>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label size="sm">Small Label</Label>
      <Label size="default">Default Label</Label>
      <Label size="lg">Large Label</Label>
      <Label size="xl">Extra Large Label</Label>
    </div>
  ),
};

export const WithFormControl: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" variant="error">
          Password (Required)
        </Label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-destructive rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" variant="muted" size="sm">
          Bio (Optional)
        </Label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself"
          className="w-full px-3 py-2 border border-border rounded-md"
          rows={3}
        />
      </div>
    </div>
  ),
};

export const WithThemeToggle: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="border border-border rounded-lg p-4 bg-card">
        <h3 className="text-lg font-medium mb-4 text-card-foreground">
          Theme Controls
        </h3>
        <ThemeToggle />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          Label Examples with Current Theme
        </h3>
        <div className="flex flex-col gap-4">
          <Label variant="default">Default Label</Label>
          <Label variant="muted">Muted Label</Label>
          <Label variant="error">Error Label</Label>
          <Label variant="success">Success Label</Label>
          <Label variant="warning">Warning Label</Label>
        </div>
      </div>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <div data-disabled="true" className="space-y-2">
        <Label isMandatory>Disabled Label (Parent Disabled)</Label>
        <input
          disabled
          placeholder="Disabled input"
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label>Label with Disabled Input</Label>
        <input
          disabled
          placeholder="Disabled input"
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" aria-describedby="name-help">
          Full Name
        </Label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          className="w-full px-3 py-2 border border-border rounded-md"
        />
        <div id="name-help" className="text-sm text-muted-foreground">
          Please enter your first and last name as they appear on your ID.
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" aria-required="true" isMandatory>
          Phone Number
        </Label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          required
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
    </div>
  ),
};
