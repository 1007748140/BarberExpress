// lib/config/api_config.dart
class ApiConfig {
  static const String baseUrl = 'http://localhost:3000/api';
  static const Duration timeout = Duration(seconds: 30);
  
  // Endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String locationData = '/location/data';
  static const String uploadImage = '/upload/image';
  static const String createBarbershop = '/barbershops';
  static const String getBarbershop = '/barbershops/own';
  static const String updateBarbershop = '/barbershops/own';
  static const String getProfile = '/profiles/me';
  static const String updateProfile = '/profiles/me';
  static const String updateProfileImage = '/profiles/me/image';
  static const String deleteProfileImage = '/profiles/me/image';
  
  // Headers
  static Map<String, String> get headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  static Map<String, String> get multipartHeaders => {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  };
  
  static Map<String, String> authHeaders(String token) => {
    ...headers,
    'Authorization': 'Bearer $token',
  };

  static Map<String, String> authMultipartHeaders(String token) => {
    ...multipartHeaders,
    'Authorization': 'Bearer $token',
  };
}