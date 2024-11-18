// lib/core/routes/app_routes.dart

import 'package:flutter/material.dart';
import '../../presentation/pages/splash/splash_page.dart';
import '../../presentation/pages/auth/login_page.dart';
import '../../presentation/pages/auth/register_page.dart';
import '../../presentation/pages/client/client_home_page.dart';
import '../../presentation/pages/barber/barber_home_page.dart';
import '../../presentation/pages/admin/admin_home_page.dart';
import '../../presentation/pages/admin/register_barbershop_page.dart';
import '../../presentation/pages/admin/barbershop_details_page.dart';
import '../../presentation/pages/client/client_profile_page.dart';

class AppRoutes {
  static const String splash = '/';
  static const String login = '/login';
  static const String register = '/register';
  static const String clientHome = '/client/home';
  static const String clientProfile = '/client/profile';
  static const String barberHome = '/barber/home';
  static const String adminHome = '/admin/home';
  static const String registerBarbershop = '/admin/register-barbershop';
  static const String barbershopDetails = '/admin/barbershop-details';

  static Map<String, WidgetBuilder> get routes => {
        splash: (context) => SplashPage(),
        login: (context) => LoginPage(),
        register: (context) => RegisterPage(),
        clientHome: (context) => ClientHomePage(),
        clientProfile: (_) => ClientProfilePage(),
        barberHome: (context) => BarberHomePage(),
        adminHome: (context) => AdminHomePage(),
        registerBarbershop: (context) => RegisterBarbershopPage(),
        barbershopDetails: (context) => BarbershopDetailsPage(),
      };
}