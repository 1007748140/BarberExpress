// lib/data/repositories/profile_repository_impl.dart
import 'package:dartz/dartz.dart';
import '../../domain/repositories/profile_repository.dart';
import '../datasources/profile_remote_datasource.dart';
import '../models/profile/profile_model.dart';
import '../../core/error/failures.dart';
import '../../core/error/exceptions.dart';

class ProfileRepositoryImpl implements ProfileRepository {
  final ProfileRemoteDataSource remoteDataSource;

  ProfileRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<Failure, ProfileModel>> getProfile() async {
    try {
      final profile = await remoteDataSource.getProfile();
      return Right(profile);
    } on ServerException catch (e) {
      return Left(ServerFailure(message: e.message ?? ''));
    } catch (e) {
      return Left(ServerFailure(
        message: 'Error inesperado al obtener el perfil: ${e.toString()}'
      ));
    }
  }

  @override
  Future<Either<Failure, ProfileModel>> updateProfile({
    String? firstName,
    String? lastName,
    String? phone,
    String? profileImage,
  }) async {
    try {
      final profile = await remoteDataSource.updateProfile(
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        phone: phone ?? '',
        profileImage: profileImage,
      );
      return Right(profile);
    } on ServerException catch (e) {
      return Left(ServerFailure(message: e.message ?? ''));
    } catch (e) {
      return Left(ServerFailure(
        message: 'Error inesperado al actualizar el perfil: ${e.toString()}'
      ));
    }
  }

  @override
  Future<Either<Failure, String>> uploadProfileImage(dynamic imageFile) async {
    try {
      final imageUrl = await remoteDataSource.uploadProfileImage(imageFile);
      return Right(imageUrl);
    } on ServerException catch (e) {
      return Left(ServerFailure(message: e.message ?? ''));
    } catch (e) {
      return Left(ServerFailure(
        message: 'Error inesperado al subir la imagen: ${e.toString()}'
      ));
    }
  }
}