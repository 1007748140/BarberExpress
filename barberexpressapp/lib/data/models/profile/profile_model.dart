// lib/data/models/profile/profile_model.dart
import '../auth/user_model.dart';

class ProfileModel {
  final int id;
  final UserModel user;
  final String firstName;
  final String lastName;
  final String phone;
  final String? profileImage;
  final DateTime createdAt;
  final DateTime updatedAt;

  ProfileModel({
    required this.id,
    required this.user,
    required this.firstName,
    required this.lastName,
    required this.phone,
    this.profileImage,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ProfileModel.fromJson(Map<String, dynamic> json) {
    return ProfileModel(
      id: json['id'],
      user: UserModel.fromJson(json['user']),
      firstName: json['firstName'],
      lastName: json['lastName'],
      phone: json['phone'],
      profileImage: json['profileImage'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user': user.toJson(),
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'profileImage': profileImage,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  ProfileModel copyWith({
    int? id,
    UserModel? user,
    String? firstName,
    String? lastName,
    String? phone,
    String? profileImage,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return ProfileModel(
      id: id ?? this.id,
      user: user ?? this.user,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      phone: phone ?? this.phone,
      profileImage: profileImage ?? this.profileImage,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}