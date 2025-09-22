import { PlaceHolderImages } from './placeholder-images';
import dbConnect from './mongodb';
import { BlogModel, CategoryModel, AuthorModel, IBlog, ICategory, IAuthor } from './models';

export type Author = IAuthor;
export type Category = ICategory;
export type BlogStatus = 'published' | 'draft' | 'private';
export type Blog = IBlog;

const getBlogs = async (): Promise<Blog[]> => {
  await dbConnect();
  const blogs = await BlogModel.find({}).populate('category').populate('author').lean();
  return blogs as Blog[];
};

const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  await dbConnect();
  const blog = await BlogModel.findOne({ slug }).populate('category').populate('author').lean();
  return blog as Blog | null;
};

const getCategories = async (): Promise<Category[]> => {
  await dbConnect();
  const categories = await CategoryModel.find({}).lean();
  return categories as Category[];
};

const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  await dbConnect();
  const category = await CategoryModel.findOne({ slug }).lean();
  return category as Category | null;
};

const getBlogsByCategory = async (categorySlug: string): Promise<Blog[]> => {
  await dbConnect();
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  const blogs = await BlogModel.find({ category: category._id, status: 'published' }).populate('category').populate('author').lean();
  return blogs as Blog[];
};

const getTopBlogs = async (): Promise<Blog[]> => {
  await dbConnect();
  const blogs = await BlogModel.find({ isTopBlog: true, status: 'published' }).sort({ views: -1 }).populate('category').populate('author').lean();
  return blogs as Blog[];
};

const getRecentBlogs = async (): Promise<Blog[]> => {
  await dbConnect();
  const blogs = await BlogModel.find({ status: 'published' }).sort({ createdAt: -1 }).populate('category').populate('author').lean();
  return blogs as Blog[];
};

// Functions for actions
const createBlog = async (data: Partial<Blog>) => {
    await dbConnect();
    const newBlog = new BlogModel(data);
    await newBlog.save();
    return JSON.parse(JSON.stringify(newBlog));
};

const updateBlog = async (id: string, data: Partial<Blog>) => {
    await dbConnect();
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, data, { new: true });
    return JSON.parse(JSON.stringify(updatedBlog));
};

const getAuthors = async (): Promise<Author[]> => {
    await dbConnect();
    const authors = await AuthorModel.find({}).lean();
    return authors as Author[];
}

export {
    getBlogs,
    getBlogBySlug,
    getCategories,
    getCategoryBySlug,
    getBlogsByCategory,
    getTopBlogs,
    getRecentBlogs,
    createBlog,
    updateBlog,
    getAuthors
};
