"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800 hover:text-primary transition-colors">
          <span className="text-2xl">🛠️</span>
          <span>FreeToolBox</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/tools/ai-writer" className="hover:text-primary transition-colors">AI Writer</Link>
          <Link href="/tools/seo-generator" className="hover:text-primary transition-colors">SEO Tools</Link>
          <Link href="/tools/text-summarizer" className="hover:text-primary transition-colors">Summarizer</Link>
          <Link href="/tools/prompt-optimizer" className="hover:text-primary transition-colors">Prompt Optimizer</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-slate-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/tools/ai-writer" className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMenuOpen(false)}>AI Writer</Link>
          <Link href="/tools/seo-generator" className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMenuOpen(false)}>SEO Tools</Link>
          <Link href="/tools/text-summarizer" className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMenuOpen(false)}>Summarizer</Link>
          <Link href="/tools/prompt-optimizer" className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMenuOpen(false)}>Prompt Optimizer</Link>
        </div>
      )}
    </header>
  );
}
