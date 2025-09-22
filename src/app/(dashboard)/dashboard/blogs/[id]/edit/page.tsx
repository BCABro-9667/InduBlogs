import { notFound } from "next/navigation";
import { PageHeader } from "@/components/public/page-header";
import { BlogEditor } from "@/components/dashboard/blog-editor";
import { getBlogs, getCategories } from "@/lib/data";
import { BlogModel } from "@/lib/models";
import dbConnect from "@/lib/mongodb";

async function getBlog(id: string) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return null;
  }
  await dbConnect();
  const blog = await BlogModel.findById(id).lean();
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog));
}


export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);
  const categories = await getCategories();

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Your Blog"
        description="Refine your content and update the details of your blog post."
      />
      <BlogEditor blog={blog} categories={categories} />
    </div>
  );
}
