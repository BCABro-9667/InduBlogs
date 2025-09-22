import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Interface for Author
export interface IAuthor extends Document {
  name: string;
  avatarUrl: string;
}

// Interface for Category
export interface ICategory extends Document {
  name: string;
  slug: string;
}

// Interface for Blog
export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  category: ICategory['_id'];
  author: IAuthor['_id'];
  createdAt: Date;
  status: 'published' | 'draft' | 'private';
  isTopBlog: boolean;
  views: number;
  tags?: string[];
  metaDescription?: string;
}

// Interface for User
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
}

// Mongoose Schemas
const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
  avatarUrl: { type: String, required: true },
});

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageHint: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['published', 'draft', 'private'], default: 'draft' },
  isTopBlog: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  tags: [{ type: String }],
  metaDescription: { type: String },
});

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
});


// Export models
export const AuthorModel: Model<IAuthor> = models.Author || mongoose.model<IAuthor>('Author', AuthorSchema);
export const CategoryModel: Model<ICategory> = models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export const BlogModel: Model<IBlog> = models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
export const UserModel: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);
