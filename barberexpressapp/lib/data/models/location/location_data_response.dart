// lib/data/models/location/location_data_response.dart
import 'package:equatable/equatable.dart';
import 'country_model.dart';
import 'department_model.dart';

class LocationDataResponse extends Equatable {
  final List<CountryModel> countries;
  final List<DepartmentModel> departments;

  const LocationDataResponse({
    required this.countries,
    required this.departments,
  });

  factory LocationDataResponse.fromJson(Map<String, dynamic> json) {
    try {
      print('Parsing LocationDataResponse with data: $json');
      
      final List<CountryModel> countries = [];
      final List<DepartmentModel> departments = [];

      if (json['countries'] is List) {
        countries.addAll((json['countries'] as List)
            .map((country) => CountryModel.fromJson(country as Map<String, dynamic>)));
      }

      if (json['departments'] is List) {
        departments.addAll((json['departments'] as List)
            .map((department) => DepartmentModel.fromJson(department as Map<String, dynamic>)));
      }

      print('Parsed ${countries.length} countries and ${departments.length} departments');
      
      return LocationDataResponse(
        countries: countries,
        departments: departments,
      );
    } catch (e, stackTrace) {
      print('Error parsing LocationDataResponse: $e');
      print('Stack trace: $stackTrace');
      rethrow;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'countries': countries.map((country) => country.toJson()).toList(),
      'departments': departments.map((department) => department.toJson()).toList(),
    };
  }

  @override
  List<Object?> get props => [countries, departments];

  @override
  String toString() => 'LocationDataResponse(countries: $countries, departments: $departments)';
}