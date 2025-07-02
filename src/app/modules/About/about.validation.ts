import z from 'zod';

const upsertAbout = z.object({
  body: z.object({
    details: z.string({
      required_error: 'Details are required!',
    }),
  }),
});

export const AboutValidations = {
  upsertAbout,
};
