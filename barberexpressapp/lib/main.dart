import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App de Autenticación',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      // Configuración de rutas
      initialRoute: '/register',
      routes: {
        '/': (context) => LoginScreen(), // Pantalla inicial de login
        '/register': (context) => RegisterScreen(), // Pantalla de registro
      },
    );
  }
}
