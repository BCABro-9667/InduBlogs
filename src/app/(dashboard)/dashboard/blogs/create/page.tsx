import { PageHeader } from "@/components/public/page-header";
import { BlogEditor } from "@/components/dashboard/blog-editor";

export default function CreateBlogPage() {
  return (
    <div>
      <PageHeader
        title="Create a New Blog"
        description="Fill out the details below to create your next masterpiece."
      />
      <BlogEditor />
    </div>
  );
}
