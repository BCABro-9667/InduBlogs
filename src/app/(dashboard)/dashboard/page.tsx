import { PageHeader } from "@/components/public/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getRecentBlogs, getTopBlogs } from "@/lib/data";
import { BlogCard } from "@/components/public/blog-card";

export default async function DashboardHomePage() {
  const recentBlogs = (await getRecentBlogs()).slice(0, 3);
  const topBlogs = (await getTopBlogs()).slice(0, 3);
  return (
    <div>
      <PageHeader title="Dashboard" description="Here's a summary of your blog's performance.">
        <Button asChild>
            <Link href="/dashboard/blogs/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Blog
            </Link>
        </Button>
      </PageHeader>
      <StatsCards />

      <div className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4">Recent Activity</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentBlogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4">Your Top Performing Blogs</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topBlogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      </div>
    </div>
  );
}
