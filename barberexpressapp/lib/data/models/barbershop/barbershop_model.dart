// lib/data/models/barbershop/barbershop_model.dart
class BarbershopModel {
  final int? id;
  final int userId;
  final int stateId;
  final String name;
  final String description;
  final String imageBanner;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  BarbershopModel({
    this.id,
    required this.userId,
    required this.stateId,
    required this.name,
    required this.description,
    required this.imageBanner,
    this.createdAt,
    this.updatedAt,
  });

  factory BarbershopModel.fromJson(Map<String, dynamic> json) {
    return BarbershopModel(
      id: json['id'],
      userId: json['id_user'],
      stateId: json['id_state_barbershops'],
      name: json['name'],
      description: json['description'],
      imageBanner: json['image_banner'],
      createdAt: json['created_at'] != null 
          ? DateTime.parse(json['created_at']) 
          : null,
      updatedAt: json['updated_at'] != null 
          ? DateTime.parse(json['updated_at']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'id_user': userId,
      'id_state_barbershops': stateId,
      'name': name,
      'description': description,
      'image_banner': imageBanner,
    };
  }
}