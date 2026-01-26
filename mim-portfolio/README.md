# Pooja T S R - Portfolio Website

Professional portfolio website for Master in Management (MiM) application to European business schools.

## Overview

This portfolio website supports the MiM application by presenting:
- Professional background and motivation
- Experience and project highlights
- Leadership roles and impact
- Academic credentials
- Skills and recognitions

## Tech Stack

- React 19 + Vite
- Vanilla CSS (European academic aesthetic)
- GitHub Pages deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Option 1: Using gh-pages package

```bash
# Install gh-pages (already in devDependencies)
npm install

# Deploy
npm run deploy
```

### Option 2: Manual GitHub Pages setup

1. Build the project: `npm run build`
2. Push the `dist` folder contents to the `gh-pages` branch
3. Enable GitHub Pages in repository settings, selecting the `gh-pages` branch

### Option 3: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: mim-portfolio/package-lock.json

      - name: Install and Build
        working-directory: mim-portfolio
        run: |
          npm ci
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: mim-portfolio/dist
```

## Placeholders to Update

Before deployment, update these placeholders with actual files:

### Resume PDF
- Location: `public/documents/Pooja_TSR_Resume.pdf`
- This is linked from the Home page and Contact section

### Certificate Links
The following proofs are referenced in modals. Update the `proofContent` objects in the respective components to add actual document links:

1. **Experience.jsx** - Legal Pro AI, AAVIN, Ashok Leyland certificates
2. **Leadership.jsx** - NSS, Speakers Forum, venture documentation
3. **Awards.jsx** - All award certificates

### Contact Information
- Update email in `Contact.jsx` (currently: `pooja.tsr@email.com`)

## Project Structure

```
mim-portfolio/
├── public/
│   ├── documents/          # PDF resume and certificates
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Leadership.jsx
│   │   ├── Academic.jsx
│   │   ├── Skills.jsx
│   │   ├── Awards.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Modal.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Design Notes

- **Typography**: Libre Baskerville (serif headings), Source Sans 3 (body)
- **Colors**: Soft off-white background (#faf9f7), muted accent colors
- **Style**: Minimal European academic aesthetic
- **Responsive**: Mobile-first with smooth transitions
