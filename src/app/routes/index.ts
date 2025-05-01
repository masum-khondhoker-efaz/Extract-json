import express from 'express';
import { AuthRouters } from '../modules/auth/auth.routes';
import { PaymentRouters } from '../modules/payment/payment.route';
import { ImageRoutes } from '../modules/extractImageData/image.routes';
const router = express.Router();

const moduleRoutes = [
  // {
  //   path: '/auth',
  //   route: AuthRouters,
  // },
  // {
  //   path: '/payment',
  //   route: PaymentRouters,
  // },
  {
    path: '/images',
    route: ImageRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
