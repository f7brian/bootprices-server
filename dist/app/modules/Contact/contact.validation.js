"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactFormValidations = void 0;
const zod_1 = require("zod");
const contactForm = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: 'Full Name is required!',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required!',
        })
            .email('Invalid email address!'),
        phone: zod_1.z.string({
            required_error: 'Phone number is required!',
        }),
        location: zod_1.z.string({
            required_error: 'Location is required!',
        }),
        orderNumber: zod_1.z
            .string({
            required_error: 'Order number is required!',
        })
            .url('Order number must be a valid URL!'),
        message: zod_1.z.string({
            required_error: 'Message is required!',
        }),
    }),
});
exports.ContactFormValidations = {
    contactForm,
};
