import QueryBuilder from "../../builder/QueryBuilder";
import prisma from "../../utils/prisma";
import { TBlog } from "./blog.interface";

const Blog = prisma.blog;

// Create a new blog
const create = async (body: TBlog) => {
    const result = await Blog.create({
        data: body
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
const findUniqueOrThrow = async (title: string) => {
    const result = await Blog.findFirst({
        where: { title }
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

export const BlogRepositories = {
    create,
    update,
    remove,
    findUnique,
    findUniqueOrThrow,
    findMany
};
