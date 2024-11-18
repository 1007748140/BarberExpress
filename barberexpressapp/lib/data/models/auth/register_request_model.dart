// lib/data/models/auth/register_request_model.dart
class RegisterRequestModel {
  final String email;
  final String password;
  final String role;  // Cambiamos userRole por role
  final String firstName;
  final String lastName;
  final String phone;
  final String? profileImage;
  final double latitude;
  final double longitude;
  final int countryId;
  final int departmentId;

  RegisterRequestModel({
    required this.email,
    required this.password,
    required this.role,  // Cambiamos userRole por role
    required this.firstName,
    required this.lastName,
    required this.phone,
    this.profileImage,
    required this.latitude,
    required this.longitude,
    required this.countryId,
    required this.departmentId,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      'role': role,  // Cambiamos userRole por role
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'profileImage': profileImage,
      'latitude': latitude,
      'longitude': longitude,
      'countryId': countryId,
      'departmentId': departmentId,
    };
  }
}