// lib/data/datasources/profile_remote_datasource.dart
import 'package:dio/dio.dart';
import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/foundation.dart';
import '../../core/error/exceptions.dart';
import '../../config/api_config.dart';
import '../../core/network/api_service.dart';
import '../models/profile/profile_model.dart';
import 'package:http_parser/http_parser.dart';
import 'dart:convert';
import 'package:image_picker/image_picker.dart';
import 'package:image/image.dart' as img;

abstract class ProfileRemoteDataSource {
  Future<ProfileModel> getProfile();
  Future<ProfileModel> updateProfile({
    required String firstName,
    required String lastName,
    required String phone,
    String? profileImage,
  });
  Future<String> uploadProfileImage(dynamic imageFile);
}

class ProfileRemoteDataSourceImpl implements ProfileRemoteDataSource {
  final ApiService apiService;

  ProfileRemoteDataSourceImpl({required this.apiService});

  Future<Uint8List> _compressImage(Uint8List bytes) async {
    // Decodificar la imagen
    img.Image? image = img.decodeImage(bytes);
    if (image == null) return bytes;

    // Redimensionar si es muy grande
    if (image.width > 1000 || image.height > 1000) {
      image = img.copyResize(
        image,
        width: image.width > image.height ? 1000 : null,
        height: image.height >= image.width ? 1000 : null,
      );
    }

    // Comprimir como JPEG con calidad reducida
    return Uint8List.fromList(img.encodeJpg(image, quality: 70));
  }

  @override
  Future<ProfileModel> getProfile() async {
    try {
      final response = await apiService.get(
        ApiConfig.getProfile,
        useAuthHeaders: true,
      );

      if (response.statusCode == 200) {
        return ProfileModel.fromJson(response.data);
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al obtener el perfil',
        );
      }
    } catch (e) {
      print('Error al obtener perfil: $e');
      throw ServerException(
        message: 'Error al obtener el perfil: ${e.toString()}',
      );
    }
  }

  @override
  Future<ProfileModel> updateProfile({
    required String firstName,
    required String lastName,
    required String phone,
    String? profileImage,
  }) async {
    try {
      final response = await apiService.put(
        ApiConfig.updateProfile,
        data: {
          'firstName': firstName,
          'lastName': lastName,
          'phone': phone,
          if (profileImage != null) 'profileImage': profileImage,
        },
      );

      if (response.statusCode == 200) {
        return ProfileModel.fromJson(response.data);
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al actualizar el perfil',
        );
      }
    } catch (e) {
      throw ServerException(
        message: 'Error al actualizar el perfil: ${e.toString()}',
      );
    }
  }

  @override
  Future<String> uploadProfileImage(dynamic imageFile) async {
    try {
      FormData formData;
      late Uint8List imageBytes;

      if (kIsWeb) {
        if (imageFile is String && imageFile.startsWith('data:image')) {
          // Convertir base64 a bytes y comprimir
          imageBytes = base64Decode(imageFile.split(',')[1]);
          imageBytes = await _compressImage(imageBytes);
          
          formData = FormData.fromMap({
            'image': MultipartFile.fromBytes(
              imageBytes,
              filename: 'profile_image.jpg',
              contentType: MediaType('image', 'jpeg'),
            ),
          });
        } else if (imageFile is XFile) {
          imageBytes = await imageFile.readAsBytes();
          imageBytes = await _compressImage(imageBytes);
          
          formData = FormData.fromMap({
            'image': MultipartFile.fromBytes(
              imageBytes,
              filename: 'profile_image.jpg',
              contentType: MediaType('image', 'jpeg'),
            ),
          });
        } else {
          throw ServerException(message: 'Formato de imagen no válido');
        }
      } else {
        if (imageFile is File) {
          imageBytes = await imageFile.readAsBytes();
          imageBytes = await _compressImage(imageBytes);
          
          formData = FormData.fromMap({
            'image': MultipartFile.fromBytes(
              imageBytes,
              filename: 'profile_image.jpg',
              contentType: MediaType('image', 'jpeg'),
            ),
          });
        } else if (imageFile is XFile) {
          imageBytes = await imageFile.readAsBytes();
          imageBytes = await _compressImage(imageBytes);
          
          formData = FormData.fromMap({
            'image': MultipartFile.fromBytes(
              imageBytes,
              filename: 'profile_image.jpg',
              contentType: MediaType('image', 'jpeg'),
            ),
          });
        } else {
          throw ServerException(message: 'Formato de imagen no válido');
        }
      }

      // Verificar tamaño de la imagen comprimida
      if (imageBytes.length > 5 * 1024 * 1024) { // 5MB
        throw ServerException(
          message: 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.',
        );
      }

      final response = await apiService.post(
        ApiConfig.updateProfileImage,
        data: formData,
        options: Options(
          headers: {
            ...apiService.getAuthHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        ),
      );

      if (response.statusCode == 200) {
        return response.data['imageUrl'];
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al subir la imagen',
        );
      }
    } catch (e) {
      print('Error al subir imagen: $e');
      throw ServerException(
        message: 'Error al subir la imagen: ${e.toString()}',
      );
    }
  }
}