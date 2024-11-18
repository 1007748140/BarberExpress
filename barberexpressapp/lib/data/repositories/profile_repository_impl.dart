// lib/data/repositories/profile_repository_impl.dart
import '../../domain/repositories/profile_repository.dart';
import '../datasources/profile_remote_datasource.dart';
import '../models/profile/profile_model.dart';
import '../../core/error/failures.dart';
import '../../core/error/exceptions.dart';

class ProfileRepositoryImpl implements ProfileRepository {
  final ProfileRemoteDataSource remoteDataSource;

  ProfileRepositoryImpl({required this.remoteDataSource});

  @override
  Future<ProfileModel> getProfile() async {
    try {
      final profile = await remoteDataSource.getProfile();
      return profile;
    } on ServerException catch (e) {
      throw ServerFailure(message: e.message ?? 'Error al obtener el perfil');
    } catch (e) {
      throw ServerFailure(message: 'Error inesperado al obtener el perfil');
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
      final profile = await remoteDataSource.updateProfile(
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        profileImage: profileImage,
      );
      return profile;
    } on ServerException catch (e) {
      throw ServerFailure(message: e.message ?? 'Error al actualizar el perfil');
    } catch (e) {
      throw ServerFailure(message: 'Error inesperado al actualizar el perfil');
    }
  }
}