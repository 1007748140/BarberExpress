// lib/data/models/location/department_model.dart
class DepartmentModel {
  final int id;
  final String name;
  final int countryId;

  DepartmentModel({
    required this.id,
    required this.name,
    required this.countryId,
  });

  factory DepartmentModel.fromJson(Map<String, dynamic> json) {
    return DepartmentModel(
      id: json['id'] as int,
      name: json['name'] as String,
      // Asumimos que todos los departamentos son de Colombia (id: 1)
      countryId: json['id_country'] ?? 1,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'id_country': countryId,
    };
  }

  @override
  String toString() => 'DepartmentModel(id: $id, name: $name, countryId: $countryId)';
}