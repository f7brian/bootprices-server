import { searchAmazonItems } from "../../utils/searchAmazonItems"
import { allowedSortBy } from "./product.const";

const parseString = (value: unknown, defaultValue = ''): string => {
    return typeof value === 'string' ? value : defaultValue;
};

const parsePositiveInt = (value: unknown, defaultValue = 1): number => {
    const num = parseInt(typeof value === 'string' ? value : `${defaultValue}`, 10);
    return num > 0 ? num : defaultValue;
};

const parsePrice = (value: unknown): number | undefined => {
    const num = Number(value);
    return (!isNaN(num) && num >= 0) ? (num + 0.3) * 100 : undefined;
};

const getProduct = async (query: Record<string, unknown>) => {
    const brand = parseString(query.brand);
    const category = parseString(query.category);
    const gender = parseString(query.gender)
    const singeBrand = (brand ? brand.split(',') : [])[0];
    const sortBy = allowedSortBy.includes(query.sortBy as any)
        ? query.sortBy as typeof allowedSortBy[number]
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
    const newGenderText = (gender ? gender.split(',') : []).join(' ')
    const result = await searchAmazonItems(singeBrand, page, category, sortBy, maxPrice, minPrice, newGenderText);
    return result;
};

export const ProductServices = {
    getProduct,
}