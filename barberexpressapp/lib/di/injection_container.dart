// lib/di/injection_container.dart
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/network/api_service.dart';
import '../data/datasources/auth_remote_datasource.dart';
import '../data/datasources/barbershop_remote_datasource.dart';
import '../data/datasources/profile_remote_datasource.dart';
import '../data/repositories/auth_repository_impl.dart';
import '../data/repositories/barbershop_repository_impl.dart';
import '../data/repositories/profile_repository_impl.dart';
import '../domain/repositories/auth_repository.dart';
import '../domain/repositories/barbershop_repository.dart';
import '../domain/repositories/profile_repository.dart';
import '../presentation/bloc/auth/auth_bloc.dart';
import '../presentation/bloc/auth/register_bloc.dart';
import '../presentation/bloc/barbershop/barbershop_bloc.dart';
import '../presentation/bloc/profile/profile_bloc.dart';

final sl = GetIt.instance;

Future<void> init() async {
  //! Features

  // Blocs
  sl.registerFactory<AuthBloc>(
    () => AuthBloc(authRepository: sl()),
  );
  
  sl.registerFactory<RegisterBloc>(
    () => RegisterBloc(authRepository: sl()),
  );

  sl.registerFactory<ProfileBloc>(
    () => ProfileBloc(repository: sl()),
  );

  sl.registerFactory<BarbershopBloc>(
    () => BarbershopBloc(repository: sl()),
  );

  // Repositories
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(
      remoteDataSource: sl(),
      sharedPreferences: sl(),
    ),
  );

  sl.registerLazySingleton<ProfileRepository>(
    () => ProfileRepositoryImpl(
      remoteDataSource: sl(),
    ),
  );

  sl.registerLazySingleton<BarbershopRepository>(
    () => BarbershopRepositoryImpl(
      remoteDataSource: sl(),
    ),
  );

  // Data sources
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(apiService: sl()),
  );

  sl.registerLazySingleton<ProfileRemoteDataSource>(
    () => ProfileRemoteDataSourceImpl(apiService: sl()),
  );

  sl.registerLazySingleton<BarbershopRemoteDataSource>(
    () => BarbershopRemoteDataSourceImpl(
      apiService: sl(),
    ),
  );

  //! Core
  sl.registerLazySingleton(() => ApiService(sl<SharedPreferences>()));

  //! External
  final sharedPreferences = await SharedPreferences.getInstance();
  sl.registerLazySingleton(() => sharedPreferences);
}