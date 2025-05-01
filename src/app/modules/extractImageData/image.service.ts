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

    try {
      // Extract base64 data (remove the prefix)
      const base64Data = imageBase64.replace(/^data:image\/png;base64,/, '');

      // Convert base64 to buffer
      const buffer = Buffer.from(base64Data, 'base64');

      // Extract text from buffer (assuming it's embedded as plain text)
      const extractedText = buffer.toString('utf8');

      // Parse the JSON data
      const extractedData: IImageData = JSON.parse(extractedText);

      return {
        success: true,
        data: extractedData,
        message: 'Successfully extracted JSON from image',
      };
    } catch (error) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to extract data from image. Make sure the image contains valid JSON data.',
      );
    }
  },
};
