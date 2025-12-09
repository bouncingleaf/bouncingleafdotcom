# BouncingLeaf.com

A minimalist portfolio website showcasing artwork photography, built with React, TypeScript, Vite, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Available Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm run format:check   # Check formatting
npm run type-check     # Run TypeScript type checking
npm run test           # Run unit and component tests
npm run test:coverage  # Run tests with coverage
npm run test:e2e       # Run end-to-end tests
npm run security:check # Check for high/critical vulnerabilities
npm run security:fix   # Attempt to fix vulnerabilities
```

## Project Structure

```
bouncingleafdotcom/
├── .github/workflows/    # CI/CD pipelines
├── public/
│   └── images/gallery/   # Artwork photos
├── src/
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── data/             # Gallery metadata
│   ├── styles/           # Global styles
│   └── test/             # Test setup
├── tests/                # Test files
│   ├── unit/
│   ├── component/
│   └── e2e/
└── ...config files
```

## Adding Gallery Images

1. Add optimized images to `/public/images/gallery/`
2. Update `/src/data/gallery.json` with image metadata:
   ```json
   {
     "images": [
       {
         "id": "1",
         "filename": "project-name-001.jpg",
         "title": "Piece Title",
         "date": "2024",
         "medium": "Acrylic on canvas",
         "width": 1200,
         "height": 800
       }
     ]
   }
   ```
3. Commit and push

## Tech Stack

- **React 18+** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

## Design

- Custom color palette defined in `tailwind.config.js`
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Maximum content width: 1200px

## Security

**Critical requirement**: The project must have no high or critical severity security vulnerabilities.

- Run `npm run security:check` before committing
- CI/CD pipeline automatically checks for vulnerabilities
- Deployment is blocked if high/critical vulnerabilities are detected

## Deployment

The site automatically deploys to DreamHost via GitHub Actions when pushing to the `main` branch. The CI pipeline includes security checks, linting, testing, and building before deployment.

## License

Copyright © 2024 BouncingLeaf. All rights reserved.
