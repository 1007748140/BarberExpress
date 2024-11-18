// lib/data/models/location/country_model.dart
class CountryModel {
  final int id;
  final String name;

  CountryModel({
    required this.id,
    required this.name,
  });

  factory CountryModel.fromJson(Map<String, dynamic> json) {
    try {
      return CountryModel(
        id: json['id'] as int,
        name: json['name'] as String,
      );
    } catch (e, stackTrace) {
      print('Error parsing CountryModel: $e');
      print('JSON data: $json');
      print('Stack trace: $stackTrace');
      rethrow;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
    };
  }
}