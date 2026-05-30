"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: Client component can't export metadata, but Next.js handles this
// We rely on the parent layout for base SEO

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setOutput("");
    }
  };

  const handleMinify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setOutput("");
    }
  };

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(input);
      setError("");
      setOutput(`✅ Valid JSON\n\nType: ${Array.isArray(parsed) ? "Array" : typeof parsed === "object" ? "Object" : typeof parsed}\nKeys count: ${typeof parsed === "object" && parsed !== null ? Object.keys(parsed).length : "N/A"}\nSize: ${input.length} characters`);
    } catch (err) {
      setError(`❌ Invalid JSON: ${(err as Error).message}`);
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>JSON Formatter</h1>
        <p>Format, validate, and beautify JSON data. Make messy JSON readable.</p>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Paste your JSON
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name":"John","age":30,"city":"New York"}'
          rows={10}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm resize-y"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={handleFormat}
          disabled={!input.trim()}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark disabled:opacity-50 transition-all"
        >
          ✨ Format
        </button>
        <button
          onClick={handleMinify}
          disabled={!input.trim()}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 disabled:opacity-50 transition-all"
        >
          📦 Minify
        </button>
        <button
          onClick={handleValidate}
          disabled={!input.trim()}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 disabled:opacity-50 transition-all"
        >
          ✅ Validate
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 text-slate-500 text-sm hover:text-slate-700 transition-colors"
        >
          🗑️ Clear
        </button>

        <label className="flex items-center gap-2 ml-auto text-sm text-slate-500">
          Indent:
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="border border-slate-300 rounded px-2 py-1 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className={`mb-4 p-4 rounded-lg text-sm ${error.startsWith("✅") ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          <pre className="whitespace-pre-wrap font-sans">{error}</pre>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-600">Result</span>
            <button
              onClick={handleCopy}
              className="text-xs px-3 py-1 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>
          <pre className="p-4 text-sm font-mono text-slate-700 overflow-auto max-h-96 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
