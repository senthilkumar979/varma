import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "./Banner";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Banner> = {
  title: "Atoms/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error", "note"],
      description: "The visual style variant of the banner",
    },
    show: {
      control: "boolean",
      description: "Whether the banner is visible",
    },
    dismissible: {
      control: "boolean",
      description: "Whether to show the dismiss button",
    },
    showGrid: {
      control: "boolean",
      description: "Whether to show the grid pattern background",
    },
    title: {
      control: "text",
      description: "Title text for the banner",
    },
    children: {
      control: "text",
      description: "Main content of the banner",
    },
    dismissText: {
      control: "text",
      description: "Custom dismiss button text/icon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a default banner message.",
    variant: "info",
  },
};

export const Info: Story = {
  args: {
    children: "This is an informational banner with important details.",
    variant: "info",
    title: "Information",
    icon: "ℹ️",
    dismissible: true,
    onDismiss: () => console.log("Banner dismissed"),
  },
};

export const Success: Story = {
  args: {
    children: "Your changes have been saved successfully!",
    variant: "success",
    title: "Success",
    icon: "✅",
  },
};

export const Warning: Story = {
  args: {
    children: "Please review your settings before proceeding.",
    variant: "warning",
    title: "Warning",
    icon: "⚠️",
  },
};

export const Error: Story = {
  args: {
    children: "An error occurred while processing your request.",
    variant: "error",
    title: "Error",
    icon: "❌",
  },
};

export const Note: Story = {
  args: {
    children: "This is a note with additional context.",
    variant: "note",
    title: "Note",
    icon: "📝",
  },
};

export const Dismissible: Story = {
  args: {
    children: "This banner can be dismissed by clicking the X button.",
    variant: "info",
    dismissible: true,

    onDismiss: () => console.log("Banner dismissed"),
  },
};

export const WithGrid: Story = {
  args: {
    children: "This banner has a decorative grid pattern background.",
    variant: "success",
    showGrid: true,
    title: "With Grid",
    icon: "🎨",
  },
};

export const CustomDismissText: Story = {
  args: {
    children: "This banner has a custom dismiss button text.",
    variant: "warning",
    dismissible: true,
    dismissText: "Close",
    onDismiss: () => console.log("Banner dismissed"),
  },
};

export const LongContent: Story = {
  args: {
    children:
      "This is a banner with a very long message that demonstrates how the component handles extended content. It should wrap properly and maintain good readability across different screen sizes.",
    variant: "info",
    title: "Long Content Example",
    icon: "📄",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Banner variant="info" title="Information" icon="ℹ️">
        This is an informational banner with important details.
      </Banner>

      <Banner variant="success" title="Success" icon="✅">
        Your changes have been saved successfully!
      </Banner>

      <Banner variant="warning" title="Warning" icon="⚠️">
        Please review your settings before proceeding.
      </Banner>

      <Banner variant="error" title="Error" icon="❌">
        An error occurred while processing your request.
      </Banner>

      <Banner variant="note" title="Note" icon="📝">
        This is a note with additional context.
      </Banner>
    </div>
  ),
};

export const AllVariantsWithGrid: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Banner variant="info" title="Information" icon="ℹ️" showGrid>
        This is an informational banner with grid pattern.
      </Banner>

      <Banner variant="success" title="Success" icon="✅" showGrid>
        Your changes have been saved successfully!
      </Banner>

      <Banner variant="warning" title="Warning" icon="⚠️" showGrid>
        Please review your settings before proceeding.
      </Banner>

      <Banner variant="error" title="Error" icon="❌" showGrid>
        An error occurred while processing your request.
      </Banner>

      <Banner variant="note" title="Note" icon="📝" showGrid>
        This is a note with additional context.
      </Banner>
    </div>
  ),
};

export const AllVariantsDismissible: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Banner
        variant="info"
        title="Information"
        icon="ℹ️"
        dismissible
        onDismiss={() => console.log("Info dismissed")}
      >
        This is an informational banner that can be dismissed.
      </Banner>

      <Banner
        variant="success"
        title="Success"
        icon="✅"
        dismissible
        onDismiss={() => console.log("Success dismissed")}
      >
        Your changes have been saved successfully!
      </Banner>

      <Banner
        variant="warning"
        title="Warning"
        icon="⚠️"
        dismissible
        onDismiss={() => console.log("Warning dismissed")}
      >
        Please review your settings before proceeding.
      </Banner>

      <Banner
        variant="error"
        title="Error"
        icon="❌"
        dismissible
        onDismiss={() => console.log("Error dismissed")}
      >
        An error occurred while processing your request.
      </Banner>

      <Banner
        variant="note"
        title="Note"
        icon="📝"
        dismissible
        onDismiss={() => console.log("Note dismissed")}
      >
        This is a note that can be dismissed.
      </Banner>
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

      <div className="space-y-4 w-full max-w-2xl">
        <h3 className="text-lg font-medium">
          Banner Examples with Current Theme
        </h3>

        <Banner variant="info" title="Information" icon="ℹ️">
          This banner adapts to the current theme colors.
        </Banner>

        <Banner variant="success" title="Success" icon="✅">
          Success message with theme-aware styling.
        </Banner>

        <Banner variant="warning" title="Warning" icon="⚠️">
          Warning message with theme-aware styling.
        </Banner>

        <Banner variant="error" title="Error" icon="❌">
          Error message with theme-aware styling.
        </Banner>

        <Banner variant="note" title="Note" icon="📝">
          Note message with theme-aware styling.
        </Banner>
      </div>
    </div>
  ),
};

export const ResponsiveDesign: Story = {
  render: () => (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Mobile (Small)</h3>
        <div className="w-full max-w-sm">
          <Banner variant="info" title="Mobile Banner" icon="📱">
            This banner is optimized for small screens.
          </Banner>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tablet (Medium)</h3>
        <div className="w-full max-w-md">
          <Banner variant="success" title="Tablet Banner" icon="📱">
            This banner is optimized for medium screens.
          </Banner>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Desktop (Large)</h3>
        <div className="w-full max-w-2xl">
          <Banner variant="warning" title="Desktop Banner" icon="💻">
            This banner is optimized for large screens.
          </Banner>
        </div>
      </div>
    </div>
  ),
};
