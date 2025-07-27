import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    isError: {
      control: "boolean",
      description: "Whether the textarea is in error state",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the textarea",
    },
    endIcon: {
      control: "text",
      description: "Icon displayed at the end of the textarea",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
    },
    cols: {
      control: "number",
      description: "Number of visible text columns",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message here...",
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: "Enter your message here...",
    helperText: "This is a helpful message below the textarea",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter your message here...",
    isError: true,
    helperText: "This field is required",
    rows: 4,
  },
};

export const WithEndIcon: Story = {
  args: {
    placeholder: "Enter your message here...",
    endIcon: "📝",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter your message here...",
    defaultValue: "This is a pre-filled message in the textarea.",
    rows: 4,
  },
};

export const LargeTextarea: Story = {
  args: {
    placeholder: "Enter a longer message here...",
    rows: 8,
    cols: 50,
  },
};

export const SmallTextarea: Story = {
  args: {
    placeholder: "Short message...",
    rows: 2,
    cols: 20,
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: "Enter your message (max 100 characters)...",
    maxLength: 100,
    helperText: "0/100 characters",
    rows: 4,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Default</h3>
        <Textarea placeholder="Default textarea" rows={4} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Helper Text</h3>
        <Textarea
          placeholder="With helper text"
          helperText="This is a helpful message"
          rows={4}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Error</h3>
        <Textarea
          placeholder="With error state"
          isError={true}
          helperText="This field is required"
          rows={4}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With End Icon</h3>
        <Textarea placeholder="With end icon" endIcon="📝" rows={4} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Disabled</h3>
        <Textarea placeholder="Disabled textarea" disabled={true} rows={4} />
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

      <div className="space-y-4 w-full max-w-2xl">
        <h3 className="text-lg font-medium">
          Textarea Examples with Current Theme
        </h3>

        <div className="space-y-4">
          <Textarea
            placeholder="Default textarea with current theme"
            helperText="This adapts to the current theme"
            rows={4}
          />

          <Textarea
            placeholder="Error state with current theme"
            isError={true}
            helperText="Error message with theme colors"
            rows={4}
          />

          <Textarea
            placeholder="With end icon and theme"
            endIcon="🎨"
            helperText="Icon adapts to theme colors"
            rows={4}
          />
        </div>
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
          <Textarea
            placeholder="Mobile-friendly textarea"
            helperText="Optimized for small screens"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tablet (Medium)</h3>
        <div className="w-full max-w-md">
          <Textarea
            placeholder="Tablet-friendly textarea"
            helperText="Optimized for medium screens"
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Desktop (Large)</h3>
        <div className="w-full max-w-2xl">
          <Textarea
            placeholder="Desktop-friendly textarea"
            helperText="Optimized for large screens"
            rows={6}
          />
        </div>
      </div>
    </div>
  ),
};
