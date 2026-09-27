---
title: "Hello, world: how this site is built"
date: 2026-09-27
summary: A tour of the setup behind this blog — Markdown in, static HTML out, deployed by GitHub Actions.
tags: [meta, eleventy, web]
---

Welcome! This is the first post on the new site. It seemed fitting to start
by writing about how the site itself works.

## The short version

- Every post is a **Markdown file** in `src/posts/`.
- [Eleventy](https://www.11ty.dev/) turns those files into plain HTML using a
  few [Nunjucks](https://mozilla.github.io/nunjucks/) layouts.
- A GitHub Actions workflow builds the site and publishes it to GitHub Pages on
  every push to `master`.

No JavaScript framework, no database — just files.

## Writing a post

A post is a Markdown file with a small header ("front matter"):

```markdown
---
title: My new post
date: 2026-10-01
summary: One line that shows up in lists and link previews.
tags: [go, databases]
---

Post body goes here.
```

Code blocks get syntax highlighting at build time:

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

{% callout "note" %}
Callouts are handy for **side notes**. Use `"warning"` or `"danger"` for louder ones.
{% endcallout %}

## Embedding videos

Videos can go straight into a post with a shortcode:

```text
{{ '{% youtube "VIDEO_ID" %}' }}
```

…and there's a dedicated [Videos](/videos/) section for standalone ones.

That's it. More soon.
