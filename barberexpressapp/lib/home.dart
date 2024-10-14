import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  final Map<String, dynamic> userData;

  const HomePage({Key? key, required this.userData}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
        actions: [
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () {
              // Implementar lógica de cierre de sesión aquí
              Navigator.of(context).pushReplacementNamed('/login');
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome, ${userData['firstName']} ${userData['lastName']}!',
                style: TextStyle(fontSize: 24)),
            SizedBox(height: 20),
            Text('Email: ${userData['email']}'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Implementar navegación a una página de perfil o configuración
              },
              child: Text('View Profile'),
            ),
          ],
        ),
      ),
    );
  }
}