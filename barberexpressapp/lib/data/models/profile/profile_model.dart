// lib/data/models/profile/profile_model.dart
import '../auth/user_model.dart';

class ProfileModel {
  final int id;
  final String firstName;
  final String lastName;
  final String phone;
  final String? profileImage;
  final DateTime createdAt;
  final DateTime updatedAt;
  final UserModel user;
  final double? latitude;
  final double? longitude;
  String? formattedAddress; // Para almacenar la dirección formateada

  ProfileModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.phone,
    this.profileImage,
    required this.createdAt,
    required this.updatedAt,
    required this.user,
    this.latitude,
    this.longitude,
    this.formattedAddress,
  });

  factory ProfileModel.fromJson(Map<String, dynamic> json) {
    return ProfileModel(
      id: json['id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      phone: json['phone'],
      profileImage: json['profileImage'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      user: UserModel.fromJson(json['user']),
      latitude: json['latitude']?.toDouble(),
      longitude: json['longitude']?.toDouble(),
      formattedAddress: json['formattedAddress'],
    );
  }
}