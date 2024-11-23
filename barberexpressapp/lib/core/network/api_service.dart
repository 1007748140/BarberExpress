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
        validateStatus: (status) {
          return status! < 500;
        },
        // Aumentar el límite máximo de respuesta
        receiveDataWhenStatusError: true,
        maxRedirects: 5,
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
      logPrint: (object) {
        print('DIO LOG: $object');
      },
    ));

    // Interceptor para manejar errores
    _dio.interceptors.add(InterceptorsWrapper(
      onError: (DioError e, handler) async {
        print('Error Code: ${e.response?.statusCode}');
        print('Error Data: ${e.response?.data}');
        return handler.next(e);
      },
      onRequest: (options, handler) {
        print('Sending request: ${options.method} ${options.path}');
        return handler.next(options);
      },
      onResponse: (response, handler) {
        print('Received response: ${response.statusCode}');
        return handler.next(response);
      },
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

  Future<Response> post(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      final response = await _dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );

      if (response.statusCode == 413) {
        throw DioError(
          requestOptions: response.requestOptions,
          response: response,
          type: DioErrorType.badResponse,
          error: 'Archivo demasiado grande. El tamaño máximo permitido es 5MB.',
        );
      }

      return response;
    } on DioError catch (e) {
      print('DioError en post: ${e.message}');
      print('Response: ${e.response?.data}');
      rethrow;
    }
  }

  Future<Response> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      return await _dio.get(
        path,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
        onReceiveProgress: onReceiveProgress,
      );
    } on DioError catch (e) {
      print('DioError en get: ${e.message}');
      print('Response: ${e.response?.data}');
      rethrow;
    }
  }

  Future<Response> put(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    bool useAuthHeaders = true,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final headers = useAuthHeaders ? getAuthHeaders() : ApiConfig.headers;
      return await _dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options ?? Options(headers: headers),
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
    } on DioError catch (e) {
      print('DioError en put: ${e.message}');
      print('Response: ${e.response?.data}');
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
}