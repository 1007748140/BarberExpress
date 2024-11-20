// src/modules/user-info/dtos/create-bank-account.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBankAccountDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El tipo de documento es requerido' })
    documentTypeId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El tipo de cuenta es requerido' })
    accountTypeId!: number;

    @IsString()
    @IsNotEmpty({ message: 'El nombre del banco es requerido' })
    bankName!: string;

    @IsString()
    @IsNotEmpty({ message: 'El número de cuenta es requerido' })
    accountNumber!: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre del titular es requerido' })
    accountOwner!: string;

    @IsString()
    @IsNotEmpty({ message: 'El número de documento es requerido' })
    documentNumber!: string;
}