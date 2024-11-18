// lib/presentation/pages/admin/barbershop_details_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../bloc/barbershop/barbershop_bloc.dart';
import '../../bloc/barbershop/barbershop_event.dart';
import '../../bloc/barbershop/barbershop_state.dart';
import '../../../config/app_theme.dart';
import '../../widgets/common/custom_text_field.dart';
import '../../widgets/common/custom_button.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class BarbershopDetailsPage extends StatefulWidget {
  @override
  _BarbershopDetailsPageState createState() => _BarbershopDetailsPageState();
}

class _BarbershopDetailsPageState extends State<BarbershopDetailsPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _descriptionController = TextEditingController();
  String? _selectedImagePath;
  String? _currentImageUrl;
  int _currentStateId = 2; // Por defecto: Cerrado
  final _imagePicker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _loadBarbershopData();
  }

  void _loadBarbershopData() {
    final state = context.read<BarbershopBloc>().state;
    if (state is BarbershopLoaded) {
      _nameController.text = state.barbershop.name;
      _descriptionController.text = state.barbershop.description;
      _currentImageUrl = state.barbershop.imageBanner;
      _currentStateId = state.barbershop.stateId;
    }
  }

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
        title: Text('Información de la Barbería'),
      ),
      body: BlocConsumer<BarbershopBloc, BarbershopState>(
        listener: (context, state) {
          if (state is BarbershopError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.message)),
            );
          } else if (state is BarbershopUpdated) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Información actualizada exitosamente')),
            );
            Navigator.pop(context);
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
                    'Detalles de la Barbería',
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
                            : _currentImageUrl != null
                                ? DecorationImage(
                                    image: NetworkImage(_currentImageUrl!),
                                    fit: BoxFit.cover,
                                  )
                                : null,
                      ),
                      child: _selectedImagePath == null && _currentImageUrl == null
                          ? Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.add_photo_alternate,
                                      size: 50, color: Colors.grey),
                                  SizedBox(height: 8),
                                  Text(
                                    'Cambiar banner',
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
                  SizedBox(height: 16),
                  DropdownButtonFormField<int>(
                    value: _currentStateId,
                    decoration: InputDecoration(
                      labelText: 'Estado de la barbería',
                      prefixIcon: Icon(Icons.store),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    items: [
                      DropdownMenuItem(
                        value: 1,
                        child: Text('Abierto'),
                      ),
                      DropdownMenuItem(
                        value: 2,
                        child: Text('Cerrado'),
                      ),
                      DropdownMenuItem(
                        value: 3,
                        child: Text('En mantenimiento'),
                      ),
                    ],
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          _currentStateId = value;
                        });
                      }
                    },
                  ),
                  SizedBox(height: 24),
                  CustomButton(
                    text: 'Guardar Cambios',
                    onPressed: () {
                      if (_formKey.currentState?.validate() ?? false) {
                        context.read<BarbershopBloc>().add(
                              UpdateBarbershopEvent(
                                name: _nameController.text,
                                description: _descriptionController.text,
                                imageBanner: _selectedImagePath ?? _currentImageUrl!,
                                stateId: _currentStateId,
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