// lib/presentation/widgets/auth/register_personal_info_step.dart
import 'package:flutter/material.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import '../../../config/app_theme.dart';
import '../common/custom_text_field.dart';
import '../common/custom_button.dart';

class RegisterPersonalInfoStep extends StatefulWidget {
  final Function(String firstName, String lastName, String phone, String? profileImage) onSubmit;
  final VoidCallback onBack;

  const RegisterPersonalInfoStep({
    Key? key,
    required this.onSubmit,
    required this.onBack,
  }) : super(key: key);

  @override
  _RegisterPersonalInfoStepState createState() => _RegisterPersonalInfoStepState();
}

class _RegisterPersonalInfoStepState extends State<RegisterPersonalInfoStep> {
  final _formKey = GlobalKey<FormState>();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _phoneController = TextEditingController();
  String? _profileImagePath;
  final _imagePicker = ImagePicker();

  Future<void> _pickImage() async {
    try {
      final XFile? image = await _imagePicker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 500,
        maxHeight: 500,
      );
      if (image != null) {
        setState(() {
          _profileImagePath = image.path;
        });
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al seleccionar imagen')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Información Personal',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: AppTheme.primaryColor,
                  fontWeight: FontWeight.bold,
                ),
          ),
          SizedBox(height: 8),
          Text(
            'Cuéntanos más sobre ti',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppTheme.accentColor,
                ),
          ),
          SizedBox(height: 24),
          Center(
            child: GestureDetector(
              onTap: _pickImage,
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 60,
                    backgroundImage: _profileImagePath != null
                        ? FileImage(File(_profileImagePath!))
                        : AssetImage('assets/images/profile_placeholder.png')
                            as ImageProvider,
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      padding: EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: AppTheme.secondaryColor,
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.camera_alt,
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(height: 24),
          CustomTextField(
            controller: _firstNameController,
            label: 'Nombres',
            prefixIcon: Icon(Icons.person_outline),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Por favor ingresa tus nombres';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          CustomTextField(
            controller: _lastNameController,
            label: 'Apellidos',
            prefixIcon: Icon(Icons.person_outline),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Por favor ingresa tus apellidos';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          CustomTextField(
            controller: _phoneController,
            label: 'Teléfono',
            keyboardType: TextInputType.phone,
            prefixIcon: Icon(Icons.phone_outlined),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Por favor ingresa tu teléfono';
              }
              if (value.length != 10) {
                return 'El teléfono debe tener 10 dígitos';
              }
              return null;
            },
          ),
          SizedBox(height: 24),
          Row(
            children: [
              Expanded(
                child: CustomButton(
                  text: 'Atrás',
                  onPressed: widget.onBack,
                  isOutlined: true,
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: CustomButton(
                  text: 'Continuar',
                  onPressed: () {
                    if (_formKey.currentState?.validate() ?? false) {
                      widget.onSubmit(
                        _firstNameController.text,
                        _lastNameController.text,
                        _phoneController.text,
                        _profileImagePath,
                      );
                    }
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _phoneController.dispose();
    super.dispose();
  }
}