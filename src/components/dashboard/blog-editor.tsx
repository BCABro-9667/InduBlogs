"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { SeoOptimizer } from "./seo-optimizer";
import { RichTextEditor } from "./rich-text-editor";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  content: z.string().min(1, { message: "Content is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  status: z.enum(["draft", "published", "private"]),
  slug: z.string().min(1, { message: "Slug is required." }),
  excerpt: z.string().min(1, { message: "Excerpt is required." }),
  metaDescription: z.string().optional(),
  tags: z.string().optional(),
});

type BlogFormValues = z.infer<typeof formSchema>;

interface BlogEditorProps {
  blog?: Blog;
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
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Short Description / Excerpt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="A short, catchy summary of your blog post."
                                        className="min-h-[100px]"
                                        {...field}
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
                                        <Input placeholder="your-blog-post-slug" {...field} />
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
                                        <Input placeholder="https://example.com/image.png" {...field} />
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
                                        <Input placeholder="e.g. webdev, react, tips" {...field} />
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
                                        <Textarea placeholder="Custom meta description for SEO." {...field} />
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
                                        </Trigger>
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
