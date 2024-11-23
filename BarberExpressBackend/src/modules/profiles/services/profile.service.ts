// src/modules/profiles/services/profile.service.ts
import { AppDataSource } from '../../../config/database';
import { Profile } from '../entities/profile.entity';

import { NotFoundException, BadRequestException } from '../../core/exceptions';
import fs from 'fs';
import path from 'path';

interface UpdateProfileDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string | undefined;
}

export class ProfileService {
  private profileRepository = AppDataSource.getRepository(Profile);

  async getProfile(userId: number): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!profile) {
        throw new NotFoundException(`Perfil no encontrado para el usuario ${userId}`);
      }

      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al obtener el perfil');
    }
  }

  async updateProfile(userId: number, updateData: UpdateProfileDTO): Promise<Profile> {
    try {
      const profile = await this.getProfile(userId);

      // Si hay una imagen nueva y existe una imagen anterior, eliminar la anterior
      if (updateData.profileImage && profile.profileImage) {
        const oldImagePath = path.join(
          __dirname,
          '../../../',
          profile.profileImage.replace(/^\//, '')
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Actualizar los campos del perfil
      Object.assign(profile, {
        firstName: updateData.firstName || profile.firstName,
        lastName: updateData.lastName || profile.lastName,
        phone: updateData.phone || profile.phone,
        profileImage: updateData.profileImage !== undefined ? updateData.profileImage : profile.profileImage,
      });

      // Guardar cambios
      return await this.profileRepository.save(profile);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al actualizar el perfil');
    }
  }

  async updateProfileImage(userId: number, imageUrl: string | undefined): Promise<Profile> {
    try {
      const profile = await this.getProfile(userId);

      // Si hay una imagen anterior y se está actualizando a una nueva
      if (profile.profileImage && imageUrl) {
        const oldImagePath = path.join(
          __dirname,
          '../../../',
          profile.profileImage.replace(/^\//, '')
        );
        // Eliminar imagen anterior si existe
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Actualizar la URL de la imagen
      profile.profileImage = imageUrl;

      // Guardar cambios
      return await this.profileRepository.save(profile);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al actualizar la imagen de perfil');
    }
  }

  async validateProfileData(data: UpdateProfileDTO): Promise<void> {
    if (data.phone && !/^\d{10}$/.test(data.phone)) {
      throw new BadRequestException('El número de teléfono debe tener 10 dígitos');
    }

    if (data.firstName && (data.firstName.length < 2 || data.firstName.length > 50)) {
      throw new BadRequestException('El nombre debe tener entre 2 y 50 caracteres');
    }

    if (data.lastName && (data.lastName.length < 2 || data.lastName.length > 50)) {
      throw new BadRequestException('El apellido debe tener entre 2 y 50 caracteres');
    }
  }

  async deleteProfile(userId: number): Promise<void> {
    try {
      const profile = await this.getProfile(userId);

      // Eliminar imagen de perfil si existe
      if (profile.profileImage) {
        const imagePath = path.join(
          __dirname,
          '../../../',
          profile.profileImage.replace(/^\//, '')
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Eliminar el perfil
      await this.profileRepository.remove(profile);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al eliminar el perfil');
    }
  }
}