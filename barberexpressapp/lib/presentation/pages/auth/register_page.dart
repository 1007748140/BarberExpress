// lib/presentation/pages/auth/register_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../config/app_theme.dart';
import '../../bloc/auth/register_bloc.dart';
import '../../bloc/auth/register_event.dart';
import '../../bloc/auth/register_state.dart';
import '../../widgets/common/barber_decoration.dart';
import '../../widgets/auth/register_credentials_step.dart';
import '../../widgets/auth/register_personal_info_step.dart';
import '../../widgets/auth/register_location_step.dart';
import '../../../core/services/navigation_service.dart';

class RegisterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocConsumer<RegisterBloc, RegisterState>(
        listener: (context, state) {
          if (state.error != null) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.error!),
                backgroundColor: AppTheme.errorColor,
              ),
            );
          }
          if (state.isComplete && state.role != null) {
            // Usar el NavigationService para la redirección basada en roles
            NavigationService.navigateToRoleHome(context, state.role!);
          }
        },
        builder: (context, state) {
          return BarberDecoration(
            child: SafeArea(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(24),
                child: Column(
                  children: [
                    _buildStepIndicator(state.currentStep),
                    SizedBox(height: 24),
                    _buildCurrentStep(context, state),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStepIndicator(RegisterStep currentStep) {
    return Row(
      children: [
        _buildStepCircle(1, currentStep.index >= 0, 'Credenciales'),
        _buildStepLine(),
        _buildStepCircle(2, currentStep.index >= 1, 'Información'),
        _buildStepLine(),
        _buildStepCircle(3, currentStep.index >= 2, 'Ubicación'),
      ],
    );
  }

  Widget _buildStepCircle(int step, bool isActive, String label) {
    return Expanded(
      child: Column(
        children: [
          Container(
            width: 30,
            height: 30,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isActive ? AppTheme.secondaryColor : AppTheme.accentColor.withOpacity(0.3),
            ),
            child: Center(
              child: Text(
                step.toString(),
                style: TextStyle(
                  color: isActive ? Colors.white : AppTheme.accentColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              color: isActive ? AppTheme.primaryColor : AppTheme.accentColor,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepLine() {
    return Expanded(
      child: Container(
        height: 1,
        color: AppTheme.accentColor.withOpacity(0.3),
        margin: EdgeInsets.only(bottom: 20),
      ),
    );
  }

  Widget _buildCurrentStep(BuildContext context, RegisterState state) {
    switch (state.currentStep) {
      case RegisterStep.credentials:
        return RegisterCredentialsStep(
          onSubmit: (email, password, role) {  // Actualizado para recibir role como String
            context.read<RegisterBloc>().add(
                  RegisterCredentialsSubmitted(
                    email: email,
                    password: password,
                    role: role,
                  ),
                );
          },
        );

      case RegisterStep.personalInfo:
        return RegisterPersonalInfoStep(
          onSubmit: (firstName, lastName, phone, profileImage) {
            context.read<RegisterBloc>().add(
                  RegisterPersonalInfoSubmitted(
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    profileImage: profileImage,
                  ),
                );
          },
          onBack: () {
            context.read<RegisterBloc>().add(RegisterStepBack());
          },
        );

      case RegisterStep.location:
        return RegisterLocationStep(
          countries: state.countries,
          departments: state.departments,
          onSubmit: (latitude, longitude, countryId, departmentId, address) {
            context.read<RegisterBloc>().add(
                  RegisterLocationSubmitted(
                    latitude: latitude,
                    longitude: longitude,
                    countryId: countryId,
                    departmentId: departmentId,
                    address: address,
                  ),
                );
          },
          onBack: () {
            context.read<RegisterBloc>().add(RegisterStepBack());
          },
        );
    }
  }
}