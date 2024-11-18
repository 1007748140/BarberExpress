// lib/core/services/navigation_service.dart
import 'package:flutter/material.dart';

class NavigationService {
  static String getHomeRouteForRole(String role) {
    switch (role) {
      case 'Cliente':
        return '/client/home';
      case 'Barbero':
        return '/barber/home';
      case 'AdminBarberia':
        return '/admin/home';
      default:
        return '/client/home';
    }
  }

  static void navigateToRoleHome(BuildContext context, String role) {
    final route = getHomeRouteForRole(role);
    Navigator.of(context).pushReplacementNamed(route);
  }
}