import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Free Tools & AI Tips",
  description:
    "Learn about AI tools, SEO tips, content creation, and productivity. Free guides to help you work smarter.",
};

const posts = [
  {
    slug: "best-developer-tools-no-signup",
    title: "15 Best Free Online Developer Tools in 2025 (No Sign-Up, No Tracking)",
    excerpt:
      "A curated list of the best free online tools for developers: JSON formatters, password generators, color palettes, word counters, and AI writing tools. All privacy-first.",
    date: "2025-05-30",
    readTime: "7 min read",
    category: "Tools",
  },
  {
    slug: "json-formatter-comparison",
    title: "Best JSON Formatter Tools Compared: Why Every Developer Needs One",
    excerpt:
      "Compare the top free JSON formatter tools in 2025. Learn why JSON formatting matters, common errors to avoid, and which tools actually respect your privacy.",
    date: "2025-05-28",
    readTime: "6 min read",
    category: "JSON",
  },
  {
    slug: "online-tools-privacy",
    title: "Browser-Based Tools Are the Future: Why Privacy Matters in Online Tools",
    excerpt:
      "Server-based tools can log your data. Browser-based tools keep everything local. Learn why privacy-first tools are gaining traction in 2025.",
    date: "2025-05-26",
    readTime: "5 min read",
    category: "Privacy",
  },
  {
    slug: "best-free-ai-writing-tools",
    title: "10 Best Free AI Writing Tools in 2025 (No Sign-Up Required)",
    excerpt:
      "Discover the best free AI writing tools that don't require registration. Compare features, output quality, and ease of use for bloggers, marketers, and content creators.",
    date: "2025-05-25",
    readTime: "6 min read",
    category: "AI Tools",
  },
  {
    slug: "how-to-write-better-ai-prompts",
    title: "How to Write Better AI Prompts: The Complete Guide for Beginners",
    excerpt:
      "Learn the art of prompt engineering. Transform vague requests into clear instructions that get amazing results from ChatGPT, Claude, and other AI models.",
    date: "2025-05-20",
    readTime: "8 min read",
    category: "AI Guide",
  },
  {
    slug: "seo-meta-description-guide",
    title: "SEO Meta Descriptions: Best Practices & Free Generator Tool",
    excerpt:
      "Everything you need to know about writing SEO meta descriptions that boost click-through rates. Includes examples, character limits, and our free generator tool.",
    date: "2025-05-15",
    readTime: "5 min read",
    category: "SEO",
  },
  {
    slug: "free-online-tools-for-developers",
    title: "15 Free Online Tools Every Developer Should Bookmark",
    excerpt:
      "A curated list of free online tools for developers: JSON formatters, code beautifiers, password generators, and more. All free, no registration required.",
    date: "2025-05-10",
    readTime: "7 min read",
    category: "Tools",
  },
  {
    slug: "ai-content-creation-workflow",
    title: "AI Content Creation Workflow: From Idea to Published Article",
    excerpt:
      "Build a complete content creation workflow using free AI tools. Learn how to research, outline, write, and optimize articles with AI assistance.",
    date: "2025-05-05",
    readTime: "9 min read",
    category: "AI Guide",
  },
  {
    slug: "password-security-best-practices",
    title: "Password Security Best Practices: How to Create and Manage Strong Passwords",
    excerpt:
      "Learn why strong passwords matter, how to create them, and the best free tools to manage your password security in 2025.",
    date: "2025-05-01",
    readTime: "6 min read",
    category: "Security",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Blog</h1>
        <p className="text-lg text-slate-500">
          Free guides and tips about AI tools, SEO, content creation, and productivity.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-slate-500">{post.excerpt}</p>
          </Link>
        ))}
      </div>

      {/* Ad Space */}
      <div className="mt-12 bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-wider">Advertisement</p>
        <div className="h-[90px] flex items-center justify-center">
          <span className="text-sm text-slate-400">
            Ad space — Monetize with Google AdSense
          </span>
        </div>
      </div>
    </div>
  );
}
