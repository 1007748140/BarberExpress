// lib/presentation/bloc/auth/register_bloc.dart
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../domain/repositories/auth_repository.dart';
import '../../../data/models/auth/register_request_model.dart';
import '../../../data/models/location/country_model.dart';
import '../../../data/models/location/department_model.dart';
import 'register_event.dart';
import 'register_state.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  final AuthRepository authRepository;
  List<CountryModel> countries = [];
  List<DepartmentModel> departments = [];

  RegisterBloc({
    required this.authRepository,
  }) : super(RegisterState()) {
    on<RegisterCredentialsSubmitted>(_onCredentialsSubmitted);
    on<RegisterPersonalInfoSubmitted>(_onPersonalInfoSubmitted);
    on<RegisterLocationSubmitted>(_onLocationSubmitted);
    on<LoadLocationDataEvent>(_onLoadLocationData);
    on<RegisterStepBack>(_onStepBack);
    on<RegisterReset>(_onReset);
    
    // Cargar datos de ubicación al iniciar
    add(LoadLocationDataEvent());
  }

  Future<void> _onLoadLocationData(
    LoadLocationDataEvent event,
    Emitter<RegisterState> emit,
  ) async {
    try {
      print('RegisterBloc: Cargando datos de ubicación...');
      emit(state.copyWith(isLoading: true));
      
      final locationData = await authRepository.getLocationData();
      
      locationData.fold(
        (failure) {
          print('RegisterBloc: Error al cargar datos - ${failure.message}');
          emit(state.copyWith(
            error: 'Error al cargar datos de ubicación',
            isLoading: false,
          ));
        },
        (data) {
          print('RegisterBloc: Datos de ubicación cargados exitosamente');
          countries = data.countries;
          departments = data.departments;
          emit(state.copyWith(
            countries: data.countries,
            departments: data.departments,
            isLoading: false,
          ));
        },
      );
    } catch (e) {
      print('RegisterBloc: Error inesperado al cargar datos - $e');
      emit(state.copyWith(
        error: 'Error al cargar datos de ubicación',
        isLoading: false,
      ));
    }
  }

  void _onCredentialsSubmitted(
    RegisterCredentialsSubmitted event,
    Emitter<RegisterState> emit,
  ) {
    print('RegisterBloc: Datos de credenciales recibidos');
    emit(state.copyWith(
      currentStep: RegisterStep.personalInfo,
      email: event.email,
      password: event.password,
      role: event.role,
      error: null,
    ));
  }

  void _onPersonalInfoSubmitted(
    RegisterPersonalInfoSubmitted event,
    Emitter<RegisterState> emit,
  ) {
    print('RegisterBloc: Datos personales recibidos');
    emit(state.copyWith(
      currentStep: RegisterStep.location,
      firstName: event.firstName,
      lastName: event.lastName,
      phone: event.phone,
      profileImage: event.profileImage,
      error: null,
    ));
  }

  Future<void> _onLocationSubmitted(
    RegisterLocationSubmitted event,
    Emitter<RegisterState> emit,
  ) async {
    try {
      print('RegisterBloc: Iniciando registro de usuario...');
      print('RegisterBloc: Datos de ubicación recibidos - Lat: ${event.latitude}, Lng: ${event.longitude}');
      emit(state.copyWith(isLoading: true, error: null));

      if (!state.isCredentialsComplete || !state.isPersonalInfoComplete) {
        print('RegisterBloc: Información incompleta');
        print('RegisterBloc: Credenciales completas - ${state.isCredentialsComplete}');
        print('RegisterBloc: Info personal completa - ${state.isPersonalInfoComplete}');
        emit(state.copyWith(
          error: 'Información incompleta',
          isLoading: false,
        ));
        return;
      }

      print('RegisterBloc: Creando modelo de registro...');
      final request = RegisterRequestModel(
      email: state.email!,
      password: state.password!,
      role: state.role!,  // Cambiamos userRole por role
      firstName: state.firstName!,
      lastName: state.lastName!,
      phone: state.phone!,
      profileImage: state.profileImage,
      latitude: event.latitude,
      longitude: event.longitude,
      countryId: event.countryId,
      departmentId: event.departmentId,
    );

      print('RegisterBloc: Enviando solicitud de registro...');
      print('RegisterBloc: Datos de registro - ${request.toJson()}');
      
      final result = await authRepository.register(request);

      result.fold(
        (failure) {
          print('RegisterBloc: Error en registro - ${failure.message}');
          emit(state.copyWith(
            error: 'Error al registrar usuario: ${failure.message}',
            isLoading: false,
          ));
        },
        (user) {
          print('RegisterBloc: Registro exitoso - Usuario ID: ${user.id}');
          emit(state.copyWith(
            isLoading: false,
            isComplete: true,
            error: null,
          ));
        },
      );
    } catch (e) {
      print('RegisterBloc: Error inesperado - $e');
      print('RegisterBloc: Stack trace - ${StackTrace.current}');
      emit(state.copyWith(
        error: 'Error inesperado durante el registro',
        isLoading: false,
      ));
    }
  }

  void _onStepBack(
    RegisterStepBack event,
    Emitter<RegisterState> emit,
  ) {
    print('RegisterBloc: Retrocediendo paso');
    switch (state.currentStep) {
      case RegisterStep.personalInfo:
        emit(state.copyWith(
          currentStep: RegisterStep.credentials,
          error: null,
        ));
        break;
      case RegisterStep.location:
        emit(state.copyWith(
          currentStep: RegisterStep.personalInfo,
          error: null,
        ));
        break;
      default:
        break;
    }
  }

  void _onReset(
    RegisterReset event,
    Emitter<RegisterState> emit,
  ) {
    print('RegisterBloc: Reseteando estado');
    emit(RegisterState(
      countries: countries,
      departments: departments,
    ));
  }

  // Métodos auxiliares
  List<DepartmentModel> getDepartmentsForCountry(int countryId) {
    return departments.where((dept) => dept.countryId == countryId).toList();
  }

  CountryModel? getCountryById(int id) {
    try {
      return countries.firstWhere((country) => country.id == id);
    } catch (_) {
      print('RegisterBloc: País no encontrado - ID: $id');
      return null;
    }
  }

  DepartmentModel? getDepartmentById(int id) {
    try {
      return departments.firstWhere((department) => department.id == id);
    } catch (_) {
      print('RegisterBloc: Departamento no encontrado - ID: $id');
      return null;
    }
  }
}