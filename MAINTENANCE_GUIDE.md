# Website Maintenance & Quality Assurance Guide

This document provides comprehensive guidelines for maintaining code quality, security, performance, and reliability for this React/TypeScript website. Use this as a checklist for regular maintenance and before any deployment.

---

## Table of Contents
1. [Code Quality Checks](#code-quality-checks)
2. [Security Audits](#security-audits)
3. [Performance Optimization](#performance-optimization)
4. [Accessibility](#accessibility)
5. [SEO & Metadata](#seo--metadata)
6. [Error Handling](#error-handling)
7. [Dependency Management](#dependency-management)
8. [Image Optimization](#image-optimization)
9. [Build & Deployment](#build--deployment)
10. [Testing](#testing)

---

## Code Quality Checks

### Essential Commands
Run these before every commit:

```bash
npm run type-check    # TypeScript compilation check
npm run lint          # ESLint - catches code issues
npm run format:check  # Prettier - code formatting
npm run format        # Auto-fix formatting issues
```

### What to Check
- ✅ **No TypeScript errors** - All types must be valid
- ✅ **No ESLint warnings** - Code must pass linting with 0 warnings
- ✅ **Consistent formatting** - Prettier must pass
- ✅ **No console.log statements** in production code
- ✅ **All .map() operations have `key` props**
- ✅ **No unused imports or variables**

### Common Issues
```typescript
// ❌ Bad: Missing key
items.map(item => <div>{item.name}</div>)

// ✅ Good: Key present
items.map(item => <div key={item.id}>{item.name}</div>)

// ❌ Bad: Console statements in production
console.log('debug info')

// ✅ Good: Remove or use proper logging
// logger.debug('debug info')
```

---

## Security Audits

### Vulnerability Scanning
```bash
npm audit                          # Check for vulnerabilities
npm audit --audit-level=high       # Only show high/critical
npm run security:check             # Custom script (high+ only)
npm run security:fix               # Attempt auto-fix
```

### Security Requirements
- ❌ **ZERO high or critical vulnerabilities** allowed in production
- ⚠️  **Moderate/low vulnerabilities** should be evaluated and fixed when feasible
- ✅ **All external links** use `rel="noopener noreferrer"`
- ✅ **CSP headers** configured in `.htaccess`
- ✅ **Security headers** present (X-Frame-Options, HSTS, etc.)

### Security Headers Checklist
Verify these are in `public/.htaccess`:
- ✅ Content-Security-Policy
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Strict-Transport-Security (HSTS)
- ✅ Permissions-Policy

### OWASP Top 10 Checks
1. **Injection** - No user input rendered without sanitization
2. **Broken Authentication** - N/A (no auth system)
3. **Sensitive Data Exposure** - No API keys/secrets in code
4. **XML External Entities** - N/A
5. **Broken Access Control** - N/A (no auth)
6. **Security Misconfiguration** - Headers configured ✅
7. **XSS** - React escapes by default, external links safe ✅
8. **Insecure Deserialization** - N/A
9. **Using Components with Known Vulnerabilities** - Run `npm audit` ✅
10. **Insufficient Logging** - Error boundary logs errors ✅

---

## Performance Optimization

### Image Optimization
All images must be optimized before adding to repo:

```bash
npm run optimize:images    # Convert JPEGs to WebP (3 sizes each)
node scripts/optimize-logo.js              # Logo-specific optimization
node scripts/optimize-book2-emblem.js      # Book 2 emblem
```

**Image Strategy:**
- **Original JPEGs**: Keep as fallback sources
- **WebP full** (85% quality): For high-quality views
- **WebP medium** (800px): For gallery grids
- **WebP thumbnail** (400px): For navigation/thumbnails

**File Size Targets:**
- Original JPEG: 2-3.5MB → WebP: ~400-600KB (85% reduction)
- Thumbnails: ~50-80KB
- Logos: <50KB

### Performance Checks
```bash
npm run build              # Production build
npm run preview            # Test production build locally
```

**Bundle Size Targets:**
- Main JS bundle: <250KB (gzipped <80KB)
- CSS: <20KB (gzipped <5KB)
- Individual routes: <50KB each

### .htaccess Performance Configuration
Verify these are enabled in `public/.htaccess`:
- ✅ **Gzip compression** (mod_deflate)
- ✅ **Browser caching** (1 year for assets, 1 hour for HTML)
- ✅ **Cache-Control headers** with `immutable` for hashed assets

### Lazy Loading
- ✅ All route components use `React.lazy()`
- ✅ Images use `loading="lazy"` (except first 4 in viewport)
- ✅ Navigation emblems use `loading="eager"`

---

## Accessibility

### WCAG 2.1 AA Compliance Checklist
- ✅ **Alt text** on ALL images
- ✅ **Semantic HTML** (header, nav, main, section, article)
- ✅ **Keyboard navigation** works (Tab, Enter, Esc)
- ✅ **ARIA labels** on icon-only buttons
- ✅ **Color contrast** meets 4.5:1 ratio
- ✅ **Heading hierarchy** (h1 → h2 → h3, no skips)
- ✅ **Focus indicators** visible

### Keyboard Navigation
Test these interactions:
- Tab through navigation menu
- Enter to activate links/buttons
- Esc to close lightbox
- Arrow keys to navigate lightbox images

### Image Alt Text Guidelines
```tsx
// ✅ Good: Descriptive alt text
<img src="art.jpg" alt="Mysterious Creatures Series 1 - Watercolor creatures" />

// ❌ Bad: Missing or redundant alt
<img src="art.jpg" alt="" />
<img src="art.jpg" alt="Image" />
```

---

## SEO & Metadata

### Required Files
- ✅ `public/robots.txt` - Search engine crawling rules
- ✅ `public/sitemap.xml` - All page URLs for search engines
- ✅ `public/manifest.json` - PWA web app manifest
- ✅ `public/favicon.png` - Site favicon (32x32)
- ✅ `public/apple-touch-icon.png` - iOS icon (180x180)

### Meta Tags (in `index.html`)
- ✅ **Primary meta tags** (title, description, author)
- ✅ **Open Graph tags** (for Facebook, LinkedIn)
- ✅ **Twitter Card tags** (for Twitter)
- ✅ **Viewport meta tag** for mobile

### Updating Sitemap
When adding/removing pages, update `public/sitemap.xml`:

```xml
<url>
  <loc>https://bouncingleaf.com/new-page</loc>
  <lastmod>2025-12-12</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### SEO Best Practices
- ✅ One `<h1>` per page
- ✅ Descriptive page titles (50-60 characters)
- ✅ Meta descriptions (150-160 characters)
- ✅ Semantic HTML structure
- ✅ Fast load times (<3s)

---

## Error Handling

### Error Boundary
- ✅ **ErrorBoundary component** wraps entire app (`src/components/ErrorBoundary.tsx`)
- ✅ Catches React component errors
- ✅ Shows user-friendly error message
- ✅ Logs errors to console
- ✅ Provides "Refresh" button

### 404 Handling
- ✅ Catch-all route (`path="*"`) configured
- ✅ `NotFound` component exists
- ✅ `public/404.html` redirects to SPA for client-side routing

### Error Monitoring
Consider adding (optional):
- Sentry for production error tracking
- LogRocket for session replay
- Custom error logging service

---

## Dependency Management

### Regular Updates
```bash
npm outdated              # Check for outdated packages
npm update                # Update minor/patch versions
npm audit fix             # Fix vulnerabilities
```

### Major Version Updates
Be cautious with major version updates. Test thoroughly:
1. Update one package at a time
2. Run all quality checks
3. Test in development
4. Check bundle size impact

### Package.json Scripts Reference
```json
{
  "dev": "vite",                    // Development server
  "build": "tsc && vite build",     // Production build
  "preview": "vite preview",        // Preview production build
  "lint": "eslint .",               // Lint code
  "format": "prettier --write",     // Format code
  "format:check": "prettier --check", // Check formatting
  "type-check": "tsc --noEmit",     // TypeScript check
  "test": "vitest --run",           // Run tests
  "test:watch": "vitest",           // Watch mode
  "test:coverage": "vitest --coverage", // Coverage report
  "test:e2e": "playwright test",    // E2E tests
  "security:check": "npm audit --audit-level=high",
  "security:fix": "npm audit fix",
  "optimize:images": "node scripts/optimize-images.js",
  "gallery:generate": "node scripts/generate-gallery-data.js"
}
```

---

## Image Optimization

### Workflow for Adding New Images

1. **Add original JPEG** to `public/images/` directory
2. **Run optimization**:
   ```bash
   npm run optimize:images
   ```
3. **Verify WebP files created**:
   - `image.webp` (full size)
   - `image-medium.webp` (800px)
   - `image-thumb.webp` (400px)
4. **Update gallery.json** if needed
5. **Use OptimizedImage component** in React

### OptimizedImage Component Usage
```tsx
import OptimizedImage from '../components/OptimizedImage'

// For thumbnails/navigation (uses -thumb.webp)
<OptimizedImage
  src="/images/logo.png"
  alt="Logo"
  size="thumbnail"
  loading="eager"
/>

// For gallery grids (uses -medium.webp)
<OptimizedImage
  src="/images/art.jpeg"
  alt="Artwork"
  size="medium"
  loading="lazy"
/>

// For lightbox/full size (uses full .webp)
<OptimizedImage
  src="/images/art.jpeg"
  alt="Artwork"
  size="full"
  loading="eager"
/>
```

### Image Formats
- ✅ **PNG**: Logos, emblems, transparent images
- ✅ **JPEG**: Photography, artwork (original source)
- ✅ **WebP**: All images (optimized versions)
- ❌ **Avoid**: GIF (use video), BMP, TIFF

---

## Git Hooks & Automation

### Pre-Commit Hooks
This project uses Git hooks to automate quality checks and image processing before commits.

**Hook Location:** `.githooks/pre-commit` (tracked in repo)

**Installation:**
```bash
npm run install-hooks  # Manual installation
npm run prepare         # Auto-runs after npm install
```

**What the Pre-Commit Hook Does:**
1. **Quality Checks** (on code files):
   - Runs Prettier formatting check
   - Runs ESLint
   - Runs TypeScript type check
   - **Blocks commit** if any check fails

2. **Image Processing** (on image changes):
   - Detects new creatures series folders
   - Updates gallery.json automatically
   - Generates WebP versions (full, medium, thumbnail)
   - Stages all generated files

**Hook Benefits:**
- ✅ Prevents formatting errors from reaching CI
- ✅ Catches type errors before commit
- ✅ Automatically processes new images
- ✅ Ensures gallery.json stays in sync with images

**Bypassing Hooks (emergency only):**
```bash
git commit --no-verify  # Skip all hooks (use with caution!)
```

### Image Processing Automation

When you add new creature series images to `public/images/creatures/creaturesXX/`:
1. Git hook detects changes in commit
2. Runs `scripts/update-gallery-data.js` to add series to gallery.json
3. Runs `npm run optimize:images` to create WebP versions
4. Automatically stages all generated files

**Manual Trigger:**
```bash
npm run optimize:images          # Process all images
node scripts/update-gallery-data.js  # Update gallery.json only
```

---

## Common Patterns & Solutions

### EXIF Orientation Handling

**Problem:** Images may appear rotated incorrectly when converting JPEG to WebP because EXIF orientation metadata isn't preserved.

**Solution:** Use Sharp's `.rotate()` method to auto-rotate based on EXIF data:

```javascript
// In scripts/optimize-images.js
await sharp(inputPath)
  .rotate()  // Auto-rotate based on EXIF orientation
  .resize(800, 800, { fit: 'inside' })
  .webp({ quality: 85 })
  .toFile(outputPath);
```

**When to Use:**
- Converting JPEG photos to WebP
- Processing images from cameras/phones (they often have EXIF orientation)
- Any time images appear sideways after conversion

### Testing React Error Boundaries

**Pattern for testing error boundaries:**

```typescript
// Component that throws an error (for testing)
const ThrowError = ({ shouldThrow = true }) => {
  if (shouldThrow) throw new Error('Test error')
  return <div>No error</div>
}

// Test
it('catches and displays errors', () => {
  // Suppress console.error for expected errors
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )

  expect(screen.getByText('Oops!')).toBeInTheDocument()
  spy.mockRestore()
})
```

**Key Points:**
- Suppress console.error in tests (expected errors)
- Test both default and custom fallback UI
- Verify componentDidCatch logs errors
- Test error state persistence

### Fixing act() Warnings in Tests

**Problem:** Warnings about suspended resources not wrapped in `act()` when testing lazy-loaded components.

**Solution:** Use `waitFor` to wait for async operations:

```typescript
import { render, waitFor } from '@testing-library/react'

it('renders lazy-loaded component', async () => {
  const { container } = render(<App />)

  // Wait for lazy-loaded components to finish loading
  await waitFor(() => {
    expect(container.querySelector('main')).toBeInTheDocument()
  })
})
```

**When to Use:**
- Testing components with `React.lazy()`
- Testing async data fetching
- Any component with Suspense boundaries

### Favicon Generation from Custom Icons

**Workflow:**
1. Place source icon in `public/icon.png` (or `public/images/logo.png`)
2. Update `scripts/create-favicon.js` to point to source file
3. Generate favicons:
   ```bash
   node scripts/create-favicon.js
   ```

**Generated Files:**
- `favicon.png` (32x32) - Browser tab icon
- `apple-touch-icon.png` (180x180) - iOS home screen
- `android-chrome-192.png` (192x192) - Android home screen

**Fit Modes:**
- `fit: 'contain'` - Preserves aspect ratio, adds padding (logos)
- `fit: 'cover'` - Fills entire square, may crop (photos/icons)

```javascript
// For logos with transparency
await sharp('public/images/logo.png')
  .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile('public/favicon.png')

// For icons/photos
await sharp('public/icon.png')
  .resize(32, 32, { fit: 'cover' })
  .png()
  .toFile('public/favicon.png')
```

---

## Build & Deployment

### Pre-Deployment Checklist
```bash
# 1. Run all quality checks
npm run type-check
npm run lint
npm run format:check

# 2. Run tests
npm run test
npm run test:coverage  # Ensure >70% coverage

# 3. Security audit
npm run security:check  # Must have ZERO high/critical

# 4. Build production
npm run build

# 5. Test production build locally
npm run preview

# 6. Check bundle sizes (see output)
```

### GitHub Actions CI/CD
The CI pipeline (`.github/workflows/ci.yml`) automatically:
1. ✅ Installs dependencies (with caching)
2. ✅ Runs security audit (fails on high/critical)
3. ✅ Runs linting & formatting checks
4. ✅ Runs type checking
5. ✅ Runs tests with coverage
6. ✅ Builds production bundle
7. ✅ Deploys to DreamHost (main branch only)

### Deployment Secrets (GitHub)
Required secrets in repository settings:
- `DREAMHOST_HOST`
- `DREAMHOST_USER`
- `DREAMHOST_SSH_KEY` or `DREAMHOST_PASSWORD`
- `DREAMHOST_DEPLOY_PATH`

---

## Testing

### Test Coverage Requirements
- **Minimum: 70%** overall code coverage
- **Critical paths: 100%** coverage
  - Navigation flow
  - Gallery lightbox
  - Mobile navigation
  - Page rendering

### Running Tests
```bash
npm test                # Run once
npm run test:watch      # Watch mode (development)
npm run test:coverage   # Generate coverage report
npm run test:e2e        # Playwright E2E tests
```

### What to Test
1. **Component rendering** - All pages render without errors
2. **User interactions** - Clicks, navigation, forms
3. **Accessibility** - jest-axe for a11y violations
4. **Edge cases** - Empty states, error states
5. **Mobile responsiveness** - Test at different viewports

### E2E Test Checklist
- ✅ All routes accessible
- ✅ Navigation works (header links)
- ✅ Gallery lightbox opens/closes
- ✅ Keyboard navigation (Tab, Esc, arrows)
- ✅ Mobile menu toggle
- ✅ Images load correctly
- ✅ External links open in new tab
- ✅ 404 page for invalid routes

---

## Quick Reference: Before Every Commit

```bash
# Full quality check (run all)
npm run type-check && npm run lint && npm run format:check

# Or individually:
npm run type-check    # ✅ No TypeScript errors
npm run lint          # ✅ No ESLint warnings
npm run format:check  # ✅ Formatting consistent
npm run test          # ✅ All tests pass
npm run security:check # ✅ No high/critical vulnerabilities
```

## Quick Reference: Before Deployment

```bash
# 1. All quality checks
npm run type-check && npm run lint && npm run format:check

# 2. Tests
npm run test:coverage  # Must be >70%

# 3. Security
npm run security:check  # ZERO high/critical

# 4. Build
npm run build

# 5. Preview
npm run preview  # Test at http://localhost:4173
```

---

## Troubleshooting

### Build Fails
1. Check TypeScript errors: `npm run type-check`
2. Check for missing dependencies: `npm install`
3. Clear cache: `rm -rf node_modules/.vite`
4. Rebuild: `npm run build`

### Tests Fail
1. Update snapshots if needed: `npm test -- -u`
2. Check for missing mocks
3. Verify test environment setup

### Images Not Loading
1. Check WebP files exist: `ls public/images/*.webp`
2. Run optimization: `npm run optimize:images`
3. Verify paths in gallery.json
4. Check browser console for 404s

### High Bundle Size
1. Check bundle analysis in build output
2. Ensure code splitting with React.lazy()
3. Remove unused dependencies
4. Check for duplicate packages: `npm dedupe`

---

## File Structure Reference

```
bouncingleafdotcom/
├── public/
│   ├── images/              # All images (JPEG + WebP)
│   ├── .htaccess            # Apache config (security, caching)
│   ├── robots.txt           # SEO - search engine rules
│   ├── sitemap.xml          # SEO - page index
│   ├── manifest.json        # PWA manifest
│   ├── favicon.png          # Favicon (32x32)
│   ├── apple-touch-icon.png # iOS icon (180x180)
│   └── 404.html             # Fallback 404 page
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx    # Error handling
│   │   ├── OptimizedImage.tsx   # WebP image component
│   │   ├── Header.tsx           # Site header
│   │   └── ...
│   ├── pages/               # Route components
│   ├── data/
│   │   └── gallery.json     # Gallery metadata
│   ├── utils/
│   │   └── imageUtils.ts    # Image path utilities
│   └── App.tsx              # Main app with ErrorBoundary
├── scripts/
│   ├── optimize-images.js   # Batch image optimization
│   ├── create-favicon.js    # Favicon generation
│   └── audit-site.js        # Site quality audit
├── .github/workflows/
│   └── ci.yml               # CI/CD pipeline
├── CLAUDE.md                # Project context for Claude
├── MAINTENANCE_GUIDE.md     # This file
└── AUDIT_RESULTS.md         # Latest audit results
```

---

## Version History

- **2025-12-14**: Added Git Hooks & Common Patterns sections
  - Pre-commit hooks for quality checks and image processing
  - EXIF orientation handling for image conversions
  - ErrorBoundary testing patterns
  - act() warning fixes for lazy-loaded components
  - Favicon generation from custom icons
  - Improved test coverage to 88.7%

- **2025-12-12**: Initial maintenance guide created
  - Comprehensive quality checks documented
  - Security audit procedures defined
  - Image optimization workflow established
  - Error handling implemented
  - SEO metadata added

---

**Remember**: This is a living document. Update it when you add new features, tools, or workflows!
