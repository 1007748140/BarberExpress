// lib/data/models/auth/login_response_model.dart
import 'user_model.dart';

class LoginResponseModel {
  final bool success;
  final String token;
  final UserModel user;

  LoginResponseModel({
    required this.success,
    required this.token,
    required this.user,
  });

  factory LoginResponseModel.fromJson(Map<String, dynamic> json) {
    return LoginResponseModel(
      success: json['success'],
      token: json['token'],
      user: UserModel.fromJson(json['user']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': success,
      'token': token,
      'user': user.toJson(),
    };
  }
}