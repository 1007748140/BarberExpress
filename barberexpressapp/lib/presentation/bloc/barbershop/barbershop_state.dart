// lib/presentation/bloc/barbershop/barbershop_state.dart
import 'package:equatable/equatable.dart';
import '../../../data/models/barbershop/barbershop_model.dart';

abstract class BarbershopState extends Equatable {
  @override
  List<Object?> get props => [];
}

class BarbershopInitial extends BarbershopState {}

class BarbershopLoading extends BarbershopState {}

class BarbershopLoaded extends BarbershopState {
  final BarbershopModel barbershop;

  BarbershopLoaded(this.barbershop);

  @override
  List<Object?> get props => [barbershop];
}

class BarbershopError extends BarbershopState {
  final String message;

  BarbershopError(this.message);

  @override
  List<Object?> get props => [message];
}

class BarbershopCreated extends BarbershopState {
  final BarbershopModel barbershop;

  BarbershopCreated(this.barbershop);

  @override
  List<Object?> get props => [barbershop];
}

class BarbershopUpdated extends BarbershopState {
  final BarbershopModel barbershop;

  BarbershopUpdated(this.barbershop);

  @override
  List<Object?> get props => [barbershop];
}