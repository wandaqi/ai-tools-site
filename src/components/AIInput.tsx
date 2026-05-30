"use client";

import { useState, useRef } from "react";

interface AIInputProps {
  title: string;
  description: string;
  placeholder: string;
  systemPrompt: string;
  inputLabel?: string;
  outputLabel?: string;
  maxTokens?: number;
  temperature?: number;
  showExample?: string;
}

export default function AIInput({
  title,
  description,
  placeholder,
  systemPrompt,
  inputLabel = "Your Input",
  outputLabel = "AI Result",
  maxTokens = 1024,
  temperature = 0.7,
  showExample,
}: AIInputProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
      if (!apiKey) {
        throw new Error("API key not configured. Please set NEXT_PUBLIC_DEEPSEEK_API_KEY.");
      }

      const messages: Array<{ role: string; content: string }> = [];
      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
      }
      messages.push({ role: "user", content: input.trim() });

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages,
          max_tokens: maxTokens,
          temperature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data.error?.message || `Error: ${response.status}`;
        throw new Error(errMsg);
      }

      setResult(data.choices?.[0]?.message?.content || "No output generated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseExample = () => {
    if (showExample) {
      setInput(showExample);
    }
  };

  return (
    <div className="tool-container">
      {/* Header */}
      <div className="tool-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 block">
            {inputLabel}
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={6}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y text-slate-800 placeholder-slate-400"
            disabled={loading}
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Generating...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate
              </>
            )}
          </button>

          {showExample && (
            <button
              type="button"
              onClick={handleUseExample}
              disabled={loading}
              className="text-sm text-slate-500 hover:text-primary transition-colors underline"
            >
              Use example
            </button>
          )}
        </div>
      </form>

      {/* Error display */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Result Section */}
      {(result || loading) && (
        <div ref={resultRef} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-600">
              {loading ? "Generating..." : outputLabel}
            </span>
            {result && (
              <button
                onClick={handleCopy}
                className="text-xs px-3 py-1 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            )}
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-400 py-8 justify-center">
                <span className="animate-spin text-xl">⏳</span>
                <span>AI is working on it...</span>
              </div>
            ) : (
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
                {result}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
