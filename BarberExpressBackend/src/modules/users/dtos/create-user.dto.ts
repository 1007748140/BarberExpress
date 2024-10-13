// src/modules/users/dtos/create-user.dto.ts
export interface CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    country_id: number;
    state_id: number;
    role_id: number;
    latitude: number;
    longitude: number;
}