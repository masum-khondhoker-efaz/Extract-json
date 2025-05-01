"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidation = void 0;
const zod_1 = require("zod");
const imageExtractionSchema = zod_1.z.object({
    body: zod_1.z.object({
        imageBase64: zod_1.z
            .string({
            required_error: 'imageBase64 is required',
            invalid_type_error: 'imageBase64 must be a string',
        })
            .regex(/^data:image\/png;base64,/, {
            message: 'Invalid base64 PNG image format. Must start with "data:image/png;base64,"',
        })
            .min(100, {
            message: 'Image data too short to be valid',
        }),
    }),
});
exports.ImageValidation = {
    imageExtractionSchema,
};
