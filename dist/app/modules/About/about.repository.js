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
exports.AboutRepositories = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const About = prisma_1.default.about;
// Create a new about entry
const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield About.create({
        data: body
    });
    return result;
});
// Update an existing about entry by ID
const update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield About.update({
        where: { id },
        data: body
    });
    return result;
});
// Delete an about entry by ID
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield About.delete({
        where: { id }
    });
    return result;
});
// Get an about entry by ID (can return null)
const findUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield About.findUnique({
        where: { id }
    });
    return result;
});
const findFirst = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield About.findFirst();
    return result;
});
const findFirstElementId = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield About.findFirst({
        select: {
            id: true
        }
    });
    return result;
});
exports.AboutRepositories = {
    create,
    update,
    remove,
    findUnique,
    findFirst,
    findFirstElementId
};
