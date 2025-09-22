import { PlaceHolderImages } from './placeholder-images';

export type Author = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type BlogStatus = 'published' | 'draft' | 'private';

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  category: Category;
  author: Author;
  createdAt: string;
  status: BlogStatus;
  isTopBlog: boolean;
  views: number;
  tags?: string[];
  metaDescription?: string;
};

export const authors: Author[] = [
  { id: 'user-1', name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=user-2' },
];

export const categories: Category[] = [
  { id: 'cat-1', name: 'Technology', slug: 'technology' },
  { id: 'cat-2', name: 'Productivity', slug: 'productivity' },
  { id: 'cat-3', name: 'Design', slug: 'design' },
  { id: 'cat-4', name: 'Business', slug: 'business' },
  { id: 'cat-5', name: 'Lifestyle', slug: 'lifestyle' },
];

const placeholderContent = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<h2>Key Takeaways</h2>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<ul>
  <li>Consectetur adipiscing elit</li>
  <li>Sed do eiusmod tempor</li>
  <li>Incididunt ut labore et dolore</li>
</ul>
<blockquote>"The quick brown fox jumps over the lazy dog."</blockquote>
<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
`;

export const blogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'The Future of Web Development in 2024',
    slug: 'future-of-web-development-2024',
    excerpt: 'Explore the latest trends, frameworks, and technologies shaping the future of web development.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[0].imageUrl,
    imageHint: PlaceHolderImages[0].imageHint,
    category: categories[0],
    author: authors[0],
    createdAt: '2024-07-21T10:00:00Z',
    status: 'published',
    isTopBlog: true,
    views: 1250,
    tags: ['webdev', '2024', 'frameworks', 'react'],
  },
  {
    id: 'blog-2',
    title: '10 Productivity Hacks for Busy Professionals',
    slug: '10-productivity-hacks',
    excerpt: 'Boost your efficiency and get more done with these simple yet effective productivity tips.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[1].imageUrl,
    imageHint: PlaceHolderImages[1].imageHint,
    category: categories[1],
    author: authors[1],
    createdAt: '2024-07-20T14:30:00Z',
    status: 'published',
    isTopBlog: true,
    views: 2300,
    tags: ['productivity', 'hacks', 'work'],
  },
  {
    id: 'blog-3',
    title: 'A Deep Dive into Modern UI/UX Design Principles',
    slug: 'modern-ui-ux-design-principles',
    excerpt: 'Learn about the core principles that drive successful user interfaces and experiences today.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[2].imageUrl,
    imageHint: PlaceHolderImages[2].imageHint,
    category: categories[2],
    author: authors[0],
    createdAt: '2024-07-19T09:00:00Z',
    status: 'published',
    isTopBlog: false,
    views: 890,
    tags: ['ui', 'ux', 'design', 'principles'],
  },
  {
    id: 'blog-4',
    title: 'Mastering the Art of the Startup Pitch',
    slug: 'mastering-startup-pitch',
    excerpt: 'How to craft a compelling pitch that will win over investors and customers.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[3].imageUrl,
    imageHint: PlaceHolderImages[3].imageHint,
    category: categories[3],
    author: authors[1],
    createdAt: '2024-07-18T11:45:00Z',
    status: 'draft',
    isTopBlog: false,
    views: 0,
    tags: ['startup', 'pitching', 'business'],
  },
  {
    id: 'blog-5',
    title: 'My Journey into Minimalist Living',
    slug: 'journey-minimalist-living',
    excerpt: 'Discover the benefits of minimalism and how it can transform your life.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[4].imageUrl,
    imageHint: PlaceHolderImages[4].imageHint,
    category: categories[4],
    author: authors[0],
    createdAt: '2024-07-17T18:00:00Z',
    status: 'published',
    isTopBlog: true,
    views: 3100,
  },
    {
    id: 'blog-6',
    title: 'The Rise of AI in Creative Industries',
    slug: 'rise-of-ai-creative-industries',
    excerpt: 'How artificial intelligence is changing the landscape of art, music, and writing.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[5].imageUrl,
    imageHint: PlaceHolderImages[5].imageHint,
    category: categories[0],
    author: authors[1],
    createdAt: '2024-07-16T12:00:00Z',
    status: 'published',
    isTopBlog: false,
    views: 1500,
    tags: ['ai', 'creativity', 'art'],
  },
  {
    id: 'blog-7',
    title: 'Building a Sustainable Morning Routine',
    slug: 'sustainable-morning-routine',
    excerpt: 'Create a morning routine that sticks and sets you up for a successful day.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[6].imageUrl,
    imageHint: PlaceHolderImages[6].imageHint,
    category: categories[1],
    author: authors[0],
    createdAt: '2024-07-15T08:20:00Z',
    status: 'published',
    isTopBlog: true,
    views: 1900,
  },
  {
    id: 'blog-8',
    title: 'Color Theory for Web Designers',
    slug: 'color-theory-web-designers',
    excerpt: 'A practical guide to using color effectively in your web design projects.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[7].imageUrl,
    imageHint: PlaceHolderImages[7].imageHint,
    category: categories[2],
    author: authors[1],
    createdAt: '2024-07-14T16:00:00Z',
    status: 'published',
    isTopBlog: false,
    views: 750,
  },
  {
    id: 'blog-9',
    title: 'From Side Hustle to Million-Dollar Business',
    slug: 'side-hustle-to-million-dollar-business',
    excerpt: 'Inspiring stories and practical advice on scaling your side project.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[8].imageUrl,
    imageHint: PlaceHolderImages[8].imageHint,
    category: categories[3],
    author: authors[0],
    createdAt: '2024-07-13T10:00:00Z',
    status: 'private',
    isTopBlog: false,
    views: 10,
  },
  {
    id: 'blog-10',
    title: 'The Ultimate Guide to Traveling on a Budget',
    slug: 'ultimate-guide-traveling-on-budget',
    excerpt: 'See the world without breaking the bank with these expert travel tips.',
    content: placeholderContent,
    imageUrl: PlaceHolderImages[9].imageUrl,
    imageHint: PlaceHolderImages[9].imageHint,
    category: categories[4],
    author: authors[1],
    createdAt: '2024-07-12T13:15:00Z',
    status: 'published',
    isTopBlog: true,
    views: 4500,
  },
];

export const getBlogs = () => blogs;
export const getBlogBySlug = (slug: string) => blogs.find((b) => b.slug === slug);
export const getCategories = () => categories;
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const getBlogsByCategory = (categorySlug: string) => {
    const category = getCategoryBySlug(categorySlug);
    if (!category) return [];
    return blogs.filter((b) => b.category.id === category.id && b.status === 'published');
}
export const getTopBlogs = () => blogs.filter(b => b.isTopBlog && b.status === 'published').sort((a,b) => b.views - a.views);
export const getRecentBlogs = () => blogs.filter(b => b.status === 'published').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());