"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidation = void 0;
const zod_1 = require("zod");
const imageExtractionSchema = zod_1.z.object({
    imageBase64: zod_1.z.string().regex(/^data:image\/png;base64,/, {
        message: 'Invalid base64 PNG image format',
    }),
});
exports.ImageValidation = {
    imageExtractionSchema,
};
