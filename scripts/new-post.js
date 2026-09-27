// Usage: npm run new -- "My post title"            -> src/posts/YYYY-MM-DD-my-post-title.md
//        npm run new -- --video "My video title"   -> src/videos/YYYY-MM-DD-my-video-title.md
import { existsSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const isVideo = args[0] === "--video";
const title = (isVideo ? args.slice(1) : args).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new -- [--video] "Title of the thing"');
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const file = `src/${isVideo ? "videos" : "posts"}/${date}-${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

const frontMatter = isVideo
  ? `title: ${JSON.stringify(title)}\ndate: ${date}\ndraft: true\nyoutube: ""\ntags: []`
  : `title: ${JSON.stringify(title)}\ndate: ${date}\ndraft: true\nsummary: ""\ntags: []`;

writeFileSync(file, `---\n${frontMatter}\n---\n\n`);
console.log(`Created ${file} (draft — remove "draft: true" to publish)`);
