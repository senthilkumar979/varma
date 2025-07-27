import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InCard: Story = {
  render: () => (
    <div className="w-96">
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-medium mb-4 text-card-foreground">Theme Settings</h3>
        <ThemeToggle />
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Theme Demo</h2>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="text-lg font-medium mb-4 text-card-foreground">Theme Controls</h3>
            <ThemeToggle />
          </div>
          
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="text-lg font-medium mb-4 text-card-foreground">Sample Content</h3>
            <p className="text-muted-foreground mb-4">
              This content will change colors based on the selected theme.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80">
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}; 