// lib/presentation/bloc/profile/profile_state.dart
import 'package:equatable/equatable.dart';
import '../../../data/models/profile/profile_model.dart';

abstract class ProfileState extends Equatable {
  const ProfileState();

  @override
  List<Object?> get props => [];
}

class ProfileInitial extends ProfileState {}

class ProfileLoading extends ProfileState {}

class ProfileLoaded extends ProfileState {
  final ProfileModel profile;
  final bool imageUploading;

  const ProfileLoaded(
    this.profile, {
    this.imageUploading = false,
  });

  @override
  List<Object?> get props => [profile, imageUploading];

  ProfileLoaded copyWith({
    ProfileModel? profile,
    bool? imageUploading,
  }) {
    return ProfileLoaded(
      profile ?? this.profile,
      imageUploading: imageUploading ?? this.imageUploading,
    );
  }
}

class ProfileError extends ProfileState {
  final String message;

  const ProfileError(this.message);

  @override
  List<Object> get props => [message];
}

class ProfileImageUploading extends ProfileState {
  final double progress;

  const ProfileImageUploading(this.progress);

  @override
  List<Object> get props => [progress];
}

class ProfileImageUploadSuccess extends ProfileState {
  final String imageUrl;

  const ProfileImageUploadSuccess(this.imageUrl);

  @override
  List<Object> get props => [imageUrl];
}

class ProfileImageUploadError extends ProfileState {
  final String message;

  const ProfileImageUploadError(this.message);

  @override
  List<Object> get props => [message];
}