'use server';

/**
 * @fileOverview An SEO optimization AI agent for blog content.
 *
 * - optimizeBlogForSeo - A function that handles the SEO optimization process.
 * - OptimizeBlogForSeoInput - The input type for the optimizeBlogForSeo function.
 * - OptimizeBlogForSeoOutput - The return type for the optimizeBlogForSeo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeBlogForSeoInputSchema = z.object({
  content: z
    .string()
    .describe('The content of the blog post to be optimized.'),
  currentUrl: z.string().describe('The current URL of the blog post.'),
  focusKeyword: z.string().optional().describe('Optional focus keyword for the blog post.'),
});
export type OptimizeBlogForSeoInput = z.infer<typeof OptimizeBlogForSeoInputSchema>;

const OptimizeBlogForSeoOutputSchema = z.object({
  suggestedKeywords: z.array(z.string()).describe('A list of suggested keywords for the blog post.'),
  suggestedMetaDescription: z
    .string()
    .describe('A suggested meta description for the blog post.'),
  suggestedUrl: z.string().describe('A suggested URL for the blog post.'),
  suggestions: z.string().describe('Overall suggestions to improve SEO'),
});
export type OptimizeBlogForSeoOutput = z.infer<typeof OptimizeBlogForSeoOutputSchema>;

export async function optimizeBlogForSeo(input: OptimizeBlogForSeoInput): Promise<OptimizeBlogForSeoOutput> {
  return optimizeBlogForSeoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeBlogForSeoPrompt',
  input: {schema: OptimizeBlogForSeoInputSchema},
  output: {schema: OptimizeBlogForSeoOutputSchema},
  prompt: `You are an SEO expert, and your task is to optimize a blog post for search engines.

Analyze the provided blog content and suggest improvements for:
- Relevant keywords
- Meta description
- URL structure
- Overall suggestions to improve SEO.

Blog Content:
{{content}}

Current URL: {{currentUrl}}

Focus Keyword (if provided): {{focusKeyword}}

Output the suggestions in JSON format.
`,
});

const optimizeBlogForSeoFlow = ai.defineFlow(
  {
    name: 'optimizeBlogForSeoFlow',
    inputSchema: OptimizeBlogForSeoInputSchema,
    outputSchema: OptimizeBlogForSeoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
