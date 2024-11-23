// lib/presentation/bloc/profile/profile_bloc.dart
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../domain/repositories/profile_repository.dart';
import 'profile_event.dart';
import 'profile_state.dart';


class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  final ProfileRepository repository;

  ProfileBloc({required this.repository}) : super(ProfileInitial()) {
    on<LoadProfileEvent>(_onLoadProfile);
    on<UpdateProfileEvent>(_onUpdateProfile);
    on<UploadProfileImageEvent>(_onUploadProfileImage);
  }

  Future<void> _onLoadProfile(
    LoadProfileEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      emit(ProfileLoading());
      final result = await repository.getProfile();
      
      result.fold(
        (failure) => emit(ProfileError(failure.message)),
        (profile) => emit(ProfileLoaded(profile)),
      );
    } catch (e) {
      emit(ProfileError('Error al cargar el perfil: ${e.toString()}'));
    }
  }

  Future<void> _onUpdateProfile(
    UpdateProfileEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      emit(ProfileLoading());
      final result = await repository.updateProfile(
        firstName: event.firstName,
        lastName: event.lastName,
        phone: event.phone,
        profileImage: event.profileImage,
      );

      result.fold(
        (failure) => emit(ProfileError(failure.message)),
        (profile) => emit(ProfileLoaded(profile)),
      );
    } catch (e) {
      emit(ProfileError('Error al actualizar el perfil: ${e.toString()}'));
    }
  }

  Future<void> _onUploadProfileImage(
    UploadProfileImageEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      emit(ProfileLoading());
      
      // Subir la imagen
      final uploadResult = await repository.uploadProfileImage(event.imageFile);
      
      await uploadResult.fold(
        (failure) {
          emit(ProfileError(failure.message));
          return;
        },
        (imageUrl) async {
          // Si el estado actual es ProfileLoaded, actualizar el perfil con la nueva imagen
          if (state is ProfileLoaded) {
            final currentProfile = (state as ProfileLoaded).profile;
            final updateResult = await repository.updateProfile(
              firstName: currentProfile.firstName,
              lastName: currentProfile.lastName,
              phone: currentProfile.phone,
              profileImage: imageUrl,
            );

            updateResult.fold(
              (failure) => emit(ProfileError(failure.message)),
              (profile) => emit(ProfileLoaded(profile)),
            );
          }
        },
      );
    } catch (e) {
      emit(ProfileError('Error al subir la imagen: ${e.toString()}'));
    }
  }
}