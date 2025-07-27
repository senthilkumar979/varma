import type { Meta, StoryObj } from "@storybook/react-vite";
import { RippleButton } from "./RippleButton";
import { ThemeToggle } from "@/components/ThemeToggle";

const meta: Meta<typeof RippleButton> = {
  title: "Atoms/RippleButton",
  component: RippleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["hover", "hoverborder"],
      description: "The type of ripple effect",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "info", "success", "warning", "error"],
      description: "The visual variant of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    children: {
      control: "text",
      description: "The content to display inside the button",
    },
    rippleDuration: {
      control: "number",
      description: "Duration for the JS click ripple in milliseconds",
    },
    rippleColor: {
      control: "color",
      description: "Custom ripple color override",
    },
    hoverRippleColor: {
      control: "color",
      description: "Custom hover ripple color",
    },
    hoverBorderEffectColor: {
      control: "color",
      description: "Color of the border effect",
    },
    hoverBorderEffectThickness: {
      control: "text",
      description: "Thickness of the border effect",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};

export const PrimaryHover: Story = {
  args: {
    children: "Primary Hover",
    variant: "primary",
    type: "hover",
  },
};

export const SecondaryHover: Story = {
  args: {
    children: "Secondary Hover",
    variant: "secondary",
    type: "hover",
  },
};

export const InfoHover: Story = {
  args: {
    children: "Info Hover",
    variant: "info",
    type: "hover",
  },
};

export const SuccessHover: Story = {
  args: {
    children: "Success Hover",
    variant: "success",
    type: "hover",
  },
};

export const WarningHover: Story = {
  args: {
    children: "Warning Hover",
    variant: "warning",
    type: "hover",
  },
};

export const ErrorHover: Story = {
  args: {
    children: "Error Hover",
    variant: "error",
    type: "hover",
  },
};

export const PrimaryHoverBorder: Story = {
  args: {
    children: "Primary Border",
    type: "hoverborder",
    variant: "primary",
  },
};

export const SecondaryHoverBorder: Story = {
  args: {
    children: "Secondary Border",
    type: "hoverborder",
    variant: "secondary",
  },
};

export const InfoHoverBorder: Story = {
  args: {
    children: "Info Border",
    type: "hoverborder",
    variant: "info",
  },
};

export const SuccessHoverBorder: Story = {
  args: {
    children: "Success Border",
    type: "hoverborder",
    variant: "success",
  },
};

export const WarningHoverBorder: Story = {
  args: {
    children: "Warning Border",
    type: "hoverborder",
    variant: "warning",
  },
};

export const ErrorHoverBorder: Story = {
  args: {
    children: "Error Border",
    type: "hoverborder",
    variant: "error",
  },
};

export const DarkHover: Story = {
  args: {
    children: "Dark Hover",
    variant: "dark",
    type: "hoverborder",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const CustomRippleDuration: Story = {
  args: {
    children: "Slow Ripple",
    rippleDuration: 2500,
  },
};

export const CustomRippleColor: Story = {
  args: {
    children: "Custom Ripple",
    rippleColor: "#ff6b6b",
  },
};

export const CustomHoverRippleColor: Story = {
  args: {
    children: "Custom Hover Ripple",
    hoverRippleColor: "#4ecdc4",
  },
};

export const CustomBorderEffect: Story = {
  args: {
    children: "Custom Border",
    type: "hoverborder",
    hoverBorderEffectColor: "#ff9ff3",
    hoverBorderEffectThickness: "0.5em",
  },
};

export const AllHoverVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <h3 className="text-lg font-medium">Hover Type Variants</h3>
      <div className="grid grid-cols-2 gap-4">
        <RippleButton variant="primary" type="hover">
          Primary Hover
        </RippleButton>
        <RippleButton variant="secondary" type="hover">
          Secondary Hover
        </RippleButton>
        <RippleButton variant="info" type="hover">
          Info Hover
        </RippleButton>
        <RippleButton variant="success" type="hover">
          Success Hover
        </RippleButton>
        <RippleButton variant="warning" type="hover">
          Warning Hover
        </RippleButton>
        <RippleButton variant="error" type="hover">
          Error Hover
        </RippleButton>
      </div>
    </div>
  ),
};

export const AllHoverBorderVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <h3 className="text-lg font-medium">Hover Border Type Variants</h3>
      <div className="grid grid-cols-2 gap-4">
        <RippleButton type="hoverborder" variant="primary">
          Primary Border
        </RippleButton>
        <RippleButton type="hoverborder" variant="secondary">
          Secondary Border
        </RippleButton>
        <RippleButton type="hoverborder" variant="info">
          Info Border
        </RippleButton>
        <RippleButton type="hoverborder" variant="success">
          Success Border
        </RippleButton>
        <RippleButton type="hoverborder" variant="warning">
          Warning Border
        </RippleButton>
        <RippleButton type="hoverborder" variant="error">
          Error Border
        </RippleButton>
      </div>
    </div>
  ),
};

export const InteractiveExamples: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Click Effects with Variants</h3>
        <div className="grid grid-cols-2 gap-4">
          <RippleButton
            type="hover"
            variant="primary"
            onClick={() => alert("Primary hover clicked!")}
          >
            Primary Hover Click
          </RippleButton>
          <RippleButton
            type="hoverborder"
            variant="success"
            onClick={() => console.log("Success border clicked!")}
          >
            Success Border Click
          </RippleButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hover Effects by Type</h3>
        <div className="grid grid-cols-2 gap-4">
          <RippleButton type="hover" variant="info">
            Info Hover Effect
          </RippleButton>
          <RippleButton type="hoverborder" variant="warning">
            Warning Border Effect
          </RippleButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Disabled States with Types</h3>
        <div className="grid grid-cols-2 gap-4">
          <RippleButton disabled type="hover" variant="primary">
            Disabled Primary Hover
          </RippleButton>
          <RippleButton disabled type="hoverborder" variant="error">
            Disabled Error Border
          </RippleButton>
        </div>
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
          RippleButton Examples with Current Theme
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <RippleButton type="hover" variant="primary">
            Primary Hover
          </RippleButton>
          <RippleButton type="hover" variant="secondary">
            Secondary Hover
          </RippleButton>
          <RippleButton type="hover" variant="info">
            Info Hover
          </RippleButton>
          <RippleButton type="hover" variant="success">
            Success Hover
          </RippleButton>
          <RippleButton type="hover" variant="warning">
            Warning Hover
          </RippleButton>
          <RippleButton type="hover" variant="error">
            Error Hover
          </RippleButton>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <RippleButton type="hoverborder" variant="primary">
            Primary Border
          </RippleButton>
          <RippleButton type="hoverborder" variant="secondary">
            Secondary Border
          </RippleButton>
          <RippleButton type="hoverborder" variant="info">
            Info Border
          </RippleButton>
          <RippleButton type="hoverborder" variant="success">
            Success Border
          </RippleButton>
          <RippleButton type="hoverborder" variant="warning">
            Warning Border
          </RippleButton>
          <RippleButton type="hoverborder" variant="error">
            Error Border
          </RippleButton>
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
          <RippleButton type="hover" variant="primary" className="w-full">
            Full Width Mobile Hover
          </RippleButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tablet (Medium)</h3>
        <div className="w-full max-w-md">
          <RippleButton type="hoverborder" variant="success" className="w-full">
            Full Width Tablet Border
          </RippleButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Desktop (Large)</h3>
        <div className="w-full max-w-2xl">
          <RippleButton type="hover" variant="warning" className="w-full">
            Full Width Desktop Hover
          </RippleButton>
        </div>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Sizes</h3>
        <div className="flex gap-4 items-center">
          <RippleButton type="hover" className="px-2 py-1 text-sm">
            Small Hover
          </RippleButton>
          <RippleButton type="hover">Default Hover</RippleButton>
          <RippleButton type="hoverborder" className="px-6 py-3 text-lg">
            Large Border
          </RippleButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <RippleButton
            type="hover"
            rippleColor="#ff6b6b"
            hoverRippleColor="#4ecdc4"
          >
            Custom Hover Colors
          </RippleButton>
          <RippleButton
            type="hoverborder"
            hoverBorderEffectColor="#a8e6cf"
            hoverBorderEffectThickness="0.4em"
          >
            Custom Border
          </RippleButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Durations</h3>
        <div className="grid grid-cols-2 gap-4">
          <RippleButton type="hover" rippleDuration={300}>
            Fast Hover Ripple
          </RippleButton>
          <RippleButton type="hoverborder" rippleDuration={1000}>
            Slow Border Ripple
          </RippleButton>
        </div>
      </div>
    </div>
  ),
};
