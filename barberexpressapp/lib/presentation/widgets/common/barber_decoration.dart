// lib/presentation/widgets/common/barber_decoration.dart
import 'package:flutter/material.dart';
import '../../../config/app_theme.dart';

class BarberDecoration extends StatelessWidget {
  final Widget child;

  const BarberDecoration({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Fondo con patrón de barbería
        Positioned(
          top: 0,
          right: 0,
          child: Image.asset(
            'assets/images/barber_pattern.png',
            color: AppTheme.secondaryColor.withOpacity(0.05),
            width: 200,
          ),
        ),
        // Logo o icono de barbería
        Positioned(
          top: 40,
          left: 24,
          child: Image.asset(
            'assets/images/barber_logo.png',
            width: 60,
          ),
        ),
        child,
      ],
    );
  }
}