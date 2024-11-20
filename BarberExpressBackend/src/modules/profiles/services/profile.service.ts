// src/modules/profiles/services/profile.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { User } from '../../auth/entities/user.entity';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';


@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createProfileDto: CreateProfileDto, userId: number): Promise<Profile> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = this.profileRepository.create({
      ...createProfileDto,
      user,
    });

    return await this.profileRepository.save(profile);
  }

  async findByUserId(userId: number): Promise<Profile> {
    console.log('Finding profile for user ID:', userId);
    
    if (!userId || isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    try {
      const profile = await this.profileRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!profile) {
        throw new NotFoundException(`Profile not found for user ID ${userId}`);
      }

      return profile;
    } catch (error) {
      console.error('Error finding profile:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async update(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.findByUserId(userId);

    if (!profile) {
      throw new NotFoundException(`Profile not found for user ID ${userId}`);
    }

    // Actualizamos solo los campos proporcionados
    Object.assign(profile, updateProfileDto);

    return await this.profileRepository.save(profile);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.findOne(id);
    await this.profileRepository.remove(profile);
  }
}