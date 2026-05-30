import AIInput from "@/components/AIInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Writer - Free AI Article Generator",
  description:
    "Generate high-quality articles, blog posts, and content with AI. Enter a topic and get well-structured content instantly. Free, no sign-up required.",
};

const SYSTEM_PROMPT = `You are a professional content writer. Write high-quality, well-structured articles.
Use clear headings, bullet points where appropriate, and a natural engaging tone.
Make the content informative, accurate, and valuable to the reader.
Include an introduction and conclusion. Format with markdown headings (##) for sections.`;

export default function AIWriterPage() {
  return (
    <AIInput
      title="AI Writer"
      description="Generate high-quality articles, blog posts, and content with AI. Enter a topic below and get well-structured content instantly."
      placeholder="Enter a topic or title for your article, e.g.: '10 Tips for Better Sleep Quality' or 'How to Start a Home Garden for Beginners'"
      systemPrompt={SYSTEM_PROMPT}
      inputLabel="Article Topic"
      outputLabel="Generated Article"
      maxTokens={2048}
      showExample="Write a comprehensive guide about 'How to Start a Successful Blog in 2025'. Include practical steps, tools needed, and monetization strategies."
    />
  );
}
