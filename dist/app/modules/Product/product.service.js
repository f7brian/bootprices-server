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
exports.ProductServices = void 0;
const searchAmazonItems_1 = require("../../utils/searchAmazonItems");
const product_const_1 = require("./product.const");
const parseString = (value, defaultValue = '') => {
    return typeof value === 'string' ? value : defaultValue;
};
const parsePositiveInt = (value, defaultValue = 1) => {
    const num = parseInt(typeof value === 'string' ? value : `${defaultValue}`, 10);
    return num > 0 ? num : defaultValue;
};
const parsePrice = (value) => {
    const num = Number(value);
    return (!isNaN(num) && num >= 0) ? num * 100 : undefined;
};
const getProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = parseString(query.brand);
    const category = parseString(query.category);
    const gender = parseString(query.gender);
    const singeBrand = (brand ? brand.split(',') : [])[0];
    const sortBy = product_const_1.allowedSortBy.includes(query.sortBy)
        ? query.sortBy
        : undefined;
    const page = parsePositiveInt(query.page);
    if (page > 10) {
        return {
            result: {
                products: [],
                productsCount: 0,
                productStyles: []
            },
            meta: {
                page,
                totalResultCount: 0
            }
        };
    }
    const maxPrice = parsePrice(query.maxPrice);
    const minPrice = parsePrice(query.minPrice);
    const newGenderText = (gender ? gender.split(',') : []).join(' ');
    const result = yield (0, searchAmazonItems_1.searchAmazonItems)(singeBrand, page, category, sortBy, maxPrice, minPrice, newGenderText);
    return result;
});
exports.ProductServices = {
    getProduct,
};
