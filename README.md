# SiteSpark ✦

A small, responsive AI website-builder MVP. Describe a business or idea, get a polished one-page website draft, edit it in the browser, and export a standalone HTML file.

## Run it

No build step, dependencies, API key, or server required. Open `index.html` in a browser, or serve this folder locally:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Features

- Prompt-to-site first draft with starter prompts and lightweight in-browser business templates.
- Live desktop and mobile previews.
- Quick editing for site name, headline, introduction, call-to-action, and accent color.
- Autosaved project drafts in browser `localStorage`.
- Download a standalone, responsive HTML website.
- Publish instructions for free static hosting with GitHub Pages.

## Important MVP notes

This version uses local template logic in the browser; it does not call an AI model or send prompts to a service. There is no account system or cloud project storage. Projects are saved only in the current browser. “Publish” explains how to export the site and host it with GitHub Pages; it does not automatically deploy a site. GitHub Pages offers free hosting for public repositories, subject to GitHub's current terms and limits.

## Publish the builder itself with GitHub Pages

1. Push the project files to the repository's default branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
4. Visit the Pages URL GitHub provides.

For user-generated sites, export the HTML and deploy it to a static hosting provider, or place it in a separate repository and enable Pages there.
