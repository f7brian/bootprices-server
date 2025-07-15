import QueryBuilder from "../../builder/QueryBuilder";
import prisma from "../../utils/prisma";
import { TBlog } from "./blog.interface";

const Blog = prisma.blog;

// Create a new blog
const create = async (body: TBlog) => {
    let slug = body.title
        .toLowerCase()
        .replace(/\?/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .replace(/\s+/g, '-');

    const existing = await Blog.findUnique({ where: { slug } });
    if (existing) {
        slug += '-' + Date.now();
    }

    const result = await Blog.create({
        data: {
            ...body,
            slug,
        },
    });

    return result;
};

// Update an existing blog by ID
const update = async (id: string, body: Partial<TBlog>) => {
    const result = await Blog.update({
        where: { id },
        data: body
    });
    return result;
};

// Delete a blog by ID
const remove = async (id: string) => {
    const result = await Blog.delete({
        where: { id }
    });
    return result;
};

// Get a blog by ID (can return null)
const findUnique = async (id: string) => {
    const result = await Blog.findUnique({
        where: { id }
    });
    return result;
};

// Get a blog by ID (throws error if not found)
const findUniqueOrThrow = async (slug: string) => {
    const result = await Blog.findFirst({
        where: { slug }
    });
    return result;
};

// Get multiple blogs with optional filter
const findMany = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog, query);
    const result = await blogQuery
        .search(['title', 'description'])
        .filter()
        .sort()
        .paginate()
        .execute();
    const pagination = await blogQuery.countTotal()
    return {
        meta: pagination,
        result
    }
};

const findUniqueOrThrowBySlug = async (slug: string) => {
  const blog = await Blog.findFirst({ where: { slug } });
  if (!blog) throw new Error('Blog not found');
  return blog;
};

const updateBySlug = async (slug: string, body: Partial<TBlog>) => {
  const result = await Blog.update({
    where: { slug },
    data: body,
  });
  return result;
};

export const BlogRepositories = {
    create,
    update,
    remove,
    findUnique,
    findUniqueOrThrow,
    findUniqueOrThrowBySlug,
    updateBySlug,
    findMany
};
