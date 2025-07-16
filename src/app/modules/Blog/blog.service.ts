import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { BlogRepositories } from "./blog.repository";
import { uploadToDigitalOceanAWS } from "../../utils/uploadToDigitalOceanAWS";
import prisma from "../../utils/prisma";

const createBlog = async (file: Express.Multer.File | undefined, body: TBlog) => {
    const isAvailable = await prisma.blog.findUnique({
        where: {
            title: body.title
        },
        select: {
            title: true
        }
    });
    if (isAvailable) {
        throw new AppError(httpStatus.CONFLICT, 'A blog with this title already exists.');
    }
    if (!file) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Blog image is required')
    }
    const { Location } = await uploadToDigitalOceanAWS(file)
    body.photo = Location
    const result = await BlogRepositories.create(body);
    return result;
};

const updateBlog = async (id: string, file: Express.Multer.File | undefined, body: Partial<TBlog>) => {
    delete body.photo
    await prisma.blog.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true
        }
    })
    if (file) {
        const { Location } = await uploadToDigitalOceanAWS(file)
        body.photo = Location
    }

    const result = await BlogRepositories.update(id, body);
    return result;
};

const updateBlogBySlug = async (slug: string, file: Express.Multer.File | undefined, body: Partial<TBlog>) => {
    delete body.photo
    if (file) {
        const { Location } = await uploadToDigitalOceanAWS(file)
        body.photo = Location
    }
    await BlogRepositories.findUniqueOrThrowBySlug(slug);
    const result = await BlogRepositories.updateBySlug(slug, body);
    return result;
};

const deleteBlog = async (id: string) => {
    await BlogRepositories.findUniqueOrThrow(id);
    const result = await BlogRepositories.remove(id);
    return result;
};

const getBlogByTitle = async (title: string) => {
    const result = await BlogRepositories.findUniqueOrThrow(title);
    return result;
};

const getSingleBlog = async (slug: string) => {
    const result = await BlogRepositories.findUniqueOrThrow(slug);
    return result;
};
const getSingleBlogById = async (id: string) => {
    return await prisma.blog.findUniqueOrThrow({
        where: {
            id
        }
    })
}

const getBlogs = async (query: Record<string, unknown>) => {
    const result = await BlogRepositories.findMany(query);
    return result;
};

export const BlogServices = {
    createBlog,
    updateBlog,
    updateBlogBySlug,
    deleteBlog,
    getBlogByTitle,
    getSingleBlog,
    getBlogs,
    getSingleBlogById
};
