// lib/data/repositories/auth_repository_impl.dart
import 'package:dartz/dartz.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../domain/repositories/auth_repository.dart';
import '../../domain/entities/user.dart';
import '../../core/error/failures.dart';
import '../datasources/auth_remote_datasource.dart';
import '../models/auth/register_request_model.dart';
import '../models/location/location_data_response.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;
  final SharedPreferences sharedPreferences;

  AuthRepositoryImpl({
    required this.remoteDataSource,
    required this.sharedPreferences,
  });

  @override
  Future<Either<Failure, LocationDataResponse>> getLocationData() async {
    try {
      final result = await remoteDataSource.getLocationData();
      return Right(result);
    } catch (e) {
      return Left(ServerFailure(
        message: 'Error al obtener datos de ubicación del servidor'
      ));
    }
  }

  @override
  Future<Either<Failure, User>> login(String email, String password) async {
    try {
      final result = await remoteDataSource.login(email, password);
      await sharedPreferences.setString('token', result.token);
      return Right(result.user);
    } catch (e) {
      return Left(ServerFailure(
        message: 'Error al iniciar sesión'
      ));
    }
  }

  @override
  Future<Either<Failure, User>> register(RegisterRequestModel request) async {
    try {
      final result = await remoteDataSource.register(request);
      await sharedPreferences.setString('token', result.token);
      return Right(result.user);
    } catch (e) {
      return Left(ServerFailure(
        message: 'Error al registrar usuario'
      ));
    }
  }

  @override
  Future<void> logout() async {
    await sharedPreferences.remove('token');
  }
}