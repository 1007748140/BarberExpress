"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const upload_middleware_1 = require("../../../middlewares/upload.middleware");
const router = (0, express_1.Router)();
const profileController = new profile_controller_1.ProfileController();
router.use((0, auth_middleware_1.authMiddleware)());
router.get('/me', profileController.getProfile);
router.put('/me', profileController.updateProfile);
router.post('/me/image', upload_middleware_1.uploadProfile.single('image'), profileController.updateProfileImage);
router.delete('/me/image', profileController.deleteProfileImage);
exports.default = router;
//# sourceMappingURL=profile.routes.js.map