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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountController = void 0;
const bank_account_service_1 = require("../services/bank-account.service");
const create_bank_account_dto_1 = require("../dtos/create-bank-account.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BankAccountController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const createBankAccountDto = (0, class_transformer_1.plainToClass)(create_bank_account_dto_1.CreateBankAccountDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createBankAccountDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.bankAccountService.create(req.user.id, createBankAccountDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al crear la cuenta bancaria',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getUserBankAccounts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const result = yield this.bankAccountService.getUserBankAccounts(req.user.id);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener las cuentas bancarias',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getDocumentTypes = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bankAccountService.getDocumentTypes();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los tipos de documento',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getAccountTypes = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bankAccountService.getAccountTypes();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los tipos de cuenta',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.bankAccountService.delete(Number(id));
                res.json({ message: 'Cuenta bancaria eliminada exitosamente' });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al eliminar la cuenta bancaria',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.bankAccountService = new bank_account_service_1.BankAccountService();
    }
}
exports.BankAccountController = BankAccountController;
//# sourceMappingURL=bank-account.controller.js.map