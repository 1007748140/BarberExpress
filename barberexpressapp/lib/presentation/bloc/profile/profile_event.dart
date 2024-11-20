// lib/presentation/bloc/profile/profile_event.dart
import 'package:equatable/equatable.dart';

abstract class ProfileEvent extends Equatable {
  const ProfileEvent();

  @override
  List<Object?> get props => [];
}

class LoadProfileEvent extends ProfileEvent {}

class UpdateProfileEvent extends ProfileEvent {
  final String firstName;
  final String lastName;
  final String phone;
  final String? profileImage;

  const UpdateProfileEvent({
    required this.firstName,
    required this.lastName,
    required this.phone,
    this.profileImage,
  });

  @override
  List<Object?> get props => [firstName, lastName, phone, profileImage];
}