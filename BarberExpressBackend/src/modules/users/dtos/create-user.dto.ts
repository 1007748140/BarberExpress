// src/modules/users/dtos/create-user.dto.ts
import { 
    IsString, 
    IsEmail, 
    MinLength, 
    IsNumber, 
    IsNotEmpty,
    Matches
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'First name must be a string' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    firstName!: string;

    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'El apellido debe ser una cadena' })
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres.' })
    lastName!: string;

    @IsNotEmpty({ message: 'Se requiere correo electrónico' })
    @IsEmail({}, { message: 'Formato de correo electrónico no válido' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial' }
    )
    password!: string;

    @IsNotEmpty({ message: 'Phone is required' })
    @Matches(/^\+?[1-9]\d{1,10}$/, { message: 'Invalid phone number format' })
    phone!: string;

    @IsNotEmpty({ message: 'Role ID is required' })
    @IsNumber({}, { message: 'Role ID must be a number' })
    idRole!: number;

    @IsNotEmpty({ message: 'Country ID is required' })
    @IsNumber({}, { message: 'Country ID must be a number' })
    idCountry!: number;

    @IsNotEmpty({ message: 'Department ID is required' })
    @IsNumber({}, { message: 'Department ID must be a number' })
    idDepartment!: number;

    @IsNotEmpty({ message: 'Latitude is required' })
    @IsNumber({}, { message: 'Latitude must be a number' })
    latitude!: number;

    @IsNotEmpty({ message: 'Longitude is required' })
    @IsNumber({}, { message: 'Longitude must be a number' })
    longitude!: number;
}