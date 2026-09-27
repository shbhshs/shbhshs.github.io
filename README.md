# shbhshs.github.io

Personal site and blog, built with [Eleventy](https://www.11ty.dev/) and deployed to
GitHub Pages by GitHub Actions. Posts are plain Markdown — no HTML to maintain.

## Quick start

```sh
npm install
npm start          # dev server at http://localhost:8080 with live reload (drafts visible)
npm run build      # production build into _site/ (drafts excluded)
```

## Writing

```sh
npm run new -- "Why I switched to Neovim"          # -> src/posts/YYYY-MM-DD-why-i-switched-to-neovim.md
npm run new -- --video "Building a CLI in Go"      # -> src/videos/YYYY-MM-DD-building-a-cli-in-go.md
```

New files start as drafts. Write, preview with `npm start`, then delete `draft: true` and push.

### Post front matter

```yaml
---
title: My post            # required
date: 2026-09-27          # defaults to the date in the filename
summary: One-liner for lists, previews and meta description
tags: [go, databases]     # each tag gets a page at /tags/<tag>/
draft: true               # optional; hidden from production builds
youtube: VIDEO_ID         # optional; embeds a video at the top of the post
---
```

The URL is `/blog/<filename-without-date>/`.

### Shortcodes you can use in Markdown

| Shortcode | Output |
| --- | --- |
| `{% youtube "VIDEO_ID" %}` | Responsive YouTube embed (privacy-enhanced domain) |
| `{% vimeo "VIDEO_ID" %}` | Responsive Vimeo embed |
| `{% video "/assets/media/clip.mp4" %}` | Self-hosted video player |
| `{% callout "note" %}…{% endcallout %}` | Highlighted box (`note`, `warning`, `danger`) |

Fenced code blocks are syntax-highlighted at build time. Images go in `src/assets/img/`
and are referenced as `/assets/img/name.png`.

### Videos

Each file in `src/videos/` is one video entry, listed at `/videos/` with its own page.
Set one of `youtube`, `vimeo` or `src` in the front matter; `thumbnail` is optional.
See `src/videos/2026-09-27-example-video.md`.

## Customising

- **Name, bio, social links, nav** → `src/_data/site.js`
- **About page** → `src/pages/about.md`
- **Styles** → `src/assets/css/style.css` (colours are CSS variables at the top; light & dark)
- **Layouts** → `src/_includes/layouts/` (`base`, `post`, `video`, `page`)
- **Shortcodes, filters, collections** → `eleventy.config.js`

### Adding a new section

Want e.g. `/projects/` or `/talks/`?

1. Create `src/projects/` with a `projects.json` setting `layout`, `tags: ["projects"]` and `permalink`
   (copy `src/videos/videos.json`).
2. Add a collection in `eleventy.config.js` (copy the `videos` one).
3. Add a listing page in `src/pages/` (copy `videos.njk`) and a nav entry in `src/_data/site.js`.

## Layout

```
src/
  _data/site.js        site settings
  _includes/           layouts + partials (Nunjucks)
  assets/              css, js, images → /assets/
  static/              copied to the site root as-is (favicon, robots.txt, CNAME…)
  pages/               home, blog index, videos, tags, about, 404, sitemap
  posts/               blog posts (Markdown)
  videos/              video entries (Markdown)
eleventy.config.js     plugins, collections, filters, shortcodes
.github/workflows/     build & deploy to GitHub Pages
```

## Deployment

Pushing to `master` builds and deploys automatically. One-time setup: in the repo's
**Settings → Pages**, set **Source** to **GitHub Actions**.
