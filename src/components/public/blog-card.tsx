
"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IAuthor, IBlog } from "@/lib/models";

interface BlogCardProps {
  blog: IBlog;
  className?: string;
}

export function BlogCard({ blog, className }: BlogCardProps) {
  const author = blog.author as IAuthor;
  const category = blog.category as IBlog['category'];
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative aspect-video">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={blog.imageHint}
          />
        </div>
      </Link>
      <CardContent className="p-6">
        {category && <Badge className="mb-2">{category.name}</Badge>}
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="text-xl font-bold font-headline hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mt-2 text-sm line-clamp-3">{blog.excerpt}</p>
        
        {author && (
            <div className="flex items-center space-x-3 text-sm mt-4">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={author.avatarUrl} alt={author.name} />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{author.name}</span>
                    <span className="text-xs text-muted-foreground">
                        {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                    </span>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
