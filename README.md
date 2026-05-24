# JevTech Portfolio Project

A Next.js portfolio starter based on the Mission Light / Mission Dark / Mission Cosmic mockups.

## Included

- Next.js app router project
- Tailwind CSS setup
- Light / Dark / Cosmic theme switcher
- Home, About, Projects, Contact views
- Back Home navigation
- Download Resume button wired to `/resume.pdf`
- Real theme hero images copied to `public/images/themes/`
- Golden-ratio / Fibonacci spiral SVG overlay

## Run locally

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Theme image paths

The app expects:

```txt
public/images/themes/cosmic-hero.png
public/images/themes/dark-hero.png
public/images/themes/light-hero.png
```

Those images are already included in this ZIP.

## Resume

Replace this placeholder with your real resume:

```txt
public/resume.pdf
```

## Smoke check

After running the site in the browser, open the console and run:

```js
window.__JEVTECH_PORTFOLIO_TESTS__()
```
