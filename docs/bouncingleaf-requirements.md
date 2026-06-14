# BouncingLeaf.com Website Requirements Document

## Project Overview
Build a new portfolio/personal website for bouncingleaf.com to showcase artwork photography with written content pages. This is a low-maintenance site updated monthly at most, requiring minimal ongoing costs.

## Technical Stack

### Core Technology
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (for fast development and optimized builds)
- **Styling**: Tailwind CSS (minimalist, easy to maintain, widely documented)
- **Routing**: React Router v6
- **Photo Gallery**: React-photo-album or similar lightweight library
- **Image Optimization**: Sharp or Vite image optimization plugin

### Hosting & Deployment
- **Host**: DreamHost (shared hosting)
- **CI/CD**: GitHub Actions
- **Deployment Method**: rsync or FTP via GitHub Actions
- **SSL**: Let's Encrypt (free, via DreamHost)
- **Domain**: bouncingleaf.com (DNS via DreamHost)

## Site Structure & Content

### Pages Required
1. **Home/Landing Page**
   - Brief welcome/introduction
   - Featured artwork (2-3 pieces)
   - Navigation to other sections

2. **Gallery/Portfolio**
   - Photo gallery of artwork
   - Grid layout, responsive
   - Lightbox view for full-size images
   - Image lazy loading for performance
   - Categories or tags (optional, for future)

3. **About Page**
   - Personal/artist bio
   - Simple text content

4. **Additional Content Pages**
   - 2-3 pages with written content (exact content TBD)
   - Simple text with optional images/links

5. **404 Page**
   - Custom not-found page

### Navigation
- Simple header navigation (horizontal menu)
- Mobile-responsive hamburger menu
- Footer with copyright and basic links

## Functional Requirements

### Must Have
1. **Mobile-First Responsive Design**
   - Works perfectly on phones, tablets, desktops
   - Touch-friendly navigation
   - Responsive images

2. **Accessibility (WCAG 2.1 AA)**
   - Semantic HTML
   - Proper heading hierarchy
   - Alt text for all images
   - Keyboard navigation support
   - Sufficient color contrast
   - ARIA labels where needed

3. **Performance**
   - Fast page loads (<3 seconds)
   - Optimized images (WebP format with fallbacks)
   - Lazy loading for gallery images
   - Minimal JavaScript bundle size

4. **Photo Gallery Features**
   - Grid layout with consistent aspect ratios or masonry
   - Click to view full-size image
   - Keyboard navigation in lightbox (arrow keys, ESC)
   - Image captions (title, date, medium - optional)
   - Smooth transitions/animations

5. **SEO Basics**
   - Proper meta tags (title, description)
   - Open Graph tags for social sharing
   - Sitemap.xml
   - Robots.txt

### Nice to Have (if time permits)
- Dark mode toggle
- Print stylesheet
- Image loading skeleton/placeholder
- Smooth scroll behavior
- Animated page transitions

### Explicitly NOT Needed
- Contact forms
- Content Management System (CMS)
- User authentication
- Database
- Comments
- Analytics (can add later via script tag if needed)
- Newsletter signup
- Social media integration beyond basic links

## Content Management

### Image Assets
- Artist will provide images via Git (committed to repo)
- Images stored in `/public/images/` or similar
- Consider a `/public/images/gallery/` subfolder for artwork
- Include a JSON or TypeScript file to define gallery images with metadata:
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

### Text Content
- Markdown files for text-heavy pages (About, written content)
- Can use a simple markdown parser or store as TypeScript/JSON
- Whichever is easiest for artist to edit in GitHub

## Testing Requirements

### Automated Tests
1. **Unit Tests** (Vitest)
   - Test utility functions
   - Test React components in isolation
   - Aim for >70% code coverage on critical paths

2. **Component Tests** (React Testing Library)
   - Gallery component renders correctly
   - Navigation works
   - Routing functions properly
   - Accessibility checks (with jest-axe)

3. **End-to-End Tests** (Playwright or Cypress - choose one)
   - User can navigate site
   - Gallery lightbox opens and closes
   - Mobile navigation works
   - Pages load without errors
   - Links work correctly

4. **Build Test**
   - Verify build completes without errors
   - Check for build warnings
   - Verify output bundle size is reasonable

### Test Coverage Goals
- Minimum 70% code coverage
- 100% coverage on critical user flows (navigation, gallery)
- All pages render without console errors

## CI/CD Pipeline (GitHub Actions)

### Workflow Triggers
- Push to `main` branch
- Pull request to `main` branch

### Pipeline Steps
1. **Install Dependencies**
   - Use yarn (since current site uses it) or npm
   - Cache dependencies for faster builds

2. **Lint & Format Check**
   - ESLint (no errors)
   - Prettier (code formatting)
   - TypeScript type checking

3. **Run Tests**
   - Unit tests
   - Component tests
   - E2E tests (on PR and main)
   - Generate coverage report

4. **Build**
   - Production build with Vite
   - Verify no build errors
   - Output to `dist/` directory

5. **Deploy** (only on push to main, after tests pass)
   - Deploy to DreamHost via rsync/SFTP
   - Clear any necessary caches
   - Verify deployment success

### Deployment Credentials
- Store DreamHost FTP/SSH credentials as GitHub Secrets:
  - `DREAMHOST_HOST`
  - `DREAMHOST_USER`
  - `DREAMHOST_SSH_KEY` or `DREAMHOST_PASSWORD`
  - `DREAMHOST_DEPLOY_PATH`

## Design & Style Guidelines

### Visual Style
- **Aesthetic**: Clean, minimalist, art-focused
- **Color Palette**: Simple, neutral (let artwork stand out)
  - Background: white or light gray
  - Text: dark gray or black
  - Accent color for links/interactive elements
  - Consider artist's preference
- **Typography**: 
  - Use system fonts or a single Google Font
  - Clear hierarchy (h1, h2, h3)
  - Readable body text (16px minimum)
- **Layout**:
  - Generous white space
  - Maximum content width (e.g., 1200px) for readability
  - Consistent padding/margins

### Gallery Design
- Grid layout (3-4 columns on desktop, 2 on tablet, 1 on mobile)
- Equal height rows OR masonry layout (specify preference)
- Hover effect on gallery items (subtle)
- Lightbox: centered image, dark background, close button, arrows

## Browser Support
- Modern browsers (last 2 versions):
  - Chrome
  - Firefox
  - Safari
  - Edge
- Mobile browsers:
  - iOS Safari
  - Chrome Android

## Performance Budget
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Total page size: <2MB (excluding images loaded on demand)
- Lighthouse score: >90 on all metrics

## Security Considerations
- No user input, so minimal security concerns
- HTTPS only (via Let's Encrypt)
- No sensitive data stored
- Keep dependencies updated

## Documentation Needed
1. **README.md**
   - Project overview
   - Local development setup
   - How to add new images to gallery
   - How to add/edit content pages
   - Deployment process
   - Troubleshooting

2. **CONTRIBUTING.md** (optional)
   - Code style guidelines
   - How to run tests
   - How to submit changes

3. **Comments in Code**
   - Complex logic explained
   - Gallery component well-documented

## Project Structure
```
bouncingleaf-web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── public/
│   ├── images/
│   │   └── gallery/            # Artwork photos
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── Lightbox.tsx
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Gallery.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── data/
│   │   └── gallery.json        # Gallery image metadata
│   ├── styles/
│   │   └── index.css           # Tailwind imports
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

## Timeline & Phases

### Phase 1: Setup & Infrastructure
- Initialize new repo
- Set up development environment
- Configure Tailwind, ESLint, Prettier
- Set up testing frameworks
- Create basic project structure

### Phase 2: Core Components
- Layout component (header, footer)
- Routing setup
- Basic page templates

### Phase 3: Gallery Implementation
- Gallery grid component
- Lightbox component
- Image optimization
- Gallery data structure

### Phase 4: Content Pages
- Home page
- About page
- Additional content pages
- 404 page

### Phase 5: Polish & Testing
- Accessibility audit
- Performance optimization
- Write tests
- Mobile testing
- Cross-browser testing

### Phase 6: Deployment Setup
- Configure GitHub Actions
- Test deployment to staging (quietwoodspath.com)
- Document deployment process

## Questions for Artist (to answer before starting)

1. **Gallery Organization**: Do you want categories/tags for artwork, or one continuous gallery?

Answer: Gallery should be organized by project. I would be willing to have a consistent file naming scheme so that it's obvious from the folder structure and file name which project any given image file belongs to.

2. **Image Sizing**: What's your preferred gallery grid? (e.g., 3 columns, square crops vs. original aspect ratios)

Answer: Square crop is interesting. Would I be able to choose how the photo is cropped?

Also, can we automatically watermark the images somehow?

3. **Color Scheme**: Any specific colors you want for the brand? Or fully neutral?

Answer: Mostly neutral - let's start with a not-quite-black text (maybe #383838?) on a white background. Let's define a primary accent color (for buttons, perhaps) and initially set it to #3079C2 and a secondary accent color (for any small decorative elements, perhaps) and initially set it to #F68E61. A dark mode can flip the black and white, I suppose.

4. **Home Page**: What should the home page emphasize? (featured artwork, bio, both?)

Answer: Home page should be more minimalist than it is now. A little featured artwork, and a menu to link to other content including the full gallery.

5. **Navigation**: What order should pages appear in the menu?

Writing - A brief page about the book I'm writing, plus links to anything written on this site
Art - The full gallery, plus some notes about other people's art
About - The about me page

6. **Content**: Do you want to migrate existing content from current site, or start fresh?

All of the images can be migrated, but otherwise I'd like to start fresh.

7. **Future Features**: Anything you might want to add later? (blog, shop, mailing list)

Possibly a shop later, but it would likely be only a link to a shop hosted on another site.

## Success Criteria
- [ ] Site loads quickly on mobile and desktop
- [ ] All images display correctly with proper alt text
- [ ] Gallery is intuitive and easy to navigate
- [ ] Site is accessible (passes WAVE or axe DevTools scan)
- [ ] Tests pass in CI/CD
- [ ] Automatic deployment works reliably
- [ ] Artist can easily add new images, text, or design updates by committing to GitHub
- [ ] Code is well-documented and maintainable
- [ ] No console errors in browser

## Additional Notes
- Keep it simple - artist updates infrequently
- Prioritize maintainability over features
- Use well-supported, stable libraries
- Avoid build complexity
- Document everything for future reference
