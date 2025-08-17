# PNPL Website

The official website for the Parker Jones Neural Processing Lab at Oxford Robotics Institute.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **Typography**: Geist font family
- **Markdown**: KaTeX for mathematical expressions
- **Deployment**: Static export ready

## Key Features

### Interactive 3D Hero Section
- ASCII-rendered 3D brain model using Three.js
- Real-time rotation and custom character mapping
- Responsive design with dynamic scaling

### Dynamic Content
- Real publication data from Google Scholar
- Expandable abstracts with formatted content
- Responsive table of contents for blog posts
- Mathematical expression rendering with KaTeX

### Blog System
- Markdown-based blog posts with frontmatter
- Citation management with BibTeX export
- Tag-based filtering
- Responsive design with TOC that hides near footer

### Navigation
- Context-aware navigation (scrolling vs. page navigation)
- Fixed header with blur effects
- Smooth scrolling between sections

### Performance Optimizations
- Static generation with `export` command
- Image optimization with Next.js Image component
- Font optimization with `next/font`
- Component-level code splitting

## Development

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site
npm run export

# Serve production build locally
npm start
```

### Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx   # Context-aware navigation
│   │   ├── HeroAscii3D.tsx  # 3D ASCII brain animation
│   │   ├── Publications.tsx # Research publications
│   │   ├── Team.tsx         # Team member grid
│   │   ├── Footer.tsx       # Site footer with logos
│   │   └── ...
│   ├── blog/               # Blog pages and components
│   └── globals.css         # Global styles and CSS utilities
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
└── content/               # Blog posts and content
```

### Content Management

#### Adding Publications
Edit `src/app/components/Publications.tsx` and add entries to the `publications` array:

```typescript
{
  title: "Paper Title",
  authors: ["Author 1", "Author 2"],
  venue: "Conference/Journal",
  year: 2025,
  arxiv: "2XXX.XXXXX", // Optional
  doi: "10.1000/...",  // Optional
  description: "Brief description",
  abstract: "Full abstract text",
  featured: true // Optional
}
```

#### Adding Blog Posts
1. Create markdown files in `content/` directory
2. Include frontmatter with metadata
3. Use KaTeX syntax for mathematical expressions
4. Blog posts auto-generate table of contents from headings

### Styling Guidelines

- Uses CSS-in-JS with inline styles for component-scoped styling
- Global styles in `globals.css` for reusable patterns
- Responsive design with `clamp()` and media queries
- Dark/light theme support via CSS custom properties

### Deployment

The site is configured for static export:

```bash
npm run build && npm run export
```

This generates a `out/` directory that can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

### Performance Notes

- All components use Next.js optimization features
- Images are optimized with `next/image`
- Fonts are self-hosted and optimized
- 3D models are compressed (.glb format)
- Static generation eliminates runtime overhead

## Browser Support

- Modern browsers with ES2020+ support
- WebGL support required for 3D features
- Responsive design supports mobile and desktop