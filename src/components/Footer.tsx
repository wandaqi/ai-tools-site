import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-slate-800 mb-3">FreeToolBox</h3>
            <p className="text-sm text-slate-500">
              Free online tools powered by AI. No sign-up required. All tools are free to use.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-3">Popular Tools</h3>
            <ul className="space-y-1 text-sm text-slate-500">
              <li><Link href="/tools/ai-writer" className="hover:text-primary transition-colors">AI Writer</Link></li>
              <li><Link href="/tools/seo-generator" className="hover:text-primary transition-colors">SEO Meta Generator</Link></li>
              <li><Link href="/tools/text-summarizer" className="hover:text-primary transition-colors">Text Summarizer</Link></li>
              <li><Link href="/tools/prompt-optimizer" className="hover:text-primary transition-colors">Prompt Optimizer</Link></li>
              <li><Link href="/tools/password-generator" className="hover:text-primary transition-colors">Password Generator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-3">Support Us</h3>
            <p className="text-sm text-slate-500 mb-2">
              All tools are free. If you find them useful, buy us a coffee ☕
            </p>
            <a
              href="https://afdian.com/a/%E7%94%B5%E5%8E%82"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors font-medium"
            >
              ☕ Support on Afdian
            </a>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-100 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} FreeToolBox. All tools are free. No registration needed.
        </div>
      </div>
    </footer>
  );
}
