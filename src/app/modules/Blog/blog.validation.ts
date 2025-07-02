import z from 'zod';

const createBlog = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    date: z.string({
      required_error: 'Date is required!',
    }),
    time: z.string({
      required_error: 'Time is required!',
    }),
    description: z.string({
      required_error: 'Description is required!',
    }),
  }),
});

const updateBlog = z.object({
  body: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const BlogValidations = {
  createBlog,
  updateBlog,
};