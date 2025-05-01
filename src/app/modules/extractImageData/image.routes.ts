import express from 'express';
import { ImageController } from './image.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ImageValidation } from './image.validation';

const router = express.Router();

router.post(
  '/extract-data',
  validateRequest(ImageValidation.imageExtractionSchema),
  ImageController.extractImageData,
);

export const ImageRoutes = router;
