import { NextFunction, Request, Response } from 'express';
import { ImageServices } from './image.service';

import { IImageExtractionResponse } from './image.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const extractImageData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.imageBase64) {
      return res.status(400).json({
        success: false,
        message: 'imageBase64 field is required in the request body',
        data: null,
      });
    }

    const result = await ImageServices.extractDataFromImage(req.body);

    sendResponse<IImageExtractionResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result.message,
      data: result,
    });
  },
);

export const ImageController = {
  extractImageData,
};
