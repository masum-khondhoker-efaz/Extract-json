import { z } from 'zod';

const imageExtractionSchema = z.object({
  imageBase64: z.string().regex(/^data:image\/png;base64,/, {
    message: 'Invalid base64 PNG image format',
  }),
});

export const ImageValidation = {
  imageExtractionSchema,
};
