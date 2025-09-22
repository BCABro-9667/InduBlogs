"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "./mongodb";
import { BlogModel, UserModel, CategoryModel } from "./models";
import type { Blog } from "./data";

// --- USER ACTIONS ---

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export async function registerUser(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await dbConnect();

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });
  
  // For now, redirect to login. In a real app, you'd likely sign them in.
  redirect('/login');
}

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export async function loginUser(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    await dbConnect();

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !user.password) {
        return { error: "Invalid credentials!" };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
        // In a real app, you would set up a session here (e.g., with next-auth)
        // For now, we'll just simulate a successful login by redirecting.
        redirect('/dashboard');
    }

    return { error: "Invalid credentials!" };
}


// --- BLOG ACTIONS ---

const blogFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  content: z.string().min(1, { message: "Content is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  status: z.enum(["draft", "published", "private"]),
  slug: z.string().min(1, { message: "Slug is required." }),
  excerpt: z.string().min(1, { message: "Excerpt is required." }),
  metaDescription: z.string().optional(),
  tags: z.string().optional(),
});

export async function saveBlog(blogId: string | undefined, values: z.infer<typeof blogFormSchema>) {
  const validatedFields = blogFormSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  await dbConnect();

  const blogData: Partial<Blog> = {
    ...validatedFields.data,
    tags: validatedFields.data.tags?.split(',').map(tag => tag.trim()).filter(Boolean),
    // This is a placeholder. In a real app, you'd get the logged-in user's ID.
    author: "669fc22a9cf2e432f83192f1"
  };

  try {
    if (blogId) {
      await BlogModel.findByIdAndUpdate(blogId, blogData);
    } else {
      await BlogModel.create(blogData);
    }
  } catch(e: any) {
    // Check for unique slug violation
    if (e.code === 11000 && e.keyPattern?.slug) {
        return { error: "This slug is already in use. Please choose a unique one." };
    }
    return { error: "Something went wrong saving the blog." };
  }

  revalidatePath('/dashboard/blogs');
  revalidatePath('/blog');
  redirect('/dashboard/blogs');
}

// --- CATEGORY ACTIONS ---

const categoryFormSchema = z.object({
    name: z.string().min(1, { message: "Category name is required." }),
    heroImageUrl: z.string().url({ message: "Please enter a valid image URL." }),
});

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

export async function saveCategory(values: z.infer<typeof categoryFormSchema>) {
    const validatedFields = categoryFormSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    await dbConnect();

    const { name, heroImageUrl } = validatedFields.data;
    const slug = slugify(name);

    try {
        await CategoryModel.create({ name, slug, heroImageUrl });
    } catch (e: any) {
        if (e.code === 11000) {
            return { error: "A category with this name already exists." };
        }
        return { error: "Something went wrong saving the category." };
    }

    revalidatePath('/dashboard/categories/create');
    revalidatePath('/categories');
}
