import AppError from '../../errors/AppError';
import {
  IImageData,
  IImageExtractionResponse,
  IImageRequest,
} from './image.interface';
import httpStatus from 'http-status';

export const ImageServices = {
  extractDataFromImage: async (
    payload: IImageRequest,
  ): Promise<IImageExtractionResponse> => {
    const { imageBase64 } = payload;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'imageBase64 must be a valid string',
      );
    }

    try {
      // Verify the base64 prefix
      if (!imageBase64.startsWith('data:image/png;base64,')) {
        throw new Error('Invalid image format');
      }

      // Extract base64 data (remove the prefix)
      const base64Data = imageBase64.replace(/^data:image\/png;base64,/, '');

      // Check if there's actual data after the prefix
      if (!base64Data || base64Data.length < 20) {
        throw new Error('No valid image data found');
      }

      // Convert base64 to buffer
      const buffer = Buffer.from(base64Data, 'base64');

      // Extract text from buffer
      const extractedText = buffer.toString('utf8');

      // Parse the JSON data
      const extractedData: IImageData = JSON.parse(extractedText);

      // Validate the extracted data has required fields
      if (!extractedData.name || !extractedData.organization) {
        throw new Error('Extracted data is missing required fields');
      }

      return {
        success: true,
        data: extractedData,
        message: 'Successfully extracted JSON from image',
      };
    } catch (error) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        error instanceof Error
          ? error.message
          : 'Failed to extract data from image',
      );
    }
  },
};
