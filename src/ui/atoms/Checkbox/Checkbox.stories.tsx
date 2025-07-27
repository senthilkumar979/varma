import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { Label } from "../Label";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable checkbox component with support for checked, unchecked, and indeterminate states. Includes proper accessibility attributes and theme integration.",
      },
    },
    tags: ["autodocs"],
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in an indeterminate state",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the checkbox is read-only",
    },
    className: {
      control: "text",
      description: "Custom CSS class name",
    },
    onChange: {
      action: "changed",
      description: "Callback when checkbox state changes",
    },
    onFocus: {
      action: "focused",
      description: "Callback when checkbox is focused",
    },
    onBlur: {
      action: "blurred",
      description: "Callback when checkbox loses focus",
    },
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
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {},
};

// Checked state
export const Checked: Story = {
  args: {
    checked: true,
  },
};

// Unchecked state
export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

// Indeterminate state
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// Disabled checked state
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

// Required state
export const Required: Story = {
  args: {
    required: true,
  },
};

// Read-only state
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    checked: true,
  },
};

// With label
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="checkbox-with-label" />
      <Label htmlFor="checkbox-with-label">Accept terms and conditions</Label>
    </div>
  ),
  args: {},
};

// With custom styling
export const CustomStyling: Story = {
  args: {
    className: "scale-150 border-2 border-blue-500",
  },
};

// Multiple checkboxes
export const MultipleCheckboxes: Story = {
  render: (args) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="option2" checked />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="option3" indeterminate />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </div>
  ),
  args: {},
};

// Form integration
export const FormIntegration: Story = {
  render: (args) => (
    <form className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          {...args}
          id="newsletter"
          name="newsletter"
          value="newsletter"
        />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="marketing" name="marketing" value="marketing" />
        <Label htmlFor="marketing">Receive marketing emails</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="terms" name="terms" value="terms" required />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>
    </form>
  ),
  args: {},
};

// Accessibility examples
export const AccessibilityExamples: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="aria-label" aria-label="Accept terms" />
        <span>Checkbox with aria-label</span>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          {...args}
          id="aria-describedby"
          aria-describedby="description"
        />
        <span>Checkbox with aria-describedby</span>
        <span id="description" className="text-sm text-muted-foreground">
          Additional description for screen readers
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox {...args} id="aria-invalid" aria-invalid="true" />
        <span>Checkbox with aria-invalid</span>
      </div>
    </div>
  ),
  args: {},
};

// States collection
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <h3 className="font-semibold">Default States</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-unchecked" />
          <Label htmlFor="default-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-checked" checked />
          <Label htmlFor="default-checked">Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-indeterminate" indeterminate />
          <Label htmlFor="default-indeterminate">Indeterminate</Label>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold">Disabled States</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-unchecked" disabled />
          <Label htmlFor="disabled-unchecked">Disabled Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-checked" disabled checked />
          <Label htmlFor="disabled-checked">Disabled Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-indeterminate" disabled indeterminate />
          <Label htmlFor="disabled-indeterminate">Disabled Indeterminate</Label>
        </div>
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    const [indeterminate, setIndeterminate] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interactive"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Label htmlFor="interactive">Interactive checkbox</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interactive-indeterminate"
            indeterminate={indeterminate}
            onChange={(e) => {
              setIndeterminate(!indeterminate);
              setChecked(e.target.checked);
            }}
          />
          <Label htmlFor="interactive-indeterminate">
            Indeterminate checkbox
          </Label>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Checked: {checked.toString()}</p>
          <p>Indeterminate: {indeterminate.toString()}</p>
        </div>
      </div>
    );
  },
};
