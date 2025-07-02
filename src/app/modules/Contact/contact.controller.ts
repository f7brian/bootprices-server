import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContactServices } from "./contact.service";

const contact = catchAsync(async (req, res) => {
    const result = await ContactServices.contact(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Email has send',
        data: result,
    });
});

export const ContactControllers = {
    contact
}