import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@atoms/Button";
import { RippleButton } from "@atoms/RippleButton";
import { Banner } from "@atoms/Banner";
import { Textarea } from "@atoms/Textarea";
import { Input } from "@atoms/Input";
import { Label } from "@atoms/Label";
import { Badge } from "@atoms/Badge";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              Varma Design System
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              A modern, accessible, and themeable React component library built
              with TypeScript, Tailwind CSS, and Radix UI primitives.
            </p>

            {/* Theme Controls */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium">Theme:</span>
              <ThemeToggle />
            </div>
          </div>

          {/* Project Overview */}
          <div className="grid gap-8 mb-12">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                About This Project
              </h2>
              <div className="space-y-4 text-card-foreground">
                <p>
                  <strong>Varma</strong> is an enterprise-grade design system
                  that prioritizes developer experience, performance, and
                  accessibility. Built with modern web technologies and best
                  practices.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-semibold mb-2">Tech Stack</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• React 18 with TypeScript</li>
                      <li>• Vite for fast development</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Radix UI for accessibility</li>
                      <li>• Vitest for testing</li>
                      <li>• Storybook for documentation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Dynamic theming with CSS variables</li>
                      <li>• Comprehensive TypeScript support</li>
                      <li>• Accessibility-first components</li>
                      <li>• Responsive design patterns</li>
                      <li>• Performance optimized</li>
                      <li>• Extensive test coverage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Component Showcase */}
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Component Showcase
            </h2>

            {/* Buttons */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                Buttons
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Standard buttons with multiple variants and sizes. Includes the
                innovative RippleButton with advanced hover effects and click
                animations.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 text-card-foreground">
                    Standard Buttons
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-card-foreground">
                    Button Sizes
                  </h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">🔍</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-card-foreground">
                    Ripple Buttons
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <RippleButton type="hover" variant="primary">
                      Primary Hover
                    </RippleButton>
                    <RippleButton type="hoverborder" variant="success">
                      Success Border
                    </RippleButton>
                    <RippleButton type="hover" variant="warning">
                      Warning Hover
                    </RippleButton>
                    <RippleButton type="hoverborder" variant="error">
                      Error Border
                    </RippleButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Elements */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                Form Elements
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Accessible form components with proper labeling and validation
                support.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="sample-input">Sample Input</Label>
                  <Input id="sample-input" placeholder="Enter some text..." />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="sample-textarea">Sample Textarea</Label>
                  <Textarea
                    id="sample-textarea"
                    placeholder="Enter a longer message..."
                    helperText="This is a helper text"
                  />
                </div>
              </div>
            </div>

            {/* Feedback Components */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                Feedback Components
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Components for user feedback, notifications, and status
                indicators.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-card-foreground">
                    Banners
                  </h4>
                  <div className="space-y-3">
                    <Banner variant="info" show>
                      This is an informational banner with important updates.
                    </Banner>
                    <Banner variant="success" show>
                      Operation completed successfully!
                    </Banner>
                    <Banner variant="warning" show>
                      Please review your input before proceeding.
                    </Banner>
                    <Banner variant="error" show>
                      An error occurred while processing your request.
                    </Banner>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-card-foreground">
                    Badges
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Demo */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                Theme System
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dynamic theming with CSS variables. All components automatically
                adapt to theme changes.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className="p-4 rounded border"
                  style={{
                    backgroundColor: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <div className="font-medium mb-2">Background</div>
                  <div className="text-sm opacity-70">
                    hsl(var(--background))
                  </div>
                </div>
                <div
                  className="p-4 rounded border"
                  style={{
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  <div className="font-medium mb-2">Primary</div>
                  <div className="text-sm opacity-70">hsl(var(--primary))</div>
                </div>
              </div>
            </div>
          </div>

          {/* Component List */}
          <div className="mt-16 border border-border rounded-lg p-6 bg-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              Available Components
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              This is a sample of the components available in the design system.
              Each component includes comprehensive documentation, tests, and
              Storybook stories.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-card-foreground">Atoms</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Button (with variants)</li>
                  <li>• RippleButton (advanced)</li>
                  <li>• Input</li>
                  <li>• Textarea</li>
                  <li>• Label</li>
                  <li>• Badge</li>
                  <li>• Banner</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-card-foreground">
                  Molecules
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Form Field</li>
                  <li>• Search Input</li>
                  <li>• Status Indicator</li>
                  <li>• Navigation Item</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-card-foreground">
                  Organisms
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Navigation Bar</li>
                  <li>• Form Container</li>
                  <li>• Data Table</li>
                  <li>• Modal Dialog</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Development Info */}
          <div className="mt-8 border border-border rounded-lg p-4 bg-card">
            <h3 className="text-lg font-medium mb-2 text-card-foreground">
              Development
            </h3>
            <p className="text-sm text-muted-foreground">
              Each component includes TypeScript definitions, comprehensive
              tests, and Storybook documentation. Check the browser console for
              theme application logs and component interaction details.
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
