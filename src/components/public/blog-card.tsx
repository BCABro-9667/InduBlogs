import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { format } from 'date-fns';

import { cn } from "@/lib/utils";
import type { Blog } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export function BlogCard({ blog, className }: BlogCardProps) {
  return (
    <Card className={cn("overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
      <Link href={`/blog/${blog.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              data-ai-hint={blog.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge variant="secondary" className="absolute top-3 right-3">{blog.category.name}</Badge>
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold font-headline mb-2 leading-tight group-hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
          <div className="flex items-center gap-2 text-sm">
            <Avatar className="h-8 w-8">
                <AvatarImage src={blog.author.avatarUrl} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-medium">{blog.author.name}</span>
                <span className="text-muted-foreground text-xs">{format(new Date(blog.createdAt), "MMMM d, yyyy")}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
