import { z } from "zod";


const contactForm = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full Name is required!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email('Invalid email address!'),
    phone: z.string({
      required_error: 'Phone number is required!',
    }),
    location: z.string({
      required_error: 'Location is required!',
    }),
    orderNumber: z
      .string({
        required_error: 'Order number is required!',
      })
      .url('Order number must be a valid URL!'),
    message: z.string({
      required_error: 'Message is required!',
    }),
  }),
});

export const ContactFormValidations = {
  contactForm,
};