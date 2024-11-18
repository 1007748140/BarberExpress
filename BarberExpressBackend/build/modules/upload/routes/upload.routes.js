"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const router = (0, express_1.Router)();
const uploadController = new upload_controller_1.UploadController();
router.post('/image', (req, res, next) => {
    uploadController.uploadImage(req, res, (err) => {
        if (err) {
            uploadController.handleMulterError(err, req, res, next);
        }
        else {
            next();
        }
    });
}, uploadController.handleUpload);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map