import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from 'date-fns';
import { getBlogBySlug, getRecentBlogs } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CommentsSection } from "@/components/public/comments-section";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export async function generateStaticParams() {
    const blogs = getRecentBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);
  const topBlogs = getRecentBlogs().filter(b => b.slug !== params.slug).slice(0, 3);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8">
                <header className="mb-8">
                    <div className="relative h-96 w-full rounded-lg overflow-hidden mb-6">
                        <Image
                            src={blog.imageUrl}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                            data-ai-hint={blog.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <Badge className="mb-4">{blog.category.name}</Badge>
                    
                    <h1 className="text-4xl md:text-5xl font-extrabold font-headline leading-tight mb-4">
                        {blog.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={blog.author.avatarUrl} alt={blog.author.name} />
                                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{blog.author.name}</span>
                        </div>
                        <span className="text-muted-foreground">|</span>
                        <time dateTime={blog.createdAt} className="text-muted-foreground">
                            {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                        </time>
                    </div>
                </header>
                
                <div
                    className="prose dark:prose-invert max-w-none text-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <hr className="my-12" />

                <CommentsSection />

            </article>
            <aside className="lg:col-span-4 space-y-8">
                <div>
                    <h3 className="text-2xl font-bold font-headline mb-4">Top Blogs</h3>
                    <div className="space-y-4">
                    {topBlogs.map((b) => (
                        <Link href={`/blog/${b.slug}`} key={b.id}>
                        <Card className="hover:border-primary transition-all duration-300 group">
                            <CardContent className="p-4 flex items-center gap-4">
                            <Image
                                src={b.imageUrl}
                                alt={b.title}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                                data-ai-hint={b.imageHint}
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">{b.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{b.category.name}</p>
                            </div>
                            </CardContent>
                        </Card>
                        </Link>
                    ))}
                    </div>
                </div>
            </aside>
        </div>
    </div>
  );
}
