// lib/domain/repositories/barbershop_repository.dart
import 'package:dartz/dartz.dart';
import '../../core/error/failures.dart';
import '../../data/models/barbershop/barbershop_model.dart';

abstract class BarbershopRepository {
  Future<Either<Failure, BarbershopModel>> createBarbershop({
    required String name,
    required String description,
    required String imageBanner,
  });

  Future<Either<Failure, BarbershopModel>> getBarbershop();

  Future<Either<Failure, BarbershopModel>> updateBarbershop({
    required String name,
    required String description,
    required String imageBanner,
    required int stateId,
  });
}