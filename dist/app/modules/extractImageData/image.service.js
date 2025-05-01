"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
exports.ImageServices = {
    extractDataFromImage: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { imageBase64 } = payload;
        if (!imageBase64 || typeof imageBase64 !== 'string') {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'imageBase64 must be a valid string');
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
            const extractedData = JSON.parse(extractedText);
            // Validate the extracted data has required fields
            if (!extractedData.name || !extractedData.organization) {
                throw new Error('Extracted data is missing required fields');
            }
            return {
                success: true,
                data: extractedData,
                message: 'Successfully extracted JSON from image',
            };
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error instanceof Error
                ? error.message
                : 'Failed to extract data from image');
        }
    }),
};
