// Site-wide settings. Edit these to make the site yours.
export default {
  title: "Shubham Singh",
  description: "Notes, write-ups and videos — mostly about software and tech.",
  url: "https://shbhshs.github.io",

  author: {
    name: "Shubham Singh",
    role: "Software Engineer",
    location: "India",
    // Swap for a real photo: drop e.g. avatar.jpg into src/assets/img/ and point to it here.
    avatar: "/assets/img/avatar.svg",
    tagline: "I build software, break it, and write down what I learn along the way.",
    bio: "Welcome to my corner of the internet. I work on backend systems and developer tooling, and I use this site to share write-ups, notes and the occasional video about the things I'm building.",
    // Short line shown on the badge under your photo. Set to "" to hide it.
    status: "Open to interesting conversations",
    email: "", // e.g. "you@example.com" — enables the "Say hello" button and email icon
  },

  // Reach-out links. `icon` must be one of: linkedin, x, github, youtube, email, rss, instagram, mastodon, link.
  // Remove the ones you don't use; replace the placeholder URLs with your own.
  social: [
    { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/your-handle" },
    { name: "X / Twitter", icon: "x", url: "https://x.com/your-handle" },
    { name: "GitHub", icon: "github", url: "https://github.com/shbhshs" },
    { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@your-handle" },
    { name: "RSS", icon: "rss", url: "/feed.xml" },
  ],

  // "Now" — what you're up to these days (https://nownownow.com/about). Keep it short.
  now: [
    "Building backend services and the tooling around them",
    "Learning more about distributed systems",
    "Writing here more often",
  ],

  // Tools and technologies you enjoy. Shown as chips on the home and about pages.
  stack: ["Go", "Python", "TypeScript", "PostgreSQL", "Kubernetes", "AWS", "Linux", "Neovim"],

  // Top navigation. Add an entry here when you add a new section.
  nav: [
    { label: "Blog", url: "/blog/" },
    { label: "Videos", url: "/videos/" },
    { label: "Tags", url: "/tags/" },
    { label: "About", url: "/about/" },
  ],
};
