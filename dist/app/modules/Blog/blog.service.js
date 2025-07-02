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
exports.BlogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_repository_1 = require("./blog.repository");
const uploadToDigitalOceanAWS_1 = require("../../utils/uploadToDigitalOceanAWS");
const createBlog = (file, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Blog image is required');
    }
    const { Location } = yield (0, uploadToDigitalOceanAWS_1.uploadToDigitalOceanAWS)(file);
    body.photo = Location;
    const result = yield blog_repository_1.BlogRepositories.create(body);
    return result;
});
const updateBlog = (id, file, body) => __awaiter(void 0, void 0, void 0, function* () {
    delete body.photo;
    if (file) {
        const { Location } = yield (0, uploadToDigitalOceanAWS_1.uploadToDigitalOceanAWS)(file);
        body.photo = Location;
    }
    yield blog_repository_1.BlogRepositories.findUniqueOrThrow(id);
    const result = yield blog_repository_1.BlogRepositories.update(id, body);
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_repository_1.BlogRepositories.findUniqueOrThrow(id);
    const result = yield blog_repository_1.BlogRepositories.remove(id);
    return result;
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_repository_1.BlogRepositories.findUniqueOrThrow(id);
    return result;
});
const getBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_repository_1.BlogRepositories.findMany(query);
    return result;
});
exports.BlogServices = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getBlogs
};
