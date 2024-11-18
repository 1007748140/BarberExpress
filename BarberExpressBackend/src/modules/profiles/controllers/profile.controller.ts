// src/modules/profiles/controllers/profile.controller.ts
import { Injectable } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    async getProfile(req: any): Promise<Profile> {
        return this.profileService.findByUserId(req.user.id);
    }

    async findOne(id: string): Promise<Profile> {
        return this.profileService.findOne(+id);
    }

    async create(createProfileDto: CreateProfileDto, req: any): Promise<Profile> {
        return this.profileService.create(createProfileDto, req.user.id);
    }

    async update(req: any, updateProfileDto: UpdateProfileDto): Promise<Profile> {
        return this.profileService.update(req.user.id, updateProfileDto);
    }

    async remove(id: string): Promise<void> {
        return this.profileService.remove(+id);
    }
}