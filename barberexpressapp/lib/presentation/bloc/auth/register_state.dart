// lib/presentation/bloc/auth/register_state.dart
import 'package:equatable/equatable.dart';
import '../../../data/models/location/country_model.dart';
import '../../../data/models/location/department_model.dart';

enum RegisterStep { credentials, personalInfo, location }

class RegisterState extends Equatable {
  final RegisterStep currentStep;
  final String? email;
  final String? password;
  final String? role;  // Cambiamos isBarber por role
  final String? firstName;
  final String? lastName;
  final String? phone;
  final String? profileImage;
  final List<CountryModel> countries;
  final List<DepartmentModel> departments;
  final String? error;
  final bool isLoading;
  final bool isComplete;

  const RegisterState({
    this.currentStep = RegisterStep.credentials,
    this.email,
    this.password,
    this.role,  // Actualizamos el constructor
    this.firstName,
    this.lastName,
    this.phone,
    this.profileImage,
    this.countries = const [],
    this.departments = const [],
    this.error,
    this.isLoading = false,
    this.isComplete = false,
  });

  RegisterState copyWith({
    RegisterStep? currentStep,
    String? email,
    String? password,
    String? role,  // Actualizamos copyWith
    String? firstName,
    String? lastName,
    String? phone,
    String? profileImage,
    List<CountryModel>? countries,
    List<DepartmentModel>? departments,
    String? error,
    bool? isLoading,
    bool? isComplete,
  }) {
    return RegisterState(
      currentStep: currentStep ?? this.currentStep,
      email: email ?? this.email,
      password: password ?? this.password,
      role: role ?? this.role,  // Actualizamos copyWith
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      phone: phone ?? this.phone,
      profileImage: profileImage ?? this.profileImage,
      countries: countries ?? this.countries,
      departments: departments ?? this.departments,
      error: error,
      isLoading: isLoading ?? this.isLoading,
      isComplete: isComplete ?? this.isComplete,
    );
  }

  @override
  List<Object?> get props => [
        currentStep,
        email,
        password,
        role,
        firstName,
        lastName,
        phone,
        profileImage,
        countries,
        departments,
        error,
        isLoading,
        isComplete,
      ];

  bool get isCredentialsComplete => email != null && password != null && role != null;
  bool get isPersonalInfoComplete => firstName != null && lastName != null && phone != null;
}