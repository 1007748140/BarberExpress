// lib/presentation/bloc/auth/register_event.dart
import 'package:equatable/equatable.dart';

abstract class RegisterEvent extends Equatable {
  const RegisterEvent();

  @override
  List<Object?> get props => [];
}

class LoadLocationDataEvent extends RegisterEvent {}

class RegisterCredentialsSubmitted extends RegisterEvent {
  final String email;
  final String password;
  final String role;  // Añadimos el campo role

  const RegisterCredentialsSubmitted({
    required this.email,
    required this.password,
    required this.role,  // Añadimos este parámetro
  });

  @override
  List<Object> get props => [email, password,  role];
}

class RegisterPersonalInfoSubmitted extends RegisterEvent {
  final String firstName;
  final String lastName;
  final String phone;
  final String? profileImage;

  const RegisterPersonalInfoSubmitted({
    required this.firstName,
    required this.lastName,
    required this.phone,
    this.profileImage,
  });

  @override
  List<Object?> get props => [firstName, lastName, phone, profileImage];
}

class RegisterLocationSubmitted extends RegisterEvent {
  final double latitude;
  final double longitude;
  final int countryId;
  final int departmentId;
  final String address;  // Agregamos este campo si es necesario

  const RegisterLocationSubmitted({
    required this.latitude,
    required this.longitude,
    required this.countryId,
    required this.departmentId,
    required this.address,  // Lo hacemos requerido
  });

  @override
  List<Object> get props => [latitude, longitude, countryId, departmentId, address];
}

class RegisterStepBack extends RegisterEvent {}

class RegisterReset extends RegisterEvent {}