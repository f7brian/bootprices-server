import * as ProductAdvertisingAPIv1 from 'paapi5-nodejs-sdk';
import config from '../../config';
import { AmazonItem, Result } from '../types';
import { AllowedSortBy } from '../modules/Product/product.interface';



const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

// Configure API credentials and host
defaultClient.accessKey = config.amazon.access_key;
defaultClient.secretKey = config.amazon.secret_key;
defaultClient.host = config.amazon.host;
defaultClient.region = config.amazon.region;

const api = new ProductAdvertisingAPIv1.DefaultApi();


export const searchAmazonItems = async (
  brand?: string,
  page?: number,
  category?: string,
  sortBy?: AllowedSortBy,
  maxPrice?: number,
  minPrice?: number,
  gender?: string
): Promise<Result> => {
  const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
  // 'NewestArrivals' | 'AvgCustomerReviews'
  const pageAmount = page ? (typeof (page) === 'number' && page > 0 ? page : 1) : 1
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
      searchItemsRequest.SortBy = 'AvgCustomerReviews'
    }
    else if (sortBy === 'newArrivals') {
      searchItemsRequest.SortBy = 'NewestArrivals'
    }
    else if (sortBy === 'priceHighToLow') {
      searchItemsRequest.SortBy = 'Price:HighToLow'
    }
    else if (sortBy === 'priceLowToHigh') {
      searchItemsRequest.SortBy = 'Price:LowToHigh'
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
    api.searchItems(searchItemsRequest, (error: any, data: any) => {
      if (error) {
        reject(`Error calling PA-API 5.0: ${error.message}`);
        return;
      }

      try {
        const searchItemsResponse = ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);

        if (!searchItemsResponse.SearchResult?.Items?.length) {
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

        const items: AmazonItem[] = searchItemsResponse.SearchResult.Items.map((item: any) => {
          const newItem = {
            ...item,
            Title: item['ItemInfo']?.['Title']?.['DisplayValue'],
            Price: item['Offers']?.['Listings']?.[0]?.['Price']?.['DisplayAmount'],
            DetailPageURL: item['DetailPageURL'],
            Image: item['Images']?.['Primary']?.['Large'],
            Description: item['ItemInfo']?.['Features']?.['DisplayValues']?.join(', '),
            Brand: item?.ItemInfo?.ByLineInfo?.Brand,
          }
          delete newItem.Images;
          delete newItem.ItemInfo;
          delete newItem.Offers;
          // delete newItem.OffersV2;
          return newItem
        })
        const result = {

          result: {
            products: items,
            productsCount: items.length
          },
          meta: {
            page: pageAmount,
            totalResultCount: searchItemsResponse.SearchResult.TotalResultCount,
          }

        }
        resolve(result);
      } catch (parseError) {
        reject(`Error processing response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
      }
    });
  });
};