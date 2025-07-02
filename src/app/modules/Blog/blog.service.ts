import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { BlogRepositories } from "./blog.repository";
import { uploadToDigitalOceanAWS } from "../../utils/uploadToDigitalOceanAWS";

const createBlog = async (file: Express.Multer.File | undefined, body: TBlog) => {

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
    if (file) {
        const { Location } = await uploadToDigitalOceanAWS(file)
        body.photo = Location
    }
    await BlogRepositories.findUniqueOrThrow(id);
    const result = await BlogRepositories.update(id, body);
    return result;
};

const deleteBlog = async (id: string) => {
    await BlogRepositories.findUniqueOrThrow(id);
    const result = await BlogRepositories.remove(id);
    return result;
};

const getBlogById = async (id: string) => {
    const result = await BlogRepositories.findUniqueOrThrow(id);
    return result;
};

const getBlogs = async (query: Record<string, unknown>) => {
    const result = await BlogRepositories.findMany(query);
    return result;
};

export const BlogServices = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getBlogs
};