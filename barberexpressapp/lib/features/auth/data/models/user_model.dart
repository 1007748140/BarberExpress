// lib/features/auth/data/models/user_model.dart
class UserModel {
  final int id;
  final String email;
  final String firstName;
  final String lastName;
  final String? phone;

  UserModel({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    this.phone,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      firstName: json['first_name'] ?? '',
      lastName: json['last_name'] ?? '',
      phone: json['phone'],
    );
  }
}