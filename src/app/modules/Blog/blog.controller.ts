import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.createBlog(req.file, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Blog created successfully',
        data: result,
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.updateBlog (id, req.file, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Blog updated successfully',
        data: result,
    });
});

const updateBlogBySlug = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const result = await BlogServices.updateBlogBySlug (slug, req.file, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Blog updated by slug successfully',
        data: result,
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.deleteBlog(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Blog deleted successfully',
        data: result,
    });
});

const getBlogByTitle = catchAsync(async (req, res) => {
    const { title } = req.params;
    const result = await BlogServices.getBlogByTitle(title);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Blog retrieved successfully',
        data: result,
    });
});

const getBlogs = catchAsync(async (req, res) => {
    const result = await BlogServices.getBlogs(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Blogs retrieved successfully',
        data: result,
    });
});

export const BlogControllers = {
    createBlog,
    updateBlog,
    updateBlogBySlug,
    deleteBlog,
    getBlogByTitle,
    getBlogs
};
