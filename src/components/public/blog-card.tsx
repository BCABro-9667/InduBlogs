import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { Blog } from "@/lib/data";
import { IAuthor } from "@/lib/models";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export function BlogCard({ blog, className }: BlogCardProps) {
  const author = blog.author as IAuthor;
  return (
    <Link href={`/blog/${blog.slug}`}>
        <Card className={cn("overflow-hidden h-full group flex flex-col", className)}>
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={blog.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 left-4">{blog.category.name}</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-1">
                <h3 className="text-xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">
                    {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                    {blog.excerpt}
                </p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={author.avatarUrl} alt={author.name} />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{author.name}</span>
                </div>
                <time dateTime={new Date(blog.createdAt).toISOString()} className="text-muted-foreground">
                    {format(new Date(blog.createdAt), "MMM d, yyyy")}
                </time>
            </CardFooter>
        </Card>
    </Link>
  );
}
