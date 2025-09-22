import { PageHeader } from "@/components/public/page-header";
import { BlogEditor } from "@/components/dashboard/blog-editor";
import { getCategories } from "@/lib/data";

export default async function CreateBlogPage() {
  const categories = await getCategories();
  return (
    <div>
      <PageHeader
        title="Create a New Blog"
        description="Fill out the details below to create your next masterpiece."
      />
      <BlogEditor categories={categories} />
    </div>
  );
}
