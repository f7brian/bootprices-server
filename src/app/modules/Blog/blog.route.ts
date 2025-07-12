import express from 'express';
import auth from '../../middlewares/auth';
import { parseBody } from '../../middlewares/parseBody';
import validateRequest from '../../middlewares/validateRequest';
import { fileUploader } from '../../utils/fileUploader';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from './blog.validation';
const router = express.Router();

router.post(
  '/',
  auth('SUPERADMIN'),
  fileUploader.uploadSingle,
  parseBody,
  validateRequest(BlogValidations.createBlog),
  BlogControllers.createBlog,
);

router.put(
  '/slug/:slug',
  auth('SUPERADMIN'),
  fileUploader.uploadSingle,
  parseBody,
  validateRequest(BlogValidations.updateBlog),
  BlogControllers.updateBlogBySlug
);

router.delete('/:id', auth('SUPERADMIN'), BlogControllers.deleteBlog);

router.get('/:title', BlogControllers.getBlogByTitle);

router.get('/', BlogControllers.getBlogs);

export const BlogRouters = router;
