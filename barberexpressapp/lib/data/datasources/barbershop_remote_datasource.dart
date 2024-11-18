// lib/data/datasources/barbershop_remote_datasource.dart
import '../../core/network/api_service.dart';
import '../../config/api_config.dart';
import '../models/barbershop/barbershop_model.dart';
import '../../core/error/exceptions.dart';

abstract class BarbershopRemoteDataSource {
  Future<BarbershopModel> createBarbershop({
    required String name,
    required String description,
    required String imageBanner,
  });

  Future<BarbershopModel> getBarbershop();

  Future<BarbershopModel> updateBarbershop({
    required String name,
    required String description,
    required String imageBanner,
    required int stateId,
  });
}

class BarbershopRemoteDataSourceImpl implements BarbershopRemoteDataSource {
  final ApiService apiService;

  BarbershopRemoteDataSourceImpl({required this.apiService});

  @override
  Future<BarbershopModel> createBarbershop({
    required String name,
    required String description,
    required String imageBanner,
  }) async {
    try {
      final response = await apiService.post(
        ApiConfig.createBarbershop,
        data: {
          'name': name,
          'description': description,
          'image_banner': imageBanner,
          'id_state_barbershops': 2, // Estado inicial: Cerrado
        },
      );

      if (response.statusCode == 201) {
        return BarbershopModel.fromJson(response.data);
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al crear la barbería',
        );
      }
    } catch (e) {
      throw ServerException(
        message: 'Error al conectar con el servidor',
      );
    }
  }

  @override
  Future<BarbershopModel> getBarbershop() async {
    try {
      final response = await apiService.get(ApiConfig.getBarbershop);

      if (response.statusCode == 200) {
        return BarbershopModel.fromJson(response.data);
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al obtener la barbería',
        );
      }
    } catch (e) {
      throw ServerException(
        message: 'Error al conectar con el servidor',
      );
    }
  }

  @override
  Future<BarbershopModel> updateBarbershop({
    required String name,
    required String description,
    required String imageBanner,
    required int stateId,
  }) async {
    try {
      final response = await apiService.put(
        ApiConfig.updateBarbershop,
        data: {
          'name': name,
          'description': description,
          'image_banner': imageBanner,
          'id_state_barbershops': stateId,
        },
      );

      if (response.statusCode == 200) {
        return BarbershopModel.fromJson(response.data);
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al actualizar la barbería',
        );
      }
    } catch (e) {
      throw ServerException(
        message: 'Error al conectar con el servidor',
      );
    }
  }
}