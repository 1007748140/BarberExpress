import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config.dart'; // Asegúrate de importar tu archivo de configuración

class AuthService {
  // Método para registrar un usuario
  Future<http.Response> registerUser(Map<String, dynamic> userData) async {
    final response = await http.post(
      Uri.parse('${Config.baseUrl}/users/register'), // Cambiado según tu solicitud
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(userData),
    );
    return response;
  }

  // Método para iniciar sesión
  Future<http.Response> loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse('${Config.baseUrl}/users/login'), // Cambiado según tu solicitud
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );
    return response;
  }
}
