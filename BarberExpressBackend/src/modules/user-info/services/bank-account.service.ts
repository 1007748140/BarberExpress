// src/modules/user-info/services/bank-account.service.ts
import { AppDataSource } from '../../../config/database';
import { BankAccount } from '../entities/bank-account.entity';
import { User } from '../../auth/entities/user.entity';
import { DocumentType } from '../entities/document-type.entity';
import { AccountType } from '../entities/account-type.entity';
import { CreateBankAccountDto } from '../dtos/create-bank-account.dto';

export class BankAccountService {
    private bankAccountRepository = AppDataSource.getRepository(BankAccount);
    private userRepository = AppDataSource.getRepository(User);
    private documentTypeRepository = AppDataSource.getRepository(DocumentType);
    private accountTypeRepository = AppDataSource.getRepository(AccountType);

    async create(userId: number, createBankAccountDto: CreateBankAccountDto): Promise<BankAccount> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const documentType = await this.documentTypeRepository.findOne({
            where: { id: createBankAccountDto.documentTypeId }
        });

        if (!documentType) {
            throw new Error('Tipo de documento no encontrado');
        }

        const accountType = await this.accountTypeRepository.findOne({
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

        return await this.bankAccountRepository.save(bankAccount);
    }

    async getUserBankAccounts(userId: number): Promise<BankAccount[]> {
        return await this.bankAccountRepository.find({
            where: { user: { id: userId } },
            relations: ['documentType', 'accountType'],
            order: { createdAt: 'DESC' }
        });
    }

    async getDocumentTypes(): Promise<DocumentType[]> {
        return await this.documentTypeRepository.find({
            order: { name: 'ASC' }
        });
    }

    async getAccountTypes(): Promise<AccountType[]> {
        return await this.accountTypeRepository.find({
            order: { name: 'ASC' }
        });
    }

    async delete(id: number): Promise<void> {
        const result = await this.bankAccountRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Cuenta bancaria no encontrada');
        }
    }
}