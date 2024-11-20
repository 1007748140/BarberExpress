// lib/presentation/pages/admin/admin_home_page.dart

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../bloc/auth/auth_bloc.dart';
import '../../bloc/auth/auth_event.dart';
import '../../bloc/barbershop/barbershop_bloc.dart';
import '../../bloc/barbershop/barbershop_state.dart';
import '../../../config/app_theme.dart';
import '../../../core/routes/app_routes.dart';
import '../../widgets/common/role_guard.dart';
import 'register_barbershop_page.dart';

class AdminHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RoleGuard(
      allowedRoles: ['AdminBarberia'],
      child: BlocBuilder<BarbershopBloc, BarbershopState>(
        builder: (context, state) {
          if (state is BarbershopLoading) {
            return Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          }

          // Si no hay barbería registrada, mostrar página de registro
          if (state is BarbershopError) {
            return RegisterBarbershopPage();
          }

          // Si ya tiene barbería registrada, mostrar el panel de administración
          return Scaffold(
            appBar: AppBar(
              title: Text('Panel de Administración'),
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
                      'Gestión de Barbería',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        color: AppTheme.primaryColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 24),
                    _buildOptionCard(
                      context,
                      'Información de Barbería',
                      'Gestiona los datos de tu barbería',
                      Icons.store,
                      () {
                        Navigator.pushNamed(context, AppRoutes.barbershopDetails);
                      },
                    ),
                    SizedBox(height: 16),
                    _buildOptionCard(
                      context,
                      'Barberos',
                      'Administra tu equipo de barberos',
                      Icons.people,
                      () {
                        // TODO: Implementar gestión de barberos
                      },
                    ),
                    SizedBox(height: 16),
                    _buildOptionCard(
                      context,
                      'Servicios',
                      'Configura los servicios ofrecidos',
                      Icons.cut,
                      () {
                        // TODO: Implementar gestión de servicios
                      },
                    ),
                    SizedBox(height: 16),
                    _buildOptionCard(
                      context,
                      'Productos',
                      'Gestiona el inventario de productos',
                      Icons.shopping_bag,
                      () {
                        // TODO: Implementar gestión de productos
                      },
                    ),
                    SizedBox(height: 16),
                    _buildOptionCard(
                      context,
                      'Horarios',
                      'Configura los horarios de atención',
                      Icons.access_time,
                      () {
                        // TODO: Implementar gestión de horarios
                      },
                    ),
                    SizedBox(height: 16),
                    _buildOptionCard(
                      context,
                      'Finanzas',
                      'Revisa los ingresos y pagos',
                      Icons.attach_money,
                      () {
                        // TODO: Implementar vista de finanzas
                      },
                    ),
                    SizedBox(height: 16),
                    _buildOptionCard(
                      context,
                      'Información Bancaria',
                      'Gestiona tus datos bancarios',
                      Icons.account_balance,
                      () {
                        // TODO: Implementar gestión de información bancaria
                      },
                    ),
                  ],
                ),
              ),
            ),
          );
        },
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