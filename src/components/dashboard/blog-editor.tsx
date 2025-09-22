"use client";

import { useEffect, useState, useTransition } from "react";
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
import type { Blog, Category } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { SeoOptimizer } from "./seo-optimizer";
import { RichTextEditor } from "./rich-text-editor";
import { saveBlog } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  content: z.string().min(100, { message: "Content should be at least 100 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  status: z.enum(["draft", "published", "private"]),
  slug: z.string().min(1, { message: "Slug is required." }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be a valid URL path segment."),
  excerpt: z.string().min(1, { message: "Excerpt is required." }),
  metaDescription: z.string().optional(),
  tags: z.string().optional(),
});

type BlogFormValues = z.infer<typeof formSchema>;

interface BlogEditorProps {
  blog?: Blog;
  categories: Category[];
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

export function BlogEditor({ blog, categories }: BlogEditorProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const defaultValues = {
    title: blog?.title || "",
    content: blog?.content || "",
    category: (blog?.category as any)?._id || "",
    status: blog?.status || "draft",
    slug: blog?.slug || "",
    imageUrl: blog?.imageUrl || "",
    excerpt: blog?.excerpt || "",
    metaDescription: blog?.metaDescription || "",
    tags: blog?.tags?.join(', ') || "",
  };

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const titleValue = form.watch("title");
  const contentValue = form.watch("content");
  const currentUrlValue = `https://myblog.com/blog/${form.watch("slug") || 'new-post'}`;

  useEffect(() => {
    if (titleValue && form.formState.dirtyFields.title) {
      form.setValue("slug", slugify(titleValue), { shouldValidate: true });
    }
  }, [titleValue, form]);


  function onSubmit(values: BlogFormValues) {
    setError(undefined);
    startTransition(() => {
        saveBlog(blog?._id, values).then((data) => {
            if (data?.error) {
                setError(data.error);
            } else {
                toast({
                    title: blog ? "Blog Updated!" : "Blog Created!",
                    description: "Your blog post has been saved successfully.",
                });
            }
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your amazing blog title" {...field} className="text-lg h-12" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Short Description / Excerpt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="A short, catchy summary of your blog post."
                                        className="min-h-[100px]"
                                        {...field}
                                        disabled={isPending}
                                        />
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
                                        <RichTextEditor
                                            initialValue={field.value}
                                            onChange={field.onChange}
                                            disabled={isPending}
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
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug / URL</FormLabel>
                                     <FormControl>
                                        <Input placeholder="your-blog-post-slug" {...field} disabled={isPending} />
                                    </FormControl>
                                    <p className="text-xs text-muted-foreground">Unique identifier for SEO-friendly links.</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hero Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.png" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags / Keywords</FormLabel>
                                     <FormControl>
                                        <Input placeholder="e.g. webdev, react, tips" {...field} disabled={isPending} />
                                    </FormControl>
                                    <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Description</FormLabel>
                                     <FormControl>
                                        <Textarea placeholder="Custom meta description for SEO." {...field} disabled={isPending} />
                                    </FormControl>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                        <SelectItem key={cat._id} value={cat._id}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
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
                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                    {isPending ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
                </Button>
            </div>
        </div>
      </form>
    </Form>
  );
}
