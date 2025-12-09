# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BouncingLeaf.com is a personal portfolio/artwork photography website built with React 18+, TypeScript, Vite, and Tailwind CSS. The site is hosted on DreamHost shared hosting and designed for minimal maintenance (updated monthly at most).

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Testing**: Vitest (unit), React Testing Library (component), Playwright or Cypress (e2e)
- **Deployment**: GitHub Actions → DreamHost via rsync/SFTP

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test              # Unit and component tests
npm run test:e2e          # End-to-end tests
npm run test:coverage     # Generate coverage report

# Linting and formatting
npm run lint
npm run format
npm run type-check

# Build for production
npm run build
npm run preview           # Preview production build locally

# Security checks
npm run security:check    # Check for high/critical vulnerabilities
npm run security:fix      # Attempt to fix vulnerabilities
```

## Architecture & Key Concepts

### Gallery System

The gallery is organized by **project**, not as one continuous stream. Images use a consistent file naming scheme in `/public/images/gallery/` to identify which project they belong to.

Gallery metadata is stored in `/src/data/gallery.json` with this structure:
```json
{
  "images": [
    {
      "id": "1",
      "filename": "artwork-1.jpg",
      "title": "Piece Title",
      "date": "2024",
      "medium": "Acrylic on canvas",
      "width": 1200,
      "height": 800
    }
  ]
}
```

**Image cropping**: Gallery uses square crops with artist-controlled crop positioning.

**Watermarking**: Images should be automatically watermarked during build or image optimization.

### Design System

**Colors**:
- Text: `#383838` (not-quite-black)
- Background: White
- Primary accent: `#3079C2` (buttons)
- Secondary accent: `#F68E61` (decorative elements)
- Dark mode: Inverts black/white

**Layout**:
- Maximum content width: 1200px
- Gallery grid: 3-4 columns (desktop), 2 (tablet), 1 (mobile)
- Minimalist design with generous white space

### Site Structure

**Navigation order**:
1. Writing - Book info and site content links
2. Art - Full gallery and art notes
3. About - Personal bio

**Home page**: Minimalist with featured artwork and menu navigation

### Content Management

Images and content are managed via Git commits:
- Images: `/public/images/gallery/`
- Text content: Markdown files (easiest for artist to edit in GitHub)
- Gallery metadata: `/src/data/gallery.json`

No CMS, database, or user authentication needed.

## Security Requirements

**CRITICAL**: There must be **no high or critical severity security vulnerabilities** in dependencies.

- Run `npm run security:check` before committing changes
- Run `npm audit` regularly to check for vulnerabilities
- Address high/critical vulnerabilities immediately
- Moderate/low vulnerabilities should be evaluated and fixed when feasible
- CI/CD pipeline blocks deployment if high/critical vulnerabilities are detected

## Testing Requirements

- **Minimum 70% code coverage** on critical paths
- **100% coverage** on navigation and gallery user flows
- All pages must render without console errors
- Accessibility tests with jest-axe for WCAG 2.1 AA compliance
- E2E tests must verify: navigation, gallery lightbox, mobile nav, page loads, links

## CI/CD Pipeline

GitHub Actions workflow triggered on push/PR to `main`:

1. Install dependencies (with caching)
2. Security audit (fails on high/critical vulnerabilities)
3. Lint & format check (ESLint, Prettier, TypeScript)
4. Run all tests with coverage
5. Production build
6. Deploy to DreamHost (main branch only, after tests pass)

**Required GitHub Secrets**:
- `DREAMHOST_HOST`
- `DREAMHOST_USER`
- `DREAMHOST_SSH_KEY` or `DREAMHOST_PASSWORD`
- `DREAMHOST_DEPLOY_PATH`

## Performance & Accessibility

**Performance budget**:
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Total page size: <2MB (excluding on-demand images)
- Lighthouse score: >90 on all metrics

**Image optimization**:
- WebP format with fallbacks
- Lazy loading for gallery images
- Responsive images for different viewports

**Accessibility requirements**:
- Semantic HTML with proper heading hierarchy
- Alt text for all images
- Keyboard navigation (including lightbox with arrow keys and ESC)
- WCAG 2.1 AA color contrast
- ARIA labels where appropriate

## What NOT to Include

- Contact forms
- CMS
- User authentication
- Database
- Comments
- Analytics (can be added via script tag later)
- Newsletter signup
- Social media integration beyond basic links

## Browser Support

Modern browsers (last 2 versions): Chrome, Firefox, Safari, Edge
Mobile: iOS Safari, Chrome Android

## Adding Content

**To add gallery images**:
1. Add optimized images to `/public/images/gallery/` with project naming scheme
2. Update `/src/data/gallery.json` with image metadata
3. Commit and push to trigger deployment

**To add/edit text pages**:
1. Edit markdown files in appropriate location
2. Commit and push
