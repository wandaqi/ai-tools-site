import AIInput from "@/components/AIInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Meta Generator - Free Title & Description Generator",
  description:
    "Generate SEO-optimized titles and meta descriptions. Boost your click-through rate in search results. Free tool, no sign-up needed.",
};

const SYSTEM_PROMPT = `You are an SEO expert. Generate SEO-optimized page titles and meta descriptions.
Follow these rules:
1. Title: 50-60 characters, include primary keyword, be compelling
2. Meta description: 145-160 characters, include keywords naturally, add a call to action
3. Output in this format:
**Title:** [generated title] (XX characters)
**Meta Description:** [generated meta description] (XX characters)
**Keywords:** [3-5 relevant keywords]
**Why this works:** [brief explanation of SEO strategy]`;

export default function SEOGeneratorPage() {
  return (
    <AIInput
      title="SEO Meta Generator"
      description="Generate SEO-optimized titles and meta descriptions for your web pages. Boost your click-through rate in Google search results."
      placeholder="Describe your page content, e.g.: 'A beginner's guide to yoga for stress relief, covering basic poses, breathing techniques, and benefits for mental health'"
      systemPrompt={SYSTEM_PROMPT}
      inputLabel="Page Content Description"
      outputLabel="SEO Meta Tags"
      maxTokens={512}
      showExample="A comprehensive review of the best budget noise-cancelling headphones under $100, comparing sound quality, comfort, and battery life for remote workers and students"
    />
  );
}
