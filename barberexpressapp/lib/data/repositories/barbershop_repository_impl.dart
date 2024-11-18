// lib/data/repositories/barbershop_repository_impl.dart
import 'package:dartz/dartz.dart';
import '../../core/error/failures.dart';
import '../../core/error/exceptions.dart';
import '../../domain/repositories/barbershop_repository.dart';
import '../datasources/barbershop_remote_datasource.dart';
import '../models/barbershop/barbershop_model.dart';

class BarbershopRepositoryImpl implements BarbershopRepository {
  final BarbershopRemoteDataSource remoteDataSource;

  BarbershopRepositoryImpl({
    required this.remoteDataSource,
  });

  @override
  Future<Either<Failure, BarbershopModel>> createBarbershop({
    required String name,
    required String description,
    required String imageBanner,
  }) async {
    try {
      final result = await remoteDataSource.createBarbershop(
        name: name,
        description: description,
        imageBanner: imageBanner,
      );
      return Right(result);
    } on ServerException catch (e) {
      return Left(ServerFailure(message: e.message ?? 'Error del servidor'));
    } catch (e) {
      return Left(ServerFailure(message: 'Error al crear la barbería'));
    }
  }

  @override
  Future<Either<Failure, BarbershopModel>> getBarbershop() async {
    try {
      final result = await remoteDataSource.getBarbershop();
      return Right(result);
    } on ServerException catch (e) {
      return Left(ServerFailure(message: e.message ?? 'Error del servidor'));
    } catch (e) {
      return Left(ServerFailure(message: 'Error al obtener la barbería'));
    }
  }

  @override
  Future<Either<Failure, BarbershopModel>> updateBarbershop({
    required String name,
    required String description,
    required String imageBanner,
    required int stateId,
  }) async {
    try {
      final result = await remoteDataSource.updateBarbershop(
        name: name,
        description: description,
        imageBanner: imageBanner,
        stateId: stateId,
      );
      return Right(result);
    } on ServerException catch (e) {
      return Left(ServerFailure(message: e.message ?? 'Error del servidor'));
    } catch (e) {
      return Left(ServerFailure(message: 'Error al actualizar la barbería'));
    }
  }
}