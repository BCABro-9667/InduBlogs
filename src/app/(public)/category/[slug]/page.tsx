import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getCategories, getCategoryBySlug, getBlogsByCategory } from "@/lib/data";
import { BlogCard } from "@/components/public/blog-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((category) => ({
      slug: category.slug,
    }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  const blogs = await getBlogsByCategory(params.slug);
  const allCategories = await getCategories();
  // Using a deterministic image for the hero based on category id
  const heroImage = PlaceHolderImages[parseInt(category._id.toString().slice(-2), 16) % PlaceHolderImages.length];


  return (
    <div>
      <section className="relative h-64 md:h-80 w-full">
        <Image
          src={heroImage.imageUrl}
          alt={category.name}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-4">
            {category.name}
          </h1>
          <div className="flex items-center text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Categories</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-white font-medium">{category.name}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8">
            <h2 className="text-3xl font-bold font-headline mb-6">
              Latest in {category.name}
            </h2>
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No blogs found in this category yet.</p>
            )}
          </main>
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
                <h3 className="text-2xl font-bold font-headline mb-4">All Categories</h3>
                <div className="space-y-2">
                {allCategories.map((cat) => (
                    <Link href={`/category/${cat.slug}`} key={cat._id}>
                        <div className={`flex justify-between items-center p-3 rounded-lg hover:bg-primary/10 transition-colors group ${cat._id === category._id ? 'bg-primary/10' : 'bg-secondary'}`}>
                            <span className={`font-medium group-hover:text-primary ${cat._id === category._id ? 'text-primary' : ''}`}>{cat.name}</span>
                            <ArrowRight className={`h-4 w-4 text-muted-foreground group-hover:text-primary ${cat._id === category._id ? 'text-primary' : ''}`} />
                        </div>
                    </Link>
                ))}
                </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
