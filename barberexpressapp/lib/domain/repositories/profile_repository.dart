// lib/domain/repositories/profile_repository.dart
import '../../data/models/profile/profile_model.dart';

abstract class ProfileRepository {
  Future<ProfileModel> getProfile();
  Future<ProfileModel> updateProfile({
    required String firstName,
    required String lastName,
    required String phone,
    String? profileImage,
  });
}