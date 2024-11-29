// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:js' as js;
import 'di/injection_container.dart' as di;
import 'config/app_theme.dart';
import 'core/routes/app_routes.dart';
import 'presentation/bloc/auth/auth_bloc.dart';
import 'presentation/bloc/auth/register_bloc.dart';
import 'presentation/bloc/profile/profile_bloc.dart';
import 'presentation/bloc/barbershop/barbershop_bloc.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Cargar variables de entorno
  await dotenv.load(fileName: ".env");

  // Inicializar dependencias
  await di.init();

  // Configurar permisos para la camara web
  await configureWebPermissions();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthBloc>(
          create: (context) => di.sl<AuthBloc>(),
        ),
        BlocProvider<RegisterBloc>(
          create: (context) => di.sl<RegisterBloc>(),
        ),
        BlocProvider<ProfileBloc>(
          create: (context) => di.sl<ProfileBloc>(),
        ),
        BlocProvider<BarbershopBloc>(
          create: (context) => di.sl<BarbershopBloc>(),
        ),
      ],
      child: MaterialApp(
        title: 'BarberExpress',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        initialRoute: AppRoutes.splash,
        routes: AppRoutes.routes,
        builder: (context, child) {
          return MediaQuery(
            data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0),
            child: child!,
          );
        },
        onUnknownRoute: (settings) {
          return MaterialPageRoute(
            builder: (context) => Scaffold(
              body: Center(
                child: Text('Ruta no encontrada: ${settings.name}'),
              ),
            ),
          );
        },
      ),
    );
  }
}

class SimpleBlocObserver extends BlocObserver {
  @override
  void onChange(BlocBase bloc, Change change) {
    super.onChange(bloc, change);
    print('${bloc.runtimeType} $change');
  }

  @override
  void onError(BlocBase bloc, Object error, StackTrace stackTrace) {
    print('${bloc.runtimeType} $error $stackTrace');
    super.onError(bloc, error, stackTrace);
  }
}

extension AppError on BuildContext {
  void showErrorSnackBar(String message) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void showSuccessSnackBar(String message) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}

Future<void> configureWebPermissions() async {
  if (kIsWeb) {
    try {
      final navigator = js.context['navigator'];
      if (navigator != null) {
        await js.context['navigator']['mediaDevices'].callMethod('getUserMedia', [
          js.JsObject.jsify({'video': true, 'audio': false})
        ]);
      }
    } catch (e) {
      print('Error al configurar permisos web: $e');
    }
  }
}