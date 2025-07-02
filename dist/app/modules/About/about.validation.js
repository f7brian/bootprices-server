"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const upsertAbout = zod_1.default.object({
    body: zod_1.default.object({
        details: zod_1.default.string({
            required_error: 'Details are required!',
        }),
    }),
});
exports.AboutValidations = {
    upsertAbout,
};
