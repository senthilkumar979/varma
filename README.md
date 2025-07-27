# Varma – UI Components Micro Frontend (MFE)

#### Varma is the centralized, reusable UI component library built as a Micro Frontend (MFE) for the Fandoc ecosystem. It houses headless, Tailwind, and customizable components used across various frontends in a modular and consistent way.

## Purpose

 - Serve as the single source of truth for UI components

 - Provide consistency in design and behavior across MFEs

 - Enable rapid development via reusable components

 - Support theme customization and accessibility out of the box

## Tech Stack

 - Framework: React + Vite + TypeScript

 - Styling: Tailwind CSS

 - Design Tokens: Theme-driven with dynamic support

 - Animation: Framer Motion

## Features

 - Headless UI components with custom styling support

 - Theme switcher (default + organization-defined themes)

 - Modular design for embedding in any MFE

 - Accessible (ARIA-compliant) components

 - Storybook integration for visual reference and testing

 - Built-in support for light/dark mode and dynamic colors


## Development

Install

```
pnpm install
```

Start Storybook (for development)

```
pnpm storybook
```

Build
```
pnpm build
```
## Theming

 - Default theme is provided

 - Admin-defined organization themes can be dynamically loaded via API

## Consumption

 - Varma is deployed as a remote module

 - Other MFEs can consume components using Module Federation

## Example usage:

```
import { Button } from 'varma/Button';
```

## Contributing

 - Follow component structure and naming conventions

 - Add stories in *.stories.tsx for each component

 - Ensure accessibility and responsiveness

 - Write unit tests using your preferred framework (Vitest recommended)

## Roadmap

 - Add more form elements with validation

 - Component-level dark mode support

 - Design system documentation site

 - Custom icon library support

## Maintainers

 - Senthil Kumar

## UI/UX Team of Fandoc

 - For questions or requests, please raise an issue or reach out to the Fandoc design system team.

