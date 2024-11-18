// lib/presentation/pages/client/client_home_page.dart
import 'package:barber_express_app/presentation/pages/client/client_profile_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../bloc/auth/auth_bloc.dart';
import '../../bloc/auth/auth_event.dart';
import '../../../config/app_theme.dart';
import '../../widgets/common/role_guard.dart';

class ClientHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RoleGuard(
      allowedRoles: ['Cliente'],
      child: Scaffold(
        appBar: AppBar(
  title: Text('Cliente BarberExpress'),
  actions: [
    IconButton(
      icon: Icon(Icons.person),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ClientProfilePage(),
          ),
        );
      },
    ),
    IconButton(
      icon: Icon(Icons.logout),
      onPressed: () {
        context.read<AuthBloc>().add(LogoutEvent());
        Navigator.of(context).pushReplacementNamed('/login');
      },
    ),
  ],
),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Bienvenido',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: AppTheme.primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 24),
                _buildOptionCard(
                  context,
                  'Buscar Barberías',
                  'Encuentra las mejores barberías cerca de ti',
                  Icons.search,
                  () {
                    // TODO: Implementar navegación a búsqueda de barberías
                  },
                ),
                SizedBox(height: 16),
                _buildOptionCard(
                  context,
                  'Mis Citas',
                  'Gestiona tus citas programadas',
                  Icons.calendar_today,
                  () {
                    // TODO: Implementar navegación a citas
                  },
                ),
                SizedBox(height: 16),
                _buildOptionCard(
                  context,
                  'Historial',
                  'Revisa tus citas anteriores',
                  Icons.history,
                  () {
                    // TODO: Implementar navegación a historial
                  },
                ),
                SizedBox(height: 16),
                _buildOptionCard(
                  context,
                  'Mi Perfil',
                  'Actualiza tu información personal',
                  Icons.person,
                  () {
                    // TODO: Implementar navegación a perfil
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildOptionCard(
    BuildContext context,
    String title,
    String subtitle,
    IconData icon,
    VoidCallback onTap,
  ) {
    return Card(
      elevation: 2,
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: AppTheme.secondaryColor.withOpacity(0.1),
          child: Icon(icon, color: AppTheme.secondaryColor),
        ),
        title: Text(
          title,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: AppTheme.primaryColor,
          ),
        ),
        subtitle: Text(
          subtitle,
          style: TextStyle(color: AppTheme.accentColor),
        ),
        trailing: Icon(Icons.arrow_forward_ios, size: 16),
        onTap: onTap,
      ),
    );
  }
}