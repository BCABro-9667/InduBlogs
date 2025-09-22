"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, Blog } from "@/lib/data";
import { SeoOptimizer } from "./seo-optimizer";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  content: z.string().min(1, { message: "Content is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  status: z.enum(["draft", "published", "private"]),
  slug: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.string().optional(),
});

type BlogFormValues = z.infer<typeof formSchema>;

interface BlogEditorProps {
  blog?: Blog;
}

export function BlogEditor({ blog }: BlogEditorProps) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    title: blog?.title || "",
    content: blog?.content || "",
    category: blog?.category.id || "",
    status: blog?.status || "draft",
    slug: blog?.slug || "",
    imageUrl: blog?.imageUrl || "",
    metaDescription: "", // Assuming no meta desc in mock data
    tags: blog?.tags?.join(', ') || "",
  };

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const contentValue = form.watch("content");
  const currentUrlValue = `https://myblog.com/blog/${form.watch("slug") || 'new-post'}`;

  function onSubmit(values: BlogFormValues) {
    console.log(values);
    toast({
        title: blog ? "Blog Updated!" : "Blog Created!",
        description: "Your blog post has been saved successfully.",
    });
    router.push("/dashboard/blogs");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your amazing blog title" {...field} className="text-lg h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Hero Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Write your story here..."
                                        className="min-h-[400px] text-base"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <SeoOptimizer
                    content={contentValue}
                    currentUrl={currentUrlValue}
                    onApplySuggestion={(type, value) => {
                        if (type === 'url') form.setValue('slug', value);
                        if (type === 'metaDescription') form.setValue('metaDescription', value);
                    }}
                />
            </div>
            <div className="lg:col-span-1 space-y-8">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags / Keywords</FormLabel>
                                     <FormControl>
                                        <Input placeholder="e.g. webdev, react, tips" {...field} />
                                    </FormControl>
                                    <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </CardContent>
                </Card>
                <Button type="submit" size="lg" className="w-full">
                    {blog ? "Update Blog" : "Publish Blog"}
                </Button>
            </div>
        </div>
      </form>
    </Form>
  );
}
