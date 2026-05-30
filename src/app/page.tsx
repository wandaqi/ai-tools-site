import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AdSpace from "@/components/AdSpace";

const tools = [
  {
    title: "AI Writer",
    description:
      "Generate high-quality articles, blog posts, and content with AI. Just enter a topic and get well-structured content instantly.",
    href: "/tools/ai-writer",
    icon: "✍️",
    badge: "AI",
  },
  {
    title: "SEO Meta Generator",
    description:
      "Generate SEO-optimized titles and meta descriptions for your web pages. Boost your click-through rate in search results.",
    href: "/tools/seo-generator",
    icon: "🎯",
    badge: "AI",
  },
  {
    title: "Text Summarizer",
    description:
      "Summarize long articles, documents, or any text into concise key points. Save time reading with AI-powered summarization.",
    href: "/tools/text-summarizer",
    icon: "📝",
    badge: "AI",
  },
  {
    title: "Prompt Optimizer",
    description:
      "Transform vague prompts into clear, detailed instructions that get better results from any AI model.",
    href: "/tools/prompt-optimizer",
    icon: "🔮",
    badge: "AI",
  },
  {
    title: "JSON Formatter",
    description:
      "Format, validate, and beautify JSON data. Make messy JSON readable with syntax highlighting and tree view.",
    href: "/tools/json-formatter",
    icon: "📋",
  },
  {
    title: "Password Generator",
    description:
      "Generate strong, secure passwords with customizable length and character sets. Keep your accounts safe.",
    href: "/tools/password-generator",
    icon: "🔐",
  },
  {
    title: "Color Palette Generator",
    description:
      "Generate beautiful color palettes for your design projects. Get hex codes and preview colors in real-time.",
    href: "/tools/color-palette",
    icon: "🎨",
  },
  {
    title: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs. Analyze reading time and keyword density of your text.",
    href: "/tools/word-counter",
    icon: "📊",
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Free Online Tools{" "}
          <span className="text-primary">Powered by AI</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          No sign-up required. No data stored. Just free, fast, and useful tools
          to help you work smarter every day.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-slate-200">
            ✅ 100% Free
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-slate-200">
            🚀 No Registration
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-slate-200">
            🔒 Privacy First
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full border border-slate-200">
            🤖 AI-Powered
          </span>
        </div>
      </section>

      {/* Ad Space - Top */}
      <AdSpace className="mb-12" />

      {/* Tools Grid */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">All Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 text-center bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-10 text-white">
        <h2 className="text-2xl font-bold mb-2">All Tools Are Free Forever</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          We believe useful tools should be accessible to everyone. No paywalls,
          no forced registration. Just free tools.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/tools/ai-writer"
            className="inline-flex items-center px-5 py-2.5 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Try AI Writer →
          </Link>
          <Link
            href="/tools/seo-generator"
            className="inline-flex items-center px-5 py-2.5 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
          >
            Try SEO Tools →
          </Link>
        </div>
      </section>

      {/* Ad Space - Bottom */}
      <AdSpace className="mt-12" />
    </div>
  );
}
