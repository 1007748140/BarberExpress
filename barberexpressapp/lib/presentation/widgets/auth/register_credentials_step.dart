// lib/presentation/widgets/auth/register_credentials_step.dart
import 'package:flutter/material.dart';
import '../../../config/app_theme.dart';
import '../../../core/utils/input_validators.dart';
import '../common/custom_text_field.dart';
import '../common/custom_button.dart';

class RegisterCredentialsStep extends StatefulWidget {
  final Function(String email, String password, String role) onSubmit;

  const RegisterCredentialsStep({
    Key? key,
    required this.onSubmit,
  }) : super(key: key);

  @override
  _RegisterCredentialsStepState createState() => _RegisterCredentialsStepState();
}

class _RegisterCredentialsStepState extends State<RegisterCredentialsStep> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  String _selectedRole = 'Cliente'; // Valor por defecto

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Crear cuenta',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: AppTheme.primaryColor,
                  fontWeight: FontWeight.bold,
                ),
          ),
          SizedBox(height: 8),
          Text(
            'Ingresa tus credenciales para comenzar',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppTheme.accentColor,
                ),
          ),
          SizedBox(height: 24),
          CustomTextField(
            controller: _emailController,
            label: 'Correo electrónico',
            keyboardType: TextInputType.emailAddress,
            prefixIcon: Icon(Icons.email_outlined),
            validator: InputValidators.validateEmail,
          ),
          SizedBox(height: 16),
          CustomTextField(
            controller: _passwordController,
            label: 'Contraseña',
            obscureText: true,
            prefixIcon: Icon(Icons.lock_outline),
            validator: InputValidators.validatePassword,
          ),
          SizedBox(height: 16),
          CustomTextField(
            controller: _confirmPasswordController,
            label: 'Confirmar contraseña',
            obscureText: true,
            prefixIcon: Icon(Icons.lock_outline),
            validator: (value) => InputValidators.validateConfirmPassword(
              value,
              _passwordController.text,
            ),
          ),
          SizedBox(height: 16),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: AppTheme.accentColor.withOpacity(0.3),
              ),
            ),
            child: DropdownButtonFormField<String>(
              value: _selectedRole,
              decoration: InputDecoration(
                border: InputBorder.none,
                labelText: 'Tipo de usuario',
              ),
              items: [
                DropdownMenuItem(
                  value: 'Cliente',
                  child: Text('Cliente'),
                ),
                DropdownMenuItem(
                  value: 'Barbero',
                  child: Text('Barbero'),
                ),
                DropdownMenuItem(
                  value: 'AdminBarberia',
                  child: Text('Administrador de Barbería'),
                ),
              ],
              onChanged: (value) {
                setState(() {
                  _selectedRole = value!;
                });
              },
            ),
          ),
          SizedBox(height: 24),
          CustomButton(
            text: 'Continuar',
            onPressed: () {
              if (_formKey.currentState?.validate() ?? false) {
                widget.onSubmit(
                  _emailController.text,
                  _passwordController.text,
                 
                  _selectedRole,
                );
              }
            },
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }
}