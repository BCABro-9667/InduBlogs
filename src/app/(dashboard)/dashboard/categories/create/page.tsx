import { PageHeader } from "@/components/public/page-header";
import { CategoryEditor } from "@/components/dashboard/category-editor";

export default async function CreateCategoryPage() {
  return (
    <div>
      <PageHeader
        title="Create a New Category"
        description="Fill out the details below to add a new category."
      />
      <CategoryEditor />
    </div>
  );
}
