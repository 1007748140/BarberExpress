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
exports.BankAccountService = void 0;
const database_1 = require("../../../config/database");
const bank_account_entity_1 = require("../entities/bank-account.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const document_type_entity_1 = require("../entities/document-type.entity");
const account_type_entity_1 = require("../entities/account-type.entity");
class BankAccountService {
    constructor() {
        this.bankAccountRepository = database_1.AppDataSource.getRepository(bank_account_entity_1.BankAccount);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.documentTypeRepository = database_1.AppDataSource.getRepository(document_type_entity_1.DocumentType);
        this.accountTypeRepository = database_1.AppDataSource.getRepository(account_type_entity_1.AccountType);
    }
    create(userId, createBankAccountDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const documentType = yield this.documentTypeRepository.findOne({
                where: { id: createBankAccountDto.documentTypeId }
            });
            if (!documentType) {
                throw new Error('Tipo de documento no encontrado');
            }
            const accountType = yield this.accountTypeRepository.findOne({
                where: { id: createBankAccountDto.accountTypeId }
            });
            if (!accountType) {
                throw new Error('Tipo de cuenta no encontrado');
            }
            const bankAccount = this.bankAccountRepository.create({
                user,
                documentType,
                accountType,
                bankName: createBankAccountDto.bankName,
                accountNumber: createBankAccountDto.accountNumber,
                accountOwner: createBankAccountDto.accountOwner,
                documentNumber: createBankAccountDto.documentNumber
            });
            return yield this.bankAccountRepository.save(bankAccount);
        });
    }
    getUserBankAccounts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bankAccountRepository.find({
                where: { user: { id: userId } },
                relations: ['documentType', 'accountType'],
                order: { createdAt: 'DESC' }
            });
        });
    }
    getDocumentTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.documentTypeRepository.find({
                order: { name: 'ASC' }
            });
        });
    }
    getAccountTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountTypeRepository.find({
                order: { name: 'ASC' }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.bankAccountRepository.delete(id);
            if (result.affected === 0) {
                throw new Error('Cuenta bancaria no encontrada');
            }
        });
    }
}
exports.BankAccountService = BankAccountService;
//# sourceMappingURL=bank-account.service.js.map