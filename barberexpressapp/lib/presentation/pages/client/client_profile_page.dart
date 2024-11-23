// lib/presentation/pages/client/client_profile_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../config/app_theme.dart';
import '../../widgets/profile/profile_details.dart';
import '../../bloc/profile/profile_bloc.dart';
import '../../bloc/profile/profile_event.dart';
import '../../bloc/profile/profile_state.dart';
import '../../../di/injection_container.dart';

import 'dart:io';

class ClientProfilePage extends StatelessWidget {
  const ClientProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => sl<ProfileBloc>()..add(LoadProfileEvent()),
      child: _ProfilePageContent(),
    );
  }
}

class _ProfilePageContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mi Perfil'),
        backgroundColor: AppTheme.primaryColor,
      ),
      body: BlocConsumer<ProfileBloc, ProfileState>(
        listener: (context, state) {
          if (state is ProfileError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.message),
                backgroundColor: AppTheme.errorColor,
              ),
            );
          }
        },
        builder: (context, state) {
          if (state is ProfileLoading) {
            return Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppTheme.secondaryColor),
              ),
            );
          }

          if (state is ProfileLoaded) {
            return ProfileDetails(
              firstName: state.profile.firstName,
              lastName: state.profile.lastName,
              email: state.profile.user.email,
              phone: state.profile.phone,
              profileImage: state.profile.profileImage,
              onUpdate: (firstName, lastName, phone, profileImage) async {
                if (profileImage != null && profileImage != state.profile.profileImage) {
                  // Si hay una nueva imagen, primero la subimos
                  context.read<ProfileBloc>().add(
                    UploadProfileImageEvent(
                      imageFile: File(profileImage),
                    ),
                  );
                }

                // Actualizamos el resto del perfil
                context.read<ProfileBloc>().add(
                  UpdateProfileEvent(
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    profileImage: profileImage,
                  ),
                );
              },
            );
          }

          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.error_outline,
                  size: 60,
                  color: AppTheme.errorColor,
                ),
                SizedBox(height: 16),
                Text(
                  'Error al cargar el perfil',
                  style: TextStyle(color: AppTheme.errorColor),
                ),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    context.read<ProfileBloc>().add(LoadProfileEvent());
                  },
                  child: Text('Reintentar'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}