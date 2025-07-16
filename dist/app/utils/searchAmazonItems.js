"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.searchAmazonItems = void 0;
const ProductAdvertisingAPIv1 = __importStar(require("paapi5-nodejs-sdk"));
const config_1 = __importDefault(require("../../config"));
const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
// Configure API credentials and host
defaultClient.accessKey = config_1.default.amazon.access_key;
defaultClient.secretKey = config_1.default.amazon.secret_key;
defaultClient.host = config_1.default.amazon.host;
defaultClient.region = config_1.default.amazon.region;
const api = new ProductAdvertisingAPIv1.DefaultApi();
const searchAmazonItems = (brand_1, page_1, category_1, sortBy_1, maxPrice_1, ...args_1) => __awaiter(void 0, [brand_1, page_1, category_1, sortBy_1, maxPrice_1, ...args_1], void 0, function* (brand, page, category, sortBy, maxPrice, minPrice = 30, gender) {
    const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
    // 'NewestArrivals' | 'AvgCustomerReviews'
    const pageAmount = page ? (typeof (page) === 'number' && page > 0 ? page : 1) : 1;
    // Required parameters
    searchItemsRequest.PartnerTag = 'countrydancin-20';
    searchItemsRequest.PartnerType = 'Associates';
    searchItemsRequest.Keywords = `${category} Boots ${gender}`;
    searchItemsRequest.SearchIndex = 'Shoes';
    searchItemsRequest.ItemCount = 9;
    searchItemsRequest.ItemPage = pageAmount;
    if (maxPrice) {
        searchItemsRequest.MaxPrice = maxPrice;
    }
    // searchItemsRequest.BrowseNodeId = '119764028011';
    if (minPrice) {
        searchItemsRequest.MinPrice = minPrice;
    }
    // searchItemsRequest.BrowseNodeId = '119764028011';
    // Add filters
    if (sortBy) {
        if (sortBy === 'bestSellersOnly') {
            searchItemsRequest.SortBy = 'AvgCustomerReviews';
        }
        else if (sortBy === 'newArrivals') {
            searchItemsRequest.SortBy = 'NewestArrivals';
        }
        else if (sortBy === 'priceHighToLow') {
            searchItemsRequest.SortBy = 'Price:HighToLow';
        }
        else if (sortBy === 'priceLowToHigh') {
            searchItemsRequest.SortBy = 'Price:LowToHigh';
        }
    }
    if (brand) {
        searchItemsRequest.Brand = brand;
    }
    // Request specific resources
    searchItemsRequest.Resources = [
        'Images.Primary.Large',
        'ItemInfo.Title',
        'Offers.Listings.Price',
        'ItemInfo.Features',
        'ItemInfo.ProductInfo',
        'ItemInfo.ByLineInfo',
    ];
    return new Promise((resolve, reject) => {
        api.searchItems(searchItemsRequest, (error, data) => {
            var _a, _b;
            if (error) {
                reject(`Error calling PA-API 5.0: ${error.message}`);
                return;
            }
            try {
                const searchItemsResponse = ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);
                if (!((_b = (_a = searchItemsResponse.SearchResult) === null || _a === void 0 ? void 0 : _a.Items) === null || _b === void 0 ? void 0 : _b.length)) {
                    resolve({
                        result: {
                            products: [],
                            productsCount: 0
                        },
                        meta: {
                            page: pageAmount,
                            totalResultCount: 0
                        }
                    });
                    return;
                }
                const items = searchItemsResponse.SearchResult.Items.map((item) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                    const newItem = Object.assign(Object.assign({}, item), { Title: (_b = (_a = item['ItemInfo']) === null || _a === void 0 ? void 0 : _a['Title']) === null || _b === void 0 ? void 0 : _b['DisplayValue'], Price: (_f = (_e = (_d = (_c = item['Offers']) === null || _c === void 0 ? void 0 : _c['Listings']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['Price']) === null || _f === void 0 ? void 0 : _f['DisplayAmount'], DetailPageURL: item['DetailPageURL'], Image: (_h = (_g = item['Images']) === null || _g === void 0 ? void 0 : _g['Primary']) === null || _h === void 0 ? void 0 : _h['Large'], Description: (_l = (_k = (_j = item['ItemInfo']) === null || _j === void 0 ? void 0 : _j['Features']) === null || _k === void 0 ? void 0 : _k['DisplayValues']) === null || _l === void 0 ? void 0 : _l.join(', '), Brand: (_o = (_m = item === null || item === void 0 ? void 0 : item.ItemInfo) === null || _m === void 0 ? void 0 : _m.ByLineInfo) === null || _o === void 0 ? void 0 : _o.Brand });
                    delete newItem.Images;
                    delete newItem.ItemInfo;
                    delete newItem.Offers;
                    // delete newItem.OffersV2;
                    return newItem;
                });
                const result = {
                    result: {
                        products: items,
                        productsCount: items.length
                    },
                    meta: {
                        page: pageAmount,
                        totalResultCount: searchItemsResponse.SearchResult.TotalResultCount,
                    }
                };
                resolve(result);
            }
            catch (parseError) {
                reject(`Error processing response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
            }
        });
    });
});
exports.searchAmazonItems = searchAmazonItems;
