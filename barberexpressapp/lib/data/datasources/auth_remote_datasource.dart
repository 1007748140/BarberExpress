// lib/data/datasources/auth_remote_datasource.dart
import 'package:dio/dio.dart';
import '../models/auth/login_response_model.dart';
import '../models/auth/register_request_model.dart';
import '../models/location/location_data_response.dart';
import '../../core/network/api_service.dart';
import '../../config/api_config.dart';
import '../../core/error/exceptions.dart';

abstract class AuthRemoteDataSource {
  Future<LoginResponseModel> login(String email, String password);
  Future<LoginResponseModel> register(RegisterRequestModel request);
  Future<LocationDataResponse> getLocationData();
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final ApiService apiService;

  AuthRemoteDataSourceImpl({required this.apiService});

  @override
  Future<LocationDataResponse> getLocationData() async {
    try {
      print('AuthRemoteDataSource: Solicitando datos de ubicación...');
      final response = await apiService.get(
        ApiConfig.locationData,
        useAuthHeaders: false, // No necesita autorización
      );
      
      print('AuthRemoteDataSource: Respuesta de ubicación - ${response.statusCode}');
      print('AuthRemoteDataSource: Datos - ${response.data}');

      if (response.statusCode == 200) {
        if (response.data is! Map) {
          throw ServerException(message: 'Formato de respuesta inválido');
        }

        final Map<String, dynamic> data = Map<String, dynamic>.from(response.data);
        final result = LocationDataResponse.fromJson(data);
        
        print('AuthRemoteDataSource: Datos procesados correctamente');
        print('AuthRemoteDataSource: ${result.countries.length} países y ${result.departments.length} departamentos cargados');
        
        return result;
      } else {
        throw ServerException(
          message: response.data['message'] ?? 'Error al obtener datos de ubicación'
        );
      }
    } on DioError catch (e) {
      print('AuthRemoteDataSource: Error Dio en ubicación - ${e.message}');
      print('AuthRemoteDataSource: Response - ${e.response?.data}');
      throw ServerException(
        message: e.response?.data['message'] ?? 'Error de conexión'
      );
    } catch (e, stackTrace) {
      print('AuthRemoteDataSource: Error al obtener datos de ubicación - $e');
      print('AuthRemoteDataSource: Stack trace - $stackTrace');
      throw ServerException(
        message: 'Error al obtener datos de ubicación: ${e.toString()}'
      );
    }
  }

  @override
  Future<LoginResponseModel> login(String email, String password) async {
  try {
    print('AuthRemoteDataSource: Iniciando login...');
    final response = await apiService.post(
      ApiConfig.login,
      data: {
        'email': email,
        'password': password,
      },
      useAuthHeaders: false,
    );

    if (response.statusCode == 200) {
      final loginResponse = LoginResponseModel.fromJson(response.data);
      print('Token a guardar: ${loginResponse.token}');
      apiService.updateToken(loginResponse.token);
      print('Token guardado: ${apiService.getToken()}'); // Verificar que se guardó
      return loginResponse;
    } else {
      throw ServerException(
        message: response.data['message'] ?? 'Error al iniciar sesión'
      );
    }
  } catch (e) {
    print('Error en login: $e');
    rethrow;
  }
}

  @override
  Future<LoginResponseModel> register(RegisterRequestModel request) async {
    try {
      print('AuthRemoteDataSource: Iniciando registro...');
      print('AuthRemoteDataSource: Datos de registro - ${request.toJson()}');
      
      final response = await apiService.post(
        ApiConfig.register,
        data: request.toJson(),
        useAuthHeaders: false, // No necesita autorización para registro
      );
      
      print('AuthRemoteDataSource: Respuesta del servidor - ${response.statusCode}');
      print('AuthRemoteDataSource: Datos de respuesta - ${response.data}');

      if (response.statusCode == 201) {
        final loginResponse = LoginResponseModel.fromJson(response.data);
        // Guardar el token después de un registro exitoso
        apiService.updateToken(loginResponse.token);
        return loginResponse;
      } else {
        print('AuthRemoteDataSource: Error en respuesta - ${response.data}');
        throw ServerException(
          message: response.data['message'] ?? 'Error al registrar usuario'
        );
      }
    } on DioError catch (e) {
      print('AuthRemoteDataSource: Error Dio en registro - ${e.message}');
      print('AuthRemoteDataSource: Response - ${e.response?.data}');
      throw ServerException(
        message: e.response?.data['message'] ?? 'Error de conexión'
      );
    } catch (e) {
      print('AuthRemoteDataSource: Error inesperado en registro - $e');
      print('AuthRemoteDataSource: Stack trace - ${StackTrace.current}');
      throw ServerException(
        message: 'Error inesperado al registrar usuario'
      );
    }
  }
}