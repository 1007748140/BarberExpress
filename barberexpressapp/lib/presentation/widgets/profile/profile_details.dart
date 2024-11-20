// lib/presentation/widgets/profile/profile_details.dart
import 'package:flutter/material.dart';
import '../../../config/app_theme.dart';
import '../common/custom_text_field.dart';
import '../common/custom_button.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class ProfileDetails extends StatefulWidget {
  final String firstName;
  final String lastName;
  final String email;
  final String phone;
  final String? profileImage;
  final Function(String firstName, String lastName, String phone, String? profileImage) onUpdate;

  const ProfileDetails({
    Key? key,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phone,
    this.profileImage,
    required this.onUpdate,
  }) : super(key: key);

  @override
  _ProfileDetailsState createState() => _ProfileDetailsState();
}

class _ProfileDetailsState extends State<ProfileDetails> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _firstNameController;
  late TextEditingController _lastNameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  String? _selectedImagePath;
  final _imagePicker = ImagePicker();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _firstNameController = TextEditingController(text: widget.firstName);
    _lastNameController = TextEditingController(text: widget.lastName);
    _emailController = TextEditingController(text: widget.email);
    _phoneController = TextEditingController(text: widget.phone);
  }

  Future<void> _pickImage() async {
    try {
      final XFile? image = await _imagePicker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 500,
        maxHeight: 500,
      );
      if (image != null) {
        setState(() {
          _selectedImagePath = image.path;
        });
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error al seleccionar imagen'),
          backgroundColor: AppTheme.errorColor,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: EdgeInsets.all(16),
      child: Form(
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
            SizedBox(height: 24),
            Center(
              child: Stack(
                children: [
                  GestureDetector(
                    onTap: _pickImage,
                    child: Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.grey[200],
                        image: _getProfileImage(),
                        border: Border.all(
                          color: AppTheme.secondaryColor,
                          width: 2,
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      padding: EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: AppTheme.secondaryColor,
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: Colors.white,
                          width: 2,
                        ),
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
            SizedBox(height: 32),
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
              controller: _emailController,
              label: 'Correo electrónico',
              prefixIcon: Icon(Icons.email_outlined),
              enabled: false,
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
            SizedBox(height: 32),
            CustomButton(
              text: 'Guardar Cambios',
              onPressed: _isLoading
                  ? null
                  : () async {
                      if (_formKey.currentState?.validate() ?? false) {
                        setState(() => _isLoading = true);
                        try {
                          await widget.onUpdate(
                            _firstNameController.text,
                            _lastNameController.text,
                            _phoneController.text,
                            _selectedImagePath ?? widget.profileImage,
                          );
                          if (mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Perfil actualizado exitosamente'),
                                backgroundColor: Colors.green,
                              ),
                            );
                          }
                        } catch (e) {
                          if (mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Error al actualizar el perfil'),
                                backgroundColor: AppTheme.errorColor,
                              ),
                            );
                          }
                        } finally {
                          if (mounted) {
                            setState(() => _isLoading = false);
                          }
                        }
                      }
                    },
              isLoading: _isLoading,
            ),
          ],
        ),
      ),
    );
  }

  DecorationImage? _getProfileImage() {
    if (_selectedImagePath != null) {
      return DecorationImage(
        image: FileImage(File(_selectedImagePath!)),
        fit: BoxFit.cover,
      );
    }
    if (widget.profileImage != null) {
      return DecorationImage(
        image: NetworkImage(widget.profileImage!),
        fit: BoxFit.cover,
      );
    }
    return null;
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }
}