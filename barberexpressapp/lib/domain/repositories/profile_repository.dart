// lib/domain/repositories/profile_repository.dart
import 'package:dartz/dartz.dart';
import '../../core/error/failures.dart';
import '../../data/models/profile/profile_model.dart';

abstract class ProfileRepository {
  Future<Either<Failure, ProfileModel>> getProfile();
  Future<Either<Failure, ProfileModel>> updateProfile({
    required String firstName,
    required String lastName,
    required String phone,
    String? profileImage,
  });
  Future<Either<Failure, String>> uploadProfileImage(dynamic imageFile);
}