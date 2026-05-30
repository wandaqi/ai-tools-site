"use client";

import { useState, useMemo } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        chars: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
        avgWordLength: 0,
        keywordDensity: [] as { word: string; count: number }[],
      };
    }

    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const wordCount = words.length;

    // Sentences
    const sentences = text
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraphs
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length || (text.trim() ? 1 : 0);

    // Reading time (average 238 words per minute)
    const readingTime = Math.ceil(wordCount / 238);

    // Speaking time (average 130 words per minute)
    const speakingTime = Math.ceil(wordCount / 130);

    // Average word length
    const avgWordLength =
      wordCount > 0
        ? Math.round(
            (words.reduce((sum, w) => sum + w.length, 0) / wordCount) * 10
          ) / 10
        : 0;

    // Keyword density (top 10 words, excluding common stop words)
    const stopWords = new Set([
      "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
      "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
      "this", "but", "his", "by", "from", "they", "we", "her", "she",
      "or", "an", "will", "my", "one", "all", "would", "there", "their",
      "what", "so", "up", "out", "if", "about", "who", "get", "which",
      "go", "me", "when", "make", "can", "like", "time", "no", "just",
      "him", "know", "take", "people", "into", "year", "your", "good",
      "some", "could", "them", "see", "other", "than", "then", "now",
      "look", "only", "come", "its", "over", "think", "also", "back",
      "after", "use", "two", "how", "our", "work", "first", "well",
      "way", "even", "new", "want", "because", "any", "these", "give",
      "day", "most", "us", "is", "was", "are", "been", "being", "had",
      "has", "were", "am", "does", "did",
    ]);

    const wordFrequency: Record<string, number> = {};
    words.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (clean && !stopWords.has(clean) && clean.length > 1) {
        wordFrequency[clean] = (wordFrequency[clean] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    return {
      words: wordCount,
      chars,
      charsNoSpaces,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      readingTime,
      speakingTime,
      avgWordLength,
      keywordDensity,
    };
  }, [text]);

  const StatBox = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Word Counter</h1>
        <p>
          Count words, characters, sentences, and analyze your text. Get reading
          time estimates and keyword density.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        <StatBox label="Words" value={stats.words.toLocaleString()} />
        <StatBox label="Characters" value={stats.chars.toLocaleString()} />
        <StatBox label="No Spaces" value={stats.charsNoSpaces.toLocaleString()} />
        <StatBox label="Sentences" value={stats.sentences} />
        <StatBox label="Paragraphs" value={stats.paragraphs} />
        <StatBox label="Avg Word" value={`${stats.avgWordLength} ch`} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatBox label="Reading Time" value={`${stats.readingTime} min`} />
        <StatBox label="Speaking Time" value={`${stats.speakingTime} min`} />
        <StatBox label="Characters" value={stats.chars.toLocaleString()} />
        <StatBox label="Words" value={stats.words.toLocaleString()} />
      </div>

      {/* Text Input */}
      <div className="mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to count words, characters, and analyze keyword density..."
          rows={12}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Keyword Density */}
      {stats.keywordDensity.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-700 mb-4">
            Top Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.keywordDensity.map(({ word, count }) => (
              <span
                key={word}
                className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm"
              >
                <span className="text-slate-700">{word}</span>
                <span className="text-slate-400 text-xs">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
