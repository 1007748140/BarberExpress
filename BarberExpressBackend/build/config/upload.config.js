"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConfig = void 0;
const path_1 = __importDefault(require("path"));
exports.uploadConfig = {
    directory: path_1.default.join(__dirname, '../../uploads'),
    maxSize: 5 * 1024 * 1024,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
    fileFilter: (file) => {
        return exports.uploadConfig.allowedMimeTypes.includes(file.mimetype);
    }
};
//# sourceMappingURL=upload.config.js.map