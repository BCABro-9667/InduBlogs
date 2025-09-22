import { notFound } from "next/navigation";
import { PageHeader } from "@/components/public/page-header";
import { BlogEditor } from "@/components/dashboard/blog-editor";
import { getBlogs } from "@/lib/data";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id === params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Your Blog"
        description="Refine your content and update the details of your blog post."
      />
      <BlogEditor blog={blog} />
    </div>
  );
}
