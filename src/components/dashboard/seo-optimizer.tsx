"use client";

import * as React from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { optimizeBlogForSeo, type OptimizeBlogForSeoOutput } from "@/ai/flows/optimize-blog-for-seo";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface SeoOptimizerProps {
  content: string;
  currentUrl: string;
  onApplySuggestion: (type: 'url' | 'metaDescription', value: string) => void;
}

export function SeoOptimizer({ content, currentUrl, onApplySuggestion }: SeoOptimizerProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<OptimizeBlogForSeoOutput | null>(null);

  const handleOptimize = async () => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await optimizeBlogForSeo({ content, currentUrl });
      setSuggestions(result);
    } catch (error) {
      console.error("Error optimizing for SEO:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-accent" />
          <span>AI SEO Optimizer</span>
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions to improve your blog's search engine ranking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleOptimize} disabled={isLoading || !content} className="w-full mb-6">
          {isLoading ? "Analyzing..." : "Get SEO Suggestions"}
        </Button>
        
        {isLoading && <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-20 w-full" />
        </div>}

        {suggestions && (
          <Accordion type="multiple" defaultValue={['keywords', 'description', 'url', 'overall']} className="w-full">
            <AccordionItem value="keywords">
              <AccordionTrigger>Suggested Keywords</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                    {suggestions.suggestedKeywords.map(keyword => (
                        <Badge key={keyword} variant="secondary">{keyword}</Badge>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="description">
              <AccordionTrigger>Suggested Meta Description</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{suggestions.suggestedMetaDescription}</p>
                <Button variant="outline" size="sm" onClick={() => onApplySuggestion('metaDescription', suggestions.suggestedMetaDescription)}>
                    <Wand2 className="mr-2 h-4 w-4"/> Apply
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="url">
              <AccordionTrigger>Suggested URL Slug</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded-md">/{suggestions.suggestedUrl}</p>
                <Button variant="outline" size="sm" onClick={() => onApplySuggestion('url', suggestions.suggestedUrl)}>
                    <Wand2 className="mr-2 h-4 w-4"/> Apply
                </Button>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="overall">
              <AccordionTrigger>Overall Suggestions</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{suggestions.suggestions}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
