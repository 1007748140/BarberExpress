// lib/config/app_theme.dart
import 'package:flutter/material.dart';

class AppTheme {
  // Paleta de colores principal
  static const Color primaryColor = Color(0xFF1B1B1B); // Negro elegante
  static const Color secondaryColor = Color(0xFFBF9456); // Dorado barbería
  static const Color accentColor = Color(0xFF4A4A4A); // Gris oscuro
  static const Color backgroundColor = Color(0xFFF5F5F5); // Fondo claro
  static const Color errorColor = Color(0xFFD32F2F); // Rojo error

  // Gradientes
  static const LinearGradient primaryGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF1B1B1B),
      Color(0xFF2D2D2D),
    ],
  );

  // Tema claro
  static ThemeData lightTheme = ThemeData(
    primaryColor: primaryColor,
    scaffoldBackgroundColor: backgroundColor,
    colorScheme: ColorScheme.light(
      primary: primaryColor,
      secondary: secondaryColor,
      error: errorColor,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: primaryColor,
      elevation: 0,
    ),
    textTheme: TextTheme(
      headlineLarge: TextStyle(
        color: primaryColor,
        fontSize: 32,
        fontWeight: FontWeight.bold,
      ),
      headlineMedium: TextStyle(
        color: primaryColor,
        fontSize: 24,
        fontWeight: FontWeight.bold,
      ),
      bodyLarge: TextStyle(
        color: accentColor,
        fontSize: 16,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: secondaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    ),
  );
}