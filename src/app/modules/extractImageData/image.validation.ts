import { z } from 'zod';

const imageExtractionSchema = z.object({
  body: z.object({
    imageBase64: z
      .string({
        required_error: 'imageBase64 is required',
        invalid_type_error: 'imageBase64 must be a string',
      })
      .regex(/^data:image\/png;base64,/, {
        message:
          'Invalid base64 PNG image format. Must start with "data:image/png;base64,"',
      })
      .min(100, {
        message: 'Image data too short to be valid',
      }),
  }),
});

export const ImageValidation = {
  imageExtractionSchema,
};
