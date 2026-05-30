import AIInput from "@/components/AIInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Optimizer - Improve Your AI Prompts",
  description:
    "Transform vague prompts into clear, detailed instructions that get better results from any AI model. Free prompt optimization tool.",
};

const SYSTEM_PROMPT = `You are a prompt engineering expert. Transform the user's vague or simple prompt into a clear, detailed, and effective prompt that will get the best results from AI models.

Your optimized prompt should:
1. Clearly define the AI's role/persona
2. Specify the exact output format desired
3. Include relevant context and constraints
4. Use specific, concrete language (avoid vague terms)
5. Include examples if helpful

Output format:
**Optimized Prompt:**
[the complete optimized prompt]

**Key Improvements Made:**
- [improvement 1]
- [improvement 2]
- [improvement 3]

**Why This Works Better:**
[brief explanation of the prompt engineering principles applied]`;

export default function PromptOptimizerPage() {
  return (
    <AIInput
      title="Prompt Optimizer"
      description="Transform vague prompts into clear, detailed instructions that get better results from any AI model (ChatGPT, Claude, Gemini, etc.)"
      placeholder="Enter your prompt that you want to improve, e.g.: 'Write me a cover letter' or 'Help me with my resume'"
      systemPrompt={SYSTEM_PROMPT}
      inputLabel="Your Original Prompt"
      outputLabel="Optimized Prompt"
      maxTokens={1024}
      showExample="Write a product description for my new coffee mug"
    />
  );
}
