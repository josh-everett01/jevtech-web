#!/usr/bin/env bash
set -euo pipefail

required=(
  "package.json"
  "app/page.tsx"
  "app/layout.tsx"
  "app/globals.css"
  "components/jevtech/JevTechPortfolioHome.tsx"
  "lib/jevtech-themes.ts"
  "public/images/themes/cosmic-hero.png"
  "public/images/themes/dark-hero.png"
  "public/images/themes/light-hero.png"
  "public/resume.pdf"
)

for file in "${required[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Missing: $file"
    exit 1
  fi
done

echo "JevTech portfolio project files are present."
