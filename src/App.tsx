import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@atoms/Button";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground p-8 primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            Dynamic Theming Demo
          </h1>

          <div className="grid gap-8">
            {/* Theme Controls */}
            <div className="border border-border rounded-lg p-6 bg-primary">
              <ThemeToggle />
            </div>

            {/* CSS Variable Test */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-medium mb-4">CSS Variable Test</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="p-4 rounded border"
                  style={{
                    backgroundColor: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Background: hsl(var(--background))
                </div>
                <div
                  className="p-4 rounded border"
                  style={{
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  Primary: hsl(var(--primary))
                </div>
              </div>
            </div>

            {/* Button Examples */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Button Examples
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🔍</Button>
              </div>
            </div>

            {/* Content Examples */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Content Examples
              </h2>
              <div className="grid gap-4 p-6 border border-border rounded-lg bg-card text-card-foreground">
                <h3 className="text-lg font-medium">Card Title</h3>
                <p className="text-muted-foreground">
                  This is a card with themed colors. The background, text, and
                  border colors will change based on the selected theme.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Action 1
                  </Button>
                  <Button variant="secondary" size="sm">
                    Action 2
                  </Button>
                </div>
              </div>
            </div>

            {/* Debug Info */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <h3 className="text-lg font-medium mb-2 text-card-foreground">
                Debug Info
              </h3>
              <p className="text-sm text-muted-foreground">
                Check browser console for theme application logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
