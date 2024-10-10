// lib/features/auth/providers/auth_provider.dart
import 'package:flutter/foundation.dart';
import '../data/models/user_model.dart';
import '../data/models/auth_response_model.dart';
import '../data/repositories/auth_repository.dart';

class AuthProvider with ChangeNotifier {
  final AuthRepository _authRepository = AuthRepository();

  UserModel? _user;
  String? _token;
  bool _isLoading = false;

  UserModel? get user => _user;
  String? get token => _token;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _token != null;

  Future<void> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _authRepository.login(email, password);
      _user = response.user;
      _token = response.token;
    } catch (e) {
      _user = null;
      _token = null;
      throw e;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> register(Map<String, dynamic> userData) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _authRepository.register(userData);
      _user = response.user;
      _token = response.token;
    } catch (e) {
      _user = null;
      _token = null;
      throw e;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void logout() {
    _user = null;
    _token = null;
    notifyListeners();
  }
}