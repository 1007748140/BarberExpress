// lib/presentation/widgets/common/role_guard.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../presentation/bloc/auth/auth_bloc.dart';
import '../../../presentation/bloc/auth/auth_state.dart';
import '../../../core/services/navigation_service.dart';
import '../../../config/app_theme.dart';

class RoleGuard extends StatelessWidget {
  final Widget child;
  final List<String> allowedRoles;

  const RoleGuard({
    Key? key,
    required this.child,
    required this.allowedRoles,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        if (state is Authenticated) {
          if (allowedRoles.contains(state.role)) {
            return child;
          } else {
            return Scaffold(
              body: Container(
                decoration: BoxDecoration(
                  gradient: AppTheme.primaryGradient,
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.security,
                        size: 64,
                        color: Colors.white,
                      ),
                      SizedBox(height: 24),
                      Text(
                        'Acceso no autorizado',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        'No tienes permiso para acceder a esta sección',
                        style: TextStyle(
                          color: Colors.white70,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 24),
                      ElevatedButton(
                        onPressed: () {
                          NavigationService.navigateToRoleHome(context, state.role);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: AppTheme.primaryColor,
                          padding: EdgeInsets.symmetric(
                            horizontal: 32,
                            vertical: 16,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                        child: Text(
                          'Volver al inicio',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }
        }
        // Si no está autenticado, redirigir al login
        WidgetsBinding.instance.addPostFrameCallback((_) {
          Navigator.of(context).pushReplacementNamed('/login');
        });
        return Container(); // Retorna un contenedor vacío mientras se realiza la redirección
      },
    );
  }
}