// lib/core/network/api_service.dart
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../config/api_config.dart';

class ApiService {
  late final Dio _dio;
  final SharedPreferences _prefs;

  ApiService(this._prefs) {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConfig.baseUrl,
        connectTimeout: ApiConfig.timeout,
        receiveTimeout: ApiConfig.timeout,
        headers: ApiConfig.headers,
      ),
    );

    // Añadir interceptor para logging
    _dio.interceptors.add(LogInterceptor(
      request: true,
      requestHeader: true,
      requestBody: true,
      responseHeader: true,
      responseBody: true,
      error: true,
    ));
  }

  Map<String, String> getAuthHeaders() {
    final token = _prefs.getString('token');
    if (token == null) {
      return ApiConfig.headers;
    }
    return {
      ...ApiConfig.headers,
      'Authorization': 'Bearer ${token.trim()}',
    };
  }

  Future<Response> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
  }) async {
    try {
      print('REQUEST[GET] => PATH: $path');
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      final response = await _dio.get(
        path,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
      );
      print('RESPONSE[${response.statusCode}] => PATH: $path');
      return response;
    } on DioError catch (e) {
      print('ERROR[${e.response?.statusCode}] => PATH: $path');
      print('ERROR MESSAGE: ${e.message}');
      print('ERROR DATA: ${e.response?.data}');
      rethrow;
    }
  }

  Future<Response> post(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
  }) async {
    try {
      print('REQUEST[POST] => PATH: $path');
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      final response = await _dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
      );
      print('RESPONSE[${response.statusCode}] => PATH: $path');
      return response;
    } on DioError catch (e) {
      print('ERROR[${e.response?.statusCode}] => PATH: $path');
      print('ERROR MESSAGE: ${e.message}');
      print('ERROR DATA: ${e.response?.data}');
      rethrow;
    }
  }

  Future<Response> put(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
  }) async {
    try {
      print('REQUEST[PUT] => PATH: $path');
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      final response = await _dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
      );
      print('RESPONSE[${response.statusCode}] => PATH: $path');
      return response;
    } on DioError catch (e) {
      print('ERROR[${e.response?.statusCode}] => PATH: $path');
      print('ERROR MESSAGE: ${e.message}');
      print('ERROR DATA: ${e.response?.data}');
      rethrow;
    }
  }

  Future<Response> delete(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
  }) async {
    try {
      print('REQUEST[DELETE] => PATH: $path');
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      final response = await _dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
      );
      print('RESPONSE[${response.statusCode}] => PATH: $path');
      return response;
    } on DioError catch (e) {
      print('ERROR[${e.response?.statusCode}] => PATH: $path');
      print('ERROR MESSAGE: ${e.message}');
      print('ERROR DATA: ${e.response?.data}');
      rethrow;
    }
  }

  Future<Response> patch(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
  }) async {
    try {
      print('REQUEST[PATCH] => PATH: $path');
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      final response = await _dio.patch(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
      );
      print('RESPONSE[${response.statusCode}] => PATH: $path');
      return response;
    } on DioError catch (e) {
      print('ERROR[${e.response?.statusCode}] => PATH: $path');
      print('ERROR MESSAGE: ${e.message}');
      print('ERROR DATA: ${e.response?.data}');
      rethrow;
    }
  }

  // Método para actualizar el token después del login
  void updateToken(String token) {
    _prefs.setString('token', token);
  }

  // Método para limpiar el token al cerrar sesión
  void clearToken() {
    _prefs.remove('token');
  }

  // Método para verificar si hay un token almacenado
  bool hasToken() {
    return _prefs.getString('token') != null;
  }

  // Método para obtener el token actual
  String? getToken() {
    return _prefs.getString('token');
  }

  // Método para imprimir el token actual (útil para debugging)
  void printCurrentToken() {
    print('Current Token: ${getToken()}');
  }
}