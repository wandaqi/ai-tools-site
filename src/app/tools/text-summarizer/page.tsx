import AIInput from "@/components/AIInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Summarizer - Free AI Summary Generator",
  description:
    "Summarize long articles, documents, or any text into concise key points. Save reading time with AI-powered summarization. Free online tool.",
};

const SYSTEM_PROMPT = `You are a text summarization expert. Summarize the given text clearly and concisely.
Follow these rules:
1. Start with a one-sentence TL;DR summary
2. Then provide 3-5 key bullet points
3. Keep the summary concise but capture all important information
4. Use clear, simple language
5. Format with markdown: use **bold** for key terms`;

export default function TextSummarizerPage() {
  return (
    <AIInput
      title="Text Summarizer"
      description="Summarize long articles, documents, or any text into concise key points. Save time reading with AI-powered summarization."
      placeholder="Paste the text you want to summarize here. Can be an article, email, report, or any long-form content..."
      systemPrompt={SYSTEM_PROMPT}
      inputLabel="Text to Summarize"
      outputLabel="Summary"
      maxTokens={1024}
      showExample="Artificial intelligence has transformed modern business operations across virtually every sector. From automated customer service chatbots that handle millions of queries daily to predictive analytics that help companies forecast demand with unprecedented accuracy, AI is reshaping how organizations function. Machine learning algorithms now process vast datasets to identify patterns humans would miss, enabling everything from fraud detection in banking to personalized recommendations in e-commerce. The healthcare industry has seen particularly dramatic changes, with AI-assisted diagnosis achieving accuracy rates comparable to experienced radiologists in detecting certain cancers. Meanwhile, manufacturing has embraced AI-powered quality control systems that can spot defects in real-time, reducing waste by up to 30%. However, challenges remain: data privacy concerns, algorithmic bias, and workforce displacement are serious issues that need addressing. Despite these hurdles, the economic impact is undeniable — research suggests AI could contribute up to $15.7 trillion to the global economy by 2030."
    />
  );
}
