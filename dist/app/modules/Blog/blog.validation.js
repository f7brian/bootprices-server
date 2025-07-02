"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createBlog = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required!',
        }),
        date: zod_1.default.string({
            required_error: 'Date is required!',
        }),
        time: zod_1.default.string({
            required_error: 'Time is required!',
        }),
        description: zod_1.default.string({
            required_error: 'Description is required!',
        }),
    }),
});
const updateBlog = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        date: zod_1.default.string().optional(),
        time: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
    }),
});
exports.BlogValidations = {
    createBlog,
    updateBlog,
};
