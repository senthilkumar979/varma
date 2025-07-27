import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Label } from "../Label";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "The visual style variant of the input",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
      description: "The size of the input",
    },
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "file",
        "date",
        "time",
        "datetime-local",
        "month",
        "week",
      ],
      description: "The type of the input element",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the input is read-only",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    variant: "default",
    size: "default",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Enter text",
    variant: "error",
    size: "default",
  },
};

export const Success: Story = {
  args: {
    placeholder: "Enter text",
    variant: "success",
    size: "default",
  },
};

export const Warning: Story = {
  args: {
    placeholder: "Enter text",
    variant: "warning",
    size: "default",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Small input",
    variant: "default",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    placeholder: "Large input",
    variant: "default",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    placeholder: "Extra large input",
    variant: "default",
    size: "xl",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    variant: "default",
    size: "default",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: "Required input",
    variant: "default",
    size: "default",
    required: true,
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: "Read-only input",
    value: "This is read-only text",
    variant: "default",
    size: "default",
    readOnly: true,
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
    variant: "default",
    size: "default",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
    variant: "default",
    size: "default",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
    min: "0",
    max: "100",
    step: "1",
    variant: "default",
    size: "default",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
    variant: "default",
    size: "default",
  },
};

export const File: Story = {
  args: {
    type: "file",
    accept: ".pdf,.doc,.docx",
    variant: "default",
    size: "default",
  },
};

export const Date: Story = {
  args: {
    type: "date",
    variant: "default",
    size: "default",
  },
};

export const Time: Story = {
  args: {
    type: "time",
    variant: "default",
    size: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Input placeholder="Default variant" variant="default" />
      <Input placeholder="Error variant" variant="error" />
      <Input placeholder="Success variant" variant="success" />
      <Input placeholder="Warning variant" variant="warning" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input placeholder="Small size" size="sm" />
      <Input placeholder="Default size" size="default" />
      <Input placeholder="Large size" size="lg" />
      <Input placeholder="Extra large size" size="xl" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
      <Input type="date" />
      <Input type="time" />
      <Input type="file" accept=".pdf,.doc,.docx" />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" variant="error" isMandatory>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          variant="error"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" variant="muted" size="sm">
          Age (Optional)
        </Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          min="0"
          max="120"
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
          Input Examples with Current Theme
        </h3>
        <div className="space-y-4">
          <Input placeholder="Default input" variant="default" />
          <Input placeholder="Error input" variant="error" />
          <Input placeholder="Success input" variant="success" />
          <Input placeholder="Warning input" variant="warning" />
        </div>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" isMandatory>
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" isMandatory>
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="Enter your phone number" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          min="0"
          max="120"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="url" placeholder="https://example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume</Label>
        <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
      </div>
    </form>
  ),
};

export const ValidationExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" isMandatory>
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter username (3-20 characters)"
          minLength={3}
          maxLength={20}
          pattern="[A-Za-z0-9_]+"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="score">Score (0-100)</Label>
        <Input
          id="score"
          type="number"
          placeholder="Enter score"
          min="0"
          max="100"
          step="1"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthdate">Birth Date</Label>
        <Input
          id="birthdate"
          type="date"
          max="2024-12-31"
        />
      </div>
    </div>
  ),
};

export const StatesExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Normal Input</Label>
        <Input placeholder="This is a normal input" />
      </div>

      <div className="space-y-2">
        <Label>Disabled Input</Label>
        <Input placeholder="This input is disabled" disabled />
      </div>

      <div className="space-y-2">
        <Label>Read-Only Input</Label>
        <Input value="This is read-only text" readOnly />
      </div>

      <div className="space-y-2">
        <Label>Required Input</Label>
        <Input placeholder="This input is required" required />
      </div>

      <div className="space-y-2">
        <Label>Input with Value</Label>
        <Input value="This input has a value" />
      </div>
    </div>
  ),
};
