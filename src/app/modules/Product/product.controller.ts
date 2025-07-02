import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const getProduct = catchAsync(async (req, res) => {
  
    const result = await ProductServices.getProduct(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Product Retrieved successfully',
        data: result,
    });
});
export const ProductControllers = {
    getProduct,
}