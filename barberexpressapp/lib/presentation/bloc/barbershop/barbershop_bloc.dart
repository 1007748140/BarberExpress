// lib/presentation/bloc/barbershop/barbershop_bloc.dart
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../domain/repositories/barbershop_repository.dart';
import 'barbershop_event.dart';
import 'barbershop_state.dart';

class BarbershopBloc extends Bloc<BarbershopEvent, BarbershopState> {
  final BarbershopRepository repository;

  BarbershopBloc({required this.repository}) : super(BarbershopInitial()) {
    on<CreateBarbershopEvent>(_onCreateBarbershop);
    on<LoadBarbershopEvent>(_onLoadBarbershop);
    on<UpdateBarbershopEvent>(_onUpdateBarbershop);
  }

  Future<void> _onCreateBarbershop(
    CreateBarbershopEvent event,
    Emitter<BarbershopState> emit,
  ) async {
    emit(BarbershopLoading());
    try {
      final result = await repository.createBarbershop(
        name: event.name,
        description: event.description,
        imageBanner: event.imageBanner,
      );
      
      result.fold(
        (failure) => emit(BarbershopError(failure.message)),
        (barbershop) => emit(BarbershopCreated(barbershop)),
      );
    } catch (e) {
      emit(BarbershopError('Error al crear la barbería'));
    }
  }

  Future<void> _onLoadBarbershop(
    LoadBarbershopEvent event,
    Emitter<BarbershopState> emit,
  ) async {
    emit(BarbershopLoading());
    try {
      final result = await repository.getBarbershop();
      
      result.fold(
        (failure) => emit(BarbershopError(failure.message)),
        (barbershop) => emit(BarbershopLoaded(barbershop)),
      );
    } catch (e) {
      emit(BarbershopError('Error al cargar la barbería'));
    }
  }

  Future<void> _onUpdateBarbershop(
    UpdateBarbershopEvent event,
    Emitter<BarbershopState> emit,
  ) async {
    emit(BarbershopLoading());
    try {
      final result = await repository.updateBarbershop(
        name: event.name,
        description: event.description,
        imageBanner: event.imageBanner,
        stateId: event.stateId,
      );
      
      result.fold(
        (failure) => emit(BarbershopError(failure.message)),
        (barbershop) => emit(BarbershopUpdated(barbershop)),
      );
    } catch (e) {
      emit(BarbershopError('Error al actualizar la barbería'));
    }
  }
}