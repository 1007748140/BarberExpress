// lib/presentation/bloc/profile/profile_bloc.dart
import 'package:barber_express_app/core/error/failures.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../domain/repositories/profile_repository.dart';
import 'profile_event.dart';
import 'profile_state.dart';

class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  final ProfileRepository repository;

  ProfileBloc({required this.repository}) : super(ProfileInitial()) {
    on<LoadProfileEvent>(_onLoadProfile);
    on<UpdateProfileEvent>(_onUpdateProfile);
  }

  Future<void> _onLoadProfile(
    LoadProfileEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      emit(ProfileLoading());
      final profile = await repository.getProfile();
      emit(ProfileLoaded(profile));
    } catch (e) {
      print('ProfileBloc: Error al cargar perfil - $e');
      emit(ProfileError(e is ServerFailure ? e.message : 'Error al cargar el perfil'));
    }
  }

  Future<void> _onUpdateProfile(
    UpdateProfileEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      emit(ProfileLoading());
      final updatedProfile = await repository.updateProfile(
        firstName: event.firstName,
        lastName: event.lastName,
        phone: event.phone,
        profileImage: event.profileImage,
      );
      emit(ProfileLoaded(updatedProfile));
    } catch (e) {
      emit(ProfileError(e.toString()));
    }
  }
}