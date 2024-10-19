import 'package:flutter/material.dart';

class ServicesPage extends StatelessWidget {
  final List<Map<String, dynamic>> services = [
    {'name': 'Corte de pelo', 'price': '\$15.000', 'icon': Icons.content_cut},
    {'name': 'Recorte de barba', 'price': '\$10.000', 'icon': Icons.face},
    {'name': 'coloración del cabello', 'price': '\$50.000', 'icon': Icons.color_lens},
    {'name': 'Afeitado', 'price': '\$5.000', 'icon': Icons.waves},
    {'name': 'Peinado del cabello', 'price': '\$30.000', 'icon': Icons.style},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nuestros servicios'),
        backgroundColor: const Color.fromARGB(255, 243, 125, 15),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.brown[100]!, Colors.brown[50]!],
          ),
        ),
        child: ListView.builder(
          padding: EdgeInsets.all(16),
          itemCount: services.length,
          itemBuilder: (context, index) {
            final service = services[index];
            return Card(
              elevation: 4,
              margin: EdgeInsets.only(bottom: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: ListTile(
                contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                leading: CircleAvatar(
                  backgroundColor: Colors.brown[600],
                  child: Icon(service['icon'], color: Colors.white),
                ),
                title: Text(
                  service['name'],
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.brown[800]),
                ),
                subtitle: Text(
                  service['price'],
                  style: TextStyle(fontSize: 16, color: Colors.brown[600]),
                ),
                trailing: Icon(Icons.arrow_forward_ios, color: Colors.brown[600]),
                onTap: () {
                  // Implementar lógica para seleccionar servicio
                },
              ),
            );
          },
        ),
      ),
    );
  }
}