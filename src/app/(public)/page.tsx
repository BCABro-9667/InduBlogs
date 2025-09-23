import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBlogs, getCategories, getRecentBlogs, getTopBlogs } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogCard } from "@/components/public/blog-card";

export default async function HomePage() {
  const allBlogs = JSON.parse(JSON.stringify((await getBlogs()).filter(b => b.status === 'published')));
  const recentBlogs = JSON.parse(JSON.stringify((await getRecentBlogs()).slice(0, 10)));
  const topBlogs = JSON.parse(JSON.stringify((await getTopBlogs()).slice(0, 5)));
  const categories = JSON.parse(JSON.stringify(await getCategories()));

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
          Welcome to BlogWave
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the latest articles on technology, design, and productivity.
          Join the new wave of blogging.
        </p>
      </section>

      <section className="mb-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
            <TabsTrigger value="all">All Blogs</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category._id} value={category.slug}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category._id} value={category.slug}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allBlogs.filter(b => b.category.slug === category.slug).map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
            <h2 className="text-3xl font-bold font-headline mb-6">Latest Blogs</h2>
            <div className="[column-count:1] md:[column-count:2] gap-8 space-y-8">
                {recentBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} className="break-inside-avoid"/>
                ))}
            </div>
        </div>
        <aside className="lg:col-span-4 space-y-8">
          <div>
            <h3 className="text-2xl font-bold font-headline mb-4">Top Blogs</h3>
            <div className="space-y-4">
              {topBlogs.map((blog) => (
                <Link href={`/blog/${blog.slug}`} key={blog._id}>
                  <Card className="hover:border-primary transition-all duration-300 group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                        data-ai-hint={blog.imageHint}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">{blog.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{blog.category.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link href={`/category/${category.slug}`} key={category._id}>
                    <div className="flex justify-between items-center p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors group">
                        <span className="font-medium group-hover:text-primary">{category.name}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
