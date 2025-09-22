import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { BlogListClient } from "@/components/dashboard/blog-list-client";
import { getBlogs } from "@/lib/data";

export default function BlogListPage() {
  const blogs = getBlogs();
  
  return (
    <div>
      <PageHeader title="Your Blogs" description="Manage, edit, and view all your blog posts.">
        <Button asChild>
            <Link href="/dashboard/blogs/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Blog
            </Link>
        </Button>
      </PageHeader>
      <BlogListClient blogs={blogs} />
    </div>
  );
}
