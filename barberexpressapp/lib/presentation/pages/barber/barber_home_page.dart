// lib/presentation/pages/barber/barber_home_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../bloc/auth/auth_bloc.dart';
import '../../bloc/auth/auth_event.dart';
import '../../../config/app_theme.dart';
import '../../widgets/common/role_guard.dart';

class BarberHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RoleGuard(
      allowedRoles: ['Barbero'],
      child: Scaffold(
        appBar: AppBar(
          title: Text('Panel de Barbero'),
          actions: [
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
                  'Panel de Control',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: AppTheme.primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 24),
                _buildOptionCard(
                  context,
                  'Mi Agenda',
                  'Gestiona tus citas del día',
                  Icons.schedule,
                  () {
                    // TODO: Implementar navegación a agenda
                  },
                ),
                SizedBox(height: 16),
                _buildOptionCard(
                  context,
                  'Estado',
                  'Actualiza tu estado de disponibilidad',
                  Icons.person_outline,
                  () {
                    // TODO: Implementar cambio de estado
                  },
                ),
                SizedBox(height: 16),
                _buildOptionCard(
                  context,
                  'Mis Ingresos',
                  'Revisa tus ganancias',
                  Icons.attach_money,
                  () {
                    // TODO: Implementar vista de ingresos
                  },
                ),
                SizedBox(height: 16),
                _buildOptionCard(
                  context,
                  'Mi Perfil',
                  'Gestiona tu información personal y profesional',
                  Icons.person,
                  () {
                    // TODO: Implementar navegación a perfil
                  },
                ),
                SizedBox(height: 16),
                _buildOptionCard(
                  context,
                  'Información Bancaria',
                  'Gestiona tus datos bancarios',
                  Icons.account_balance,
                  () {
                    // TODO: Implementar navegación a información bancaria
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