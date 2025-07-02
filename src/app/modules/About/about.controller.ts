import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AboutServices } from './about.service';

const upsertAbout = catchAsync(async (req, res) => {
    const result = await AboutServices.upsertAbout(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'About section saved successfully',
        data: result,
    });
});

const getAbout = catchAsync(async (req, res) => {
    const result = await AboutServices.getAbout();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'About section retrieved successfully',
        data: result,
    });
});

export const AboutControllers = {
    upsertAbout,
    getAbout
};
