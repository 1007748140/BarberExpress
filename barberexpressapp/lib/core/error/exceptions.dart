// lib/core/error/exceptions.dart
class ServerException implements Exception {
  final String? message;

  ServerException({this.message});
}