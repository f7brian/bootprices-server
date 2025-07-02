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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutServices = void 0;
const about_repository_1 = require("./about.repository");
const upsertAbout = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const firstItem = yield about_repository_1.AboutRepositories.findFirstElementId();
    let result;
    if (!firstItem) {
        result = yield about_repository_1.AboutRepositories.create(data);
    }
    else {
        result = yield about_repository_1.AboutRepositories.update(firstItem.id, data);
    }
    return result;
});
const getAbout = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield about_repository_1.AboutRepositories.findFirst();
    return result;
});
exports.AboutServices = {
    upsertAbout,
    getAbout
};
