// lib/domain/entities/profile.dart
import 'package:equatable/equatable.dart';
import 'user.dart';

class Profile extends Equatable {
  final int id;
  final User user;
  final String firstName;
  final String lastName;
  final String phone;
  final String? profileImage;

  const Profile({
    required this.id,
    required this.user,
    required this.firstName,
    required this.lastName,
    required this.phone,
    this.profileImage,
  });

  @override
  List<Object?> get props => [id, user, firstName, lastName, phone, profileImage];
}