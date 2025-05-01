"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const image_controller_1 = require("./image.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const image_validation_1 = require("./image.validation");
const router = express_1.default.Router();
router.post('/extract-data', (0, validateRequest_1.default)(image_validation_1.ImageValidation.imageExtractionSchema), image_controller_1.ImageController.extractImageData);
exports.ImageRoutes = router;
