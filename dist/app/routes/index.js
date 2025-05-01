"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_routes_1 = require("../modules/extractImageData/image.routes");
const router = express_1.default.Router();
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
        route: image_routes_1.ImageRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
