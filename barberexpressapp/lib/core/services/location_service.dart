// lib/core/services/location_service.dart
import 'package:geolocator/geolocator.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LocationResult {
  final double latitude;
  final double longitude;
  final String address;
  final String country;
  final String state;
  final String city;

  LocationResult({
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.country,
    required this.state,
    required this.city,
  });
}

class LocationService {
  static String get _apiKey => dotenv.env['GOOGLE_MAPS_API_KEY'] ?? '';

  static Future<bool> _handlePermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    try {
      print('LocationService: Verificando servicios de ubicación...');
      serviceEnabled = await Geolocator.isLocationServiceEnabled();
      print('LocationService: Servicio de ubicación habilitado: $serviceEnabled');

      if (!serviceEnabled) {
        print('LocationService: Servicios de ubicación deshabilitados');
        throw Exception('Los servicios de ubicación están deshabilitados.');
      }

      print('LocationService: Verificando permisos de ubicación...');
      permission = await Geolocator.checkPermission();
      print('LocationService: Permiso actual: $permission');

      if (permission == LocationPermission.denied) {
        print('LocationService: Solicitando permisos de ubicación...');
        permission = await Geolocator.requestPermission();
        print('LocationService: Respuesta a solicitud de permisos: $permission');
        
        if (permission == LocationPermission.denied) {
          print('LocationService: Permisos denegados por el usuario');
          throw Exception('Los permisos de ubicación fueron denegados');
        }
      }

      if (permission == LocationPermission.deniedForever) {
        print('LocationService: Permisos denegados permanentemente');
        throw Exception('Los permisos de ubicación están permanentemente denegados');
      }

      print('LocationService: Permisos concedidos correctamente');
      return true;
    } catch (e) {
      print('LocationService: Error en _handlePermission: $e');
      print('LocationService: Stack trace: ${StackTrace.current}');
      rethrow;
    }
  }

  static Future<LocationResult> getCurrentLocation() async {
    try {
      print('LocationService: Iniciando getCurrentLocation...');
      await _handlePermission();

      print('LocationService: Obteniendo posición actual...');
      final Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
        timeLimit: Duration(seconds: 15),
      );
      print('LocationService: Posición obtenida - Lat: ${position.latitude}, Lng: ${position.longitude}');

      return await _getLocationDetails(position.latitude, position.longitude);
    } catch (e) {
      print('LocationService: Error en getCurrentLocation: $e');
      print('LocationService: Stack trace: ${StackTrace.current}');
      rethrow;
    }
  }

  static Future<LocationResult> getLocationFromCoordinates(
    double latitude,
    double longitude,
  ) async {
    try {
      print('LocationService: Iniciando getLocationFromCoordinates...');
      print('LocationService: Coordenadas recibidas - Lat: $latitude, Lng: $longitude');
      return await _getLocationDetails(latitude, longitude);
    } catch (e) {
      print('LocationService: Error en getLocationFromCoordinates: $e');
      print('LocationService: Stack trace: ${StackTrace.current}');
      rethrow;
    }
  }

  static Future<LocationResult> _getLocationDetails(double latitude, double longitude) async {
    try {
      print('LocationService: Obteniendo detalles de ubicación...');
      print('LocationService: Usando API Key: ${_apiKey.substring(0, 5)}...');
      
      final String url = 
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=$latitude,$longitude&key=$_apiKey&language=es';
      
      final response = await http.get(Uri.parse(url));
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        
        if (data['status'] == 'OK' && data['results'].isNotEmpty) {
          final result = data['results'][0];
          final addressComponents = result['address_components'] as List;
          
          String country = '';
          String state = '';
          String city = '';
          
          for (var component in addressComponents) {
            final types = component['types'] as List;
            if (types.contains('country')) {
              country = component['long_name'];
            }
            if (types.contains('administrative_area_level_1')) {
              state = component['long_name'];
            }
            if (types.contains('locality')) {
              city = component['long_name'];
            }
          }

          print('LocationService: Detalles obtenidos - País: $country, Estado: $state, Ciudad: $city');

          return LocationResult(
            latitude: latitude,
            longitude: longitude,
            address: result['formatted_address'] ?? 'Ubicación seleccionada',
            country: country.isNotEmpty ? country : 'Colombia',
            state: state.isNotEmpty ? state : 'Bogotá D.C.',
            city: city.isNotEmpty ? city : 'Bogotá',
          );
        }
      }
      
      print('LocationService: Error en respuesta de Google Maps - Código: ${response.statusCode}');
      print('LocationService: Respuesta: ${response.body}');
      
      // Si algo falla, devolvemos valores por defecto
      return LocationResult(
        latitude: latitude,
        longitude: longitude,
        address: 'Lat: ${latitude.toStringAsFixed(6)}, Lng: ${longitude.toStringAsFixed(6)}',
        country: 'Colombia',
        state: 'Bogotá D.C.',
        city: 'Bogotá',
      );
    } catch (e) {
      print('LocationService: Error al obtener detalles de ubicación: $e');
      return LocationResult(
        latitude: latitude,
        longitude: longitude,
        address: 'Ubicación seleccionada',
        country: 'Colombia',
        state: 'Bogotá D.C.',
        city: 'Bogotá',
      );
    }
  }
}