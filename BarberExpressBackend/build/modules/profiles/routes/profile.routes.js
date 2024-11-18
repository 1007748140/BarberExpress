"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const checkJwt_1 = require("../../../middlewares/checkJwt");
const profile_service_1 = require("../services/profile.service");
const database_1 = require("../../../config/database");
const profile_entity_1 = require("../entities/profile.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const router = (0, express_1.Router)();
const profileService = new profile_service_1.ProfileService(database_1.AppDataSource.getRepository(profile_entity_1.Profile), database_1.AppDataSource.getRepository(user_entity_1.User));
const profileController = new profile_controller_1.ProfileController(profileService);
router.use(checkJwt_1.checkJwt);
router.get('/me', (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    profileController.getProfile({ user: { id: userId } })
        .then(profile => {
        res.json(profile);
    })
        .catch(error => {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al obtener el perfil';
        res.status(500).json({ message: errorMessage });
    });
});
router.get('/:id', (req, res) => {
    profileController.findOne(req.params.id)
        .then(profile => {
        res.json(profile);
    })
        .catch(error => {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al obtener el perfil';
        res.status(500).json({ message: errorMessage });
    });
});
router.post('/', (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const createProfileDto = req.body;
    profileController.create(createProfileDto, { user: { id: userId } })
        .then(profile => {
        res.status(201).json(profile);
    })
        .catch(error => {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear el perfil';
        res.status(500).json({ message: errorMessage });
    });
});
router.put('/me', (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const updateProfileDto = req.body;
    profileController.update({ user: { id: userId } }, updateProfileDto)
        .then(profile => {
        res.json(profile);
    })
        .catch(error => {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al actualizar el perfil';
        res.status(500).json({ message: errorMessage });
    });
});
router.delete('/:id', (req, res) => {
    profileController.remove(req.params.id)
        .then(() => {
        res.json({ message: 'Perfil eliminado exitosamente' });
    })
        .catch(error => {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar el perfil';
        res.status(500).json({ message: errorMessage });
    });
});
exports.default = router;
//# sourceMappingURL=profile.routes.js.map