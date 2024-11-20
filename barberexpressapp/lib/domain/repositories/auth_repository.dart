// lib/domain/repositories/auth_repository.dart
import 'package:dartz/dartz.dart';
import '../entities/user.dart';
import '../../core/error/failures.dart';
import '../../data/models/auth/register_request_model.dart';
import '../../data/models/location/location_data_response.dart';

abstract class AuthRepository {
  Future<Either<Failure, User>> login(String email, String password);
  Future<Either<Failure, User>> register(RegisterRequestModel request);
  Future<Either<Failure, LocationDataResponse>> getLocationData();
  Future<void> logout();
}