// lib/data/datasources/profile_remote_datasource.dart
import 'package:dio/dio.dart';

import '../models/profile/profile_model.dart';
import '../../core/error/exceptions.dart';
import '../../config/api_config.dart';
import '../../core/network/api_service.dart';

abstract class ProfileRemoteDataSource {
  Future<ProfileModel> getProfile();
  Future<ProfileModel> updateProfile({
    required String firstName,
    required String lastName,
    required String phone,
    String? profileImage,
  });
}

class ProfileRemoteDataSourceImpl implements ProfileRemoteDataSource {
  final ApiService apiService;

  ProfileRemoteDataSourceImpl({required this.apiService});

  @override
  Future<ProfileModel> getProfile() async {
    try {
      print('ProfileRemoteDataSource: Obteniendo perfil...');
      
      final response = await apiService.get(
        ApiConfig.getProfile,
        useAuthHeaders: true,
      );

      print('ProfileRemoteDataSource: Respuesta - ${response.statusCode}');
      print('ProfileRemoteDataSource: Datos - ${response.data}');

      if (response.statusCode == 200) {
        try {
          final profile = ProfileModel.fromJson(response.data);
          print('ProfileRemoteDataSource: Perfil procesado correctamente');
          return profile;
        } catch (e) {
          print('ProfileRemoteDataSource: Error al procesar datos - $e');
          print('ProfileRemoteDataSource: Datos recibidos - ${response.data}');
          throw ServerException(
            message: 'Error al procesar los datos del perfil',
          );
        }
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al obtener el perfil',
        );
      }
    } on DioError catch (e) {
      print('ProfileRemoteDataSource: Error Dio - ${e.message}');
      print('ProfileRemoteDataSource: Response - ${e.response?.data}');
      throw ServerException(
        message: e.response?.data['message'] ?? 'Error de conexión',
      );
    } catch (e) {
      print('ProfileRemoteDataSource: Error - $e');
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
          'first_name': firstName,
          'last_name': lastName,
          'phone': phone,
          if (profileImage != null) 'profile_image': profileImage,
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
}