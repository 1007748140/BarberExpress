import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  final Map<String, dynamic> userData;

  const HomePage({Key? key, required this.userData}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BarberExpress'),
        backgroundColor: const Color.fromARGB(255, 243, 125, 15),
        actions: [
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () {
              Navigator.of(context).pushReplacementNamed('/login');
            },
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.brown[100]!, Colors.brown[50]!],
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Bienvenid@, ${userData['firstName']} ${userData['lastName']}!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.brown[800]),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 20),
              _buildOption(
                context,
                'Reservar cita',
                Icons.calendar_today,
                () => Navigator.pushNamed(context, '/appointments'),
              ),
              SizedBox(height: 16),
              _buildOption(
                context,
                'Nuestros servicios',
                Icons.content_cut,
                () => Navigator.pushNamed(context, '/services'),
              ),
              SizedBox(height: 16),
              _buildOption(
                context,
                'Ver perfil',
                Icons.person,
                () {
                  // Implementar navegación a una página de perfil o configuración
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOption(BuildContext context, String title, IconData icon, VoidCallback onTap) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              Icon(icon, size: 32, color: Colors.brown[600]),
              SizedBox(width: 16),
              Text(
                title,
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.brown[800]),
              ),
            ],
          ),
        ),
      ),
    );
  }
}