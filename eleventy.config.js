import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import site from "./src/_data/site.js";

const isProduction = process.env.ELEVENTY_ENV === "production";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: site.title,
      subtitle: site.description,
      base: site.url,
      author: { name: site.author.name },
    },
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Drafts (`draft: true` in front matter) show up in `npm start` but are skipped in production builds.
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (isProduction && data.draft) return false;
  });

  // ---- Collections -------------------------------------------------------
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/**/*.md").reverse()
  );
  eleventyConfig.addCollection("videos", (api) =>
    api.getFilteredByGlob("src/videos/**/*.md").reverse()
  );
  // Every tag used by posts or videos, except internal ones.
  eleventyConfig.addCollection("tagList", (api) => {
    const tags = new Set();
    for (const item of api.getAll()) {
      for (const tag of item.data.tags || []) tags.add(tag);
    }
    return [...tags].filter((t) => !["all", "posts", "videos"].includes(t)).sort();
  });

  // ---- Filters -----------------------------------------------------------
  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("head", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : arr));
  eleventyConfig.addFilter("publicTags", (tags = []) => tags.filter((t) => !["posts", "videos"].includes(t)));
  eleventyConfig.addFilter("readingTime", (content = "") => {
    const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 220))} min read`;
  });
  eleventyConfig.addFilter("withTag", (items, tag) => items.filter((i) => (i.data.tags || []).includes(tag)));

  // ---- Shortcodes (usable inside any Markdown post) ----------------------
  // {% youtube "dQw4w9WgXcQ" %}  or  {% youtube "dQw4w9WgXcQ", "Optional title" %}
  eleventyConfig.addShortcode("youtube", (id, title = "YouTube video") =>
    `<div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
  );
  // {% vimeo "76979871" %}
  eleventyConfig.addShortcode("vimeo", (id, title = "Vimeo video") =>
    `<div class="embed"><iframe src="https://player.vimeo.com/video/${id}" title="${title}" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`
  );
  // {% video "/assets/media/demo.mp4" %}  — self-hosted file
  eleventyConfig.addShortcode("video", (src, poster = "") =>
    `<div class="embed"><video src="${src}"${poster ? ` poster="${poster}"` : ""} controls preload="metadata" playsinline></video></div>`
  );
  // {% callout "warning" %}Markdown **works** here{% endcallout %}
  eleventyConfig.addPairedShortcode("callout", (content, kind = "note") =>
    `<aside class="callout callout-${kind}">\n\n${content}\n\n</aside>`
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
