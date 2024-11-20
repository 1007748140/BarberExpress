// lib/presentation/bloc/barbershop/barbershop_event.dart
import 'package:equatable/equatable.dart';

abstract class BarbershopEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class CreateBarbershopEvent extends BarbershopEvent {
  final String name;
  final String description;
  final String imageBanner;

  CreateBarbershopEvent({
    required this.name,
    required this.description,
    required this.imageBanner,
  });

  @override
  List<Object?> get props => [name, description, imageBanner];
}

class LoadBarbershopEvent extends BarbershopEvent {}

class UpdateBarbershopEvent extends BarbershopEvent {
  final String name;
  final String description;
  final String imageBanner;
  final int stateId;

  UpdateBarbershopEvent({
    required this.name,
    required this.description,
    required this.imageBanner,
    required this.stateId,
  });

  @override
  List<Object?> get props => [name, description, imageBanner, stateId];
}