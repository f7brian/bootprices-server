export interface DisplayNameWithId {
    DisplayName: string;
    Id: string;
}

export interface AmazonItem {
    ASIN: string;
    DetailPageURL: string;
    Title: string;
    Price: string;
    Image: {
        URL: string;
        Height: number;
        Width: number;
    };
    Description: string;
    Brand: {
        DisplayValue: string;
        Label: string;
        Locale: string;
    }

}
export type Result = {
    result: {
        products: AmazonItem[];
        productsCount: number;
    },
    meta: {
        page: number;
        totalResultCount: number;
    }
}