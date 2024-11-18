// lib/presentation/pages/home/home_page.dart
import 'package:flutter/material.dart';


class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BarberExpress'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              // Implementar logout
            },
          ),
        ],
      ),
      body: Center(
        child: Text(
          'Bienvenido a BarberExpress',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      ),
    );
  }
}