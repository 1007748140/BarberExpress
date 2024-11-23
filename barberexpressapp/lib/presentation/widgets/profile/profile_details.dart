// lib/presentation/widgets/profile/profile_details.dart
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb, compute;
import 'package:flutter/services.dart';
import 'dart:ui' as ui;
import 'package:image_picker/image_picker.dart';
import '../../../config/app_theme.dart';
import '../common/custom_text_field.dart';
import '../common/custom_button.dart';
import 'dart:io';
import 'dart:html' as html;
import 'dart:convert';
import 'dart:js' as js;
import 'package:image/image.dart' as image_lib;
import 'dart:typed_data';

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
  // ignore: unused_field
  XFile? _selectedImageFile;
  final _imagePicker = ImagePicker();
  bool _isLoading = false;
  html.VideoElement? _videoElement;
  html.MediaStream? _mediaStream;
  bool _isCameraInitialized = false;

  // Función para comprimir imagen
  Future<Uint8List> _compressImage(Uint8List input) async {
    return await compute((Uint8List bytes) {
      final image_lib.Image? originalImage = image_lib.decodeImage(bytes);
      if (originalImage == null) return bytes;

      var resizedImage = originalImage;
      if (originalImage.width > 1000 || originalImage.height > 1000) {
        resizedImage = image_lib.copyResize(
          originalImage,
          width: originalImage.width > originalImage.height ? 1000 : null,
          height: originalImage.height >= originalImage.width ? 1000 : null,
        );
      }

      return Uint8List.fromList(image_lib.encodeJpg(resizedImage, quality: 70));
    }, input);
  }

  @override
  void initState() {
    super.initState();
    _firstNameController = TextEditingController(text: widget.firstName);
    _lastNameController = TextEditingController(text: widget.lastName);
    _emailController = TextEditingController(text: widget.email);
    _phoneController = TextEditingController(text: widget.phone);
    
    if (kIsWeb) {
      // Crear el elemento de video
      _videoElement = html.VideoElement()
        ..id = 'camera-video'
        ..autoplay = true
        ..style.width = '100%'
        ..style.height = '100%'
        ..style.objectFit = 'cover';

      // Registrar el elemento de video para la vista previa
      // ignore: undefined_prefixed_name
      ui.platformViewRegistry.registerViewFactory(
        'camera-preview',
        (int viewId) => html.DivElement()
          ..id = 'camera-container'
          ..style.width = '100%'
          ..style.height = '100%'
          ..children = [_videoElement!],
      );
    }
  }

  @override
  void dispose() {
    _stopCamera();
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }
  Future<void> _initializeCamera() async {
    if (_isCameraInitialized) return;

    try {
      _mediaStream = await html.window.navigator.mediaDevices?.getUserMedia({
        'video': {
          'facingMode': 'user',
          'width': {'ideal': 1280},
          'height': {'ideal': 720}
        },
        'audio': false
      });

      if (_mediaStream != null && _videoElement != null) {
        _videoElement!.srcObject = _mediaStream;
        await _videoElement!.play();
        setState(() {
          _isCameraInitialized = true;
        });
      }
    } catch (e) {
      print('Error al inicializar la cámara: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error al inicializar la cámara. Verifica los permisos.'),
          backgroundColor: AppTheme.errorColor,
        ),
      );
    }
  }

  void _stopCamera() {
    if (_mediaStream != null) {
      _mediaStream!.getTracks().forEach((track) => track.stop());
      _mediaStream = null;
    }
    if (_videoElement != null) {
      _videoElement!.srcObject = null;
    }
    _isCameraInitialized = false;
  }

  Future<void> _showCameraPreview() async {
    try {
      await _initializeCamera();

      if (_isCameraInitialized) {
        await showDialog(
          context: context,
          barrierDismissible: false,
          builder: (BuildContext context) {
            return Dialog(
              child: Container(
                padding: EdgeInsets.all(16),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Tomar Foto',
                      style: Theme.of(context).textTheme.titleLarge,
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 16),
                    Container(
                      width: 320,
                      height: 240,
                      clipBehavior: Clip.hardEdge,
                      decoration: BoxDecoration(
                        border: Border.all(color: AppTheme.secondaryColor),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: HtmlElementView(
                          viewType: 'camera-preview',
                          onPlatformViewCreated: (_) {
                            if (_videoElement != null && _mediaStream != null) {
                              _videoElement!.srcObject = _mediaStream;
                            }
                          },
                        ),
                      ),
                    ),
                    SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        TextButton(
                          onPressed: () {
                            _stopCamera();
                            Navigator.of(context).pop();
                          },
                          child: Text('Cancelar'),
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.secondaryColor,
                          ),
                          onPressed: () => _capturePhoto(context),
                          child: Text('Capturar'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      }
    } catch (e) {
      print('Error al mostrar la vista previa de la cámara: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error al mostrar la cámara'),
          backgroundColor: AppTheme.errorColor,
        ),
      );
    }
  }

  Future<void> _capturePhoto(BuildContext context) async {
    if (_videoElement != null && _videoElement!.videoWidth > 0) {
      try {
        final canvas = html.CanvasElement(
          width: _videoElement!.videoWidth,
          height: _videoElement!.videoHeight,
        );

        // Dibujar el frame actual del video en el canvas
        canvas.context2D.drawImage(_videoElement!, 0, 0);
        
        // Reducir la calidad de la imagen
        final dataUrl = canvas.toDataUrl('image/jpeg', 0.7);
        
        setState(() {
          _selectedImagePath = dataUrl;
        });

        _stopCamera();
        Navigator.of(context).pop();

        // Comprimir la imagen antes de subirla
        final bytes = base64Decode(dataUrl.split(',')[1]);
        final compressedBytes = await _compressImage(Uint8List.fromList(bytes));
        
        final compressedDataUrl = 'data:image/jpeg;base64,${base64Encode(compressedBytes)}';
        
        // Actualizar el perfil con la nueva imagen
        await _updateProfileWithNewImage(compressedDataUrl);
      } catch (e) {
        print('Error al capturar foto: $e');
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Error al procesar la imagen'),
              backgroundColor: AppTheme.errorColor,
            ),
          );
        }
      }
    }
  }
  Future<void> _showImageSourceDialog() async {
    if (kIsWeb) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Seleccionar imagen'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ListTile(
                  leading: Icon(
                    Icons.camera_alt,
                    color: AppTheme.secondaryColor,
                  ),
                  title: Text('Tomar foto'),
                  onTap: () async {
                    Navigator.pop(context);
                    try {
                      final permissionStatus = await html.window.navigator.permissions?.query({
                        'name': 'camera'
                      });
                      
                      if (permissionStatus?.state == 'granted') {
                        await _showCameraPreview();
                      } else {
                        // Solicitar permisos explícitamente
                        final stream = await html.window.navigator.mediaDevices?.getUserMedia({
                          'video': true,
                          'audio': false
                        });
                        
                        if (stream != null) {
                          stream.getTracks().forEach((track) => track.stop());
                          await _showCameraPreview();
                        }
                      }
                    } catch (e) {
                      print('Error al solicitar permisos de cámara: $e');
                      if (mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(
                              'No se pudo acceder a la cámara. Verifica los permisos en tu navegador.',
                              style: TextStyle(color: Colors.white),
                            ),
                            backgroundColor: AppTheme.errorColor,
                            duration: Duration(seconds: 5),
                            action: SnackBarAction(
                              label: 'Configuración',
                              textColor: Colors.white,
                              onPressed: () {
                                js.context.callMethod('eval', [
                                  'window.open("chrome://settings/content/camera", "_blank");'
                                ]);
                              },
                            ),
                          ),
                        );
                      }
                    }
                  },
                ),
                ListTile(
                  leading: Icon(
                    Icons.photo_library,
                    color: AppTheme.secondaryColor,
                  ),
                  title: Text('Galería'),
                  onTap: () {
                    Navigator.pop(context);
                    _getImage(ImageSource.gallery);
                  },
                ),
              ],
            ),
          );
        },
      );
    } else {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Seleccionar imagen'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ListTile(
                  leading: Icon(
                    Icons.camera_alt,
                    color: AppTheme.secondaryColor,
                  ),
                  title: Text('Tomar foto'),
                  onTap: () {
                    Navigator.pop(context);
                    _getImage(ImageSource.camera);
                  },
                ),
                ListTile(
                  leading: Icon(
                    Icons.photo_library,
                    color: AppTheme.secondaryColor,
                  ),
                  title: Text('Galería'),
                  onTap: () {
                    Navigator.pop(context);
                    _getImage(ImageSource.gallery);
                  },
                ),
              ],
            ),
          );
        },
      );
    }
  }

  Future<void> _getImage(ImageSource source) async {
    try {
      final XFile? image = await _imagePicker.pickImage(
        source: source,
        maxWidth: 1000,
        maxHeight: 1000,
        imageQuality: 70,
        preferredCameraDevice: CameraDevice.front,
      );

      if (image != null) {
        if (kIsWeb) {
          final bytes = await image.readAsBytes();
          final compressedBytes = await _compressImage(bytes);
          final base64Image = base64Encode(compressedBytes);
          setState(() {
            _selectedImageFile = image;
            _selectedImagePath = 'data:image/jpeg;base64,$base64Image';
          });
        } else {
          setState(() {
            _selectedImageFile = image;
            _selectedImagePath = image.path;
          });
        }

        await _updateProfileWithNewImage();
      }
    } catch (e) {
      print('Error al capturar imagen: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al capturar la imagen: ${e.toString()}'),
            backgroundColor: AppTheme.errorColor,
          ),
        );
      }
    }
  }

  Future<void> _updateProfileWithNewImage([String? compressedImage]) async {
    if (_selectedImagePath == null && compressedImage == null) return;

    setState(() => _isLoading = true);
    try {
      final imageToUpload = compressedImage ?? _selectedImagePath;
      if (imageToUpload != null) {
        await widget.onUpdate(
          _firstNameController.text,
          _lastNameController.text,
          _phoneController.text,
          imageToUpload,
        );

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Foto de perfil actualizada exitosamente'),
              backgroundColor: Colors.green,
            ),
          );
        }
      }
    } catch (e) {
      print('Error al actualizar la foto de perfil: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al actualizar la foto de perfil: ${e.toString()}'),
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
  Widget _buildProfileImage() {
    return Stack(
      children: [
        GestureDetector(
          onTap: _isLoading ? null : _showImageSourceDialog,
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
            child: _isLoading
                ? Center(
                    child: CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation<Color>(
                        AppTheme.secondaryColor,
                      ),
                    ),
                  )
                : (!kIsWeb && _getProfileImage() == null)
                    ? Icon(
                        Icons.person,
                        size: 50,
                        color: Colors.grey[400],
                      )
                    : null,
          ),
        ),
        if (!_isLoading)
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
    );
  }

  DecorationImage? _getProfileImage() {
    try {
      if (_selectedImagePath != null) {
        if (_selectedImagePath!.startsWith('data:image')) {
          final base64Str = _selectedImagePath!.split(',')[1];
          return DecorationImage(
            image: MemoryImage(base64Decode(base64Str)),
            fit: BoxFit.cover,
          );
        } else if (!kIsWeb) {
          return DecorationImage(
            image: FileImage(File(_selectedImagePath!)),
            fit: BoxFit.cover,
          );
        }
      }
      if (widget.profileImage != null) {
        if (widget.profileImage!.startsWith('data:image')) {
          final base64Str = widget.profileImage!.split(',')[1];
          return DecorationImage(
            image: MemoryImage(base64Decode(base64Str)),
            fit: BoxFit.cover,
          );
        } else if (widget.profileImage!.startsWith('http')) {
          return DecorationImage(
            image: NetworkImage(widget.profileImage!),
            fit: BoxFit.cover,
          );
        }
      }
    } catch (e) {
      print('Error al cargar la imagen: $e');
    }
    return null;
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
            Center(child: _buildProfileImage()),
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
}