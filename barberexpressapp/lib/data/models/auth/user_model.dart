// lib/data/models/auth/user_model.dart
import '../../../domain/entities/user.dart';

class UserModel extends User {
  const UserModel({
    required int id,
    required String email,
    required List<String> roles,
    dynamic barberState,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) : super(
          id: id,
          email: email,
          roles: roles,
          barberState: barberState,
          createdAt: createdAt,
          updatedAt: updatedAt,
        );

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      roles: json['roles'] != null 
          ? List<String>.from(json['roles'])
          : [],
      barberState: json['barber_state'],
      createdAt: DateTime.parse(json['created_at'] ?? json['createdAt']),
      updatedAt: DateTime.parse(json['updated_at'] ?? json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'roles': roles,
      'barber_state': barberState,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  UserModel copyWith({
    int? id,
    String? email,
    List<String>? roles,
    dynamic barberState,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      roles: roles ?? this.roles,
      barberState: barberState ?? this.barberState,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}