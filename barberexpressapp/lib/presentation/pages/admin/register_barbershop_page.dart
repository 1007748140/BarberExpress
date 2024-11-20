// lib/presentation/pages/admin/register_barbershop_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../config/app_theme.dart';
import '../../bloc/barbershop/barbershop_bloc.dart';
import '../../bloc/barbershop/barbershop_event.dart';
import '../../bloc/barbershop/barbershop_state.dart';
import '../../widgets/common/custom_text_field.dart';
import '../../widgets/common/custom_button.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

class RegisterBarbershopPage extends StatefulWidget {
  @override
  _RegisterBarbershopPageState createState() => _RegisterBarbershopPageState();
}

class _RegisterBarbershopPageState extends State<RegisterBarbershopPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _descriptionController = TextEditingController();
  String? _selectedImagePath;
  final _imagePicker = ImagePicker();

  Future<void> _pickImage() async {
    try {
      final XFile? image = await _imagePicker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 1080,
        maxHeight: 1080,
      );
      if (image != null) {
        setState(() {
          _selectedImagePath = image.path;
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
    return Scaffold(
      appBar: AppBar(
        title: Text('Registrar Barbería'),
      ),
      body: BlocConsumer<BarbershopBloc, BarbershopState>(
        listener: (context, state) {
          if (state is BarbershopError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.message)),
            );
          } else if (state is BarbershopCreated) {
            Navigator.of(context).pushReplacementNamed('/admin/home');
          }
        },
        builder: (context, state) {
          if (state is BarbershopLoading) {
            return Center(child: CircularProgressIndicator());
          }

          return SingleChildScrollView(
            padding: EdgeInsets.all(16),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Información de la Barbería',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  SizedBox(height: 24),
                  GestureDetector(
                    onTap: _pickImage,
                    child: Container(
                      height: 200,
                      decoration: BoxDecoration(
                        color: Colors.grey[200],
                        borderRadius: BorderRadius.circular(10),
                        image: _selectedImagePath != null
                            ? DecorationImage(
                                image: FileImage(File(_selectedImagePath!)),
                                fit: BoxFit.cover,
                              )
                            : null,
                      ),
                      child: _selectedImagePath == null
                          ? Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.add_photo_alternate,
                                      size: 50, color: Colors.grey),
                                  SizedBox(height: 8),
                                  Text(
                                    'Seleccionar banner',
                                    style: TextStyle(color: Colors.grey),
                                  ),
                                ],
                              ),
                            )
                          : null,
                    ),
                  ),
                  SizedBox(height: 24),
                  CustomTextField(
                    controller: _nameController,
                    label: 'Nombre de la barbería',
                    prefixIcon: Icon(Icons.store),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'El nombre es requerido';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  CustomTextField(
                    controller: _descriptionController,
                    label: 'Descripción',
                    prefixIcon: Icon(Icons.description),
                    maxLines: 3,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'La descripción es requerida';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 24),
                  CustomButton(
                    text: 'Registrar Barbería',
                    onPressed: () {
                      if (_formKey.currentState?.validate() ?? false) {
                        if (_selectedImagePath == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content:
                                  Text('Por favor selecciona una imagen banner'),
                            ),
                          );
                          return;
                        }

                        context.read<BarbershopBloc>().add(
                              CreateBarbershopEvent(
                                name: _nameController.text,
                                description: _descriptionController.text,
                                imageBanner: _selectedImagePath!,
                              ),
                            );
                      }
                    },
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }
}