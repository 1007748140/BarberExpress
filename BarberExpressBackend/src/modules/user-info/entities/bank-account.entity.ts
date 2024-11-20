// src/modules/user-info/entities/bank-account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { DocumentType } from './document-type.entity';
import { AccountType } from './account-type.entity';

@Entity('bank_accounts')
export class BankAccount {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => DocumentType)
    @JoinColumn({ name: 'id_document_type' })
    documentType!: DocumentType;

    @ManyToOne(() => AccountType)
    @JoinColumn({ name: 'id_account_type' })
    accountType!: AccountType;

    @Column({ name: 'bank_name' })
    bankName!: string;

    @Column({ name: 'account_number' })
    accountNumber!: string;

    @Column({ name: 'account_owner' })
    accountOwner!: string;

    @Column({ name: 'document_number' })
    documentNumber!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}