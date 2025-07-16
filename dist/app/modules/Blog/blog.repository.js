"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepositories = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const Blog = prisma_1.default.blog;
// Create a new blog
const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let slug = body.title
        .toLowerCase()
        .replace(/\?/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    const existing = yield Blog.findUnique({ where: { slug } });
    if (existing) {
        slug += '-' + Date.now();
    }
    const result = yield Blog.create({
        data: Object.assign(Object.assign({}, body), { slug }),
    });
    return result;
});
// Update an existing blog by ID
const update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (body === null || body === void 0 ? void 0 : body.title) {
        let slug = body.title
            .toLowerCase()
            .replace(/\?/g, '')
            .replace(/[^a-z0-9 ]/g, '')
            .trim()
            .replace(/\s+/g, '-');
        body.slug = slug;
    }
    const result = yield Blog.update({
        where: { id },
        data: body
    });
    return result;
});
// Delete a blog by ID
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog.delete({
        where: { id }
    });
    return result;
});
// Get a blog by ID (can return null)
const findUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog.findUnique({
        where: { id }
    });
    return result;
});
// Get a blog by ID (throws error if not found)
const findUniqueOrThrow = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog.findFirst({
        where: { slug }
    });
    return result;
});
// Get multiple blogs with optional filter
const findMany = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(Blog, query);
    const result = yield blogQuery
        .search(['title', 'description'])
        .filter()
        .sort()
        .paginate()
        .execute();
    const pagination = yield blogQuery.countTotal();
    return {
        meta: pagination,
        result
    };
});
const findUniqueOrThrowBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield Blog.findFirst({ where: { slug } });
    if (!blog)
        throw new Error('Blog not found');
    return blog;
});
const updateBySlug = (slug, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog.update({
        where: { slug },
        data: body,
    });
    return result;
});
exports.BlogRepositories = {
    create,
    update,
    remove,
    findUnique,
    findUniqueOrThrow,
    findUniqueOrThrowBySlug,
    updateBySlug,
    findMany
};
