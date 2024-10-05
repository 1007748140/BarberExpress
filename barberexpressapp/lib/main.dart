import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BarberExpress',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BarberShopHomePage(),
    );
  }
}
class BarberShopHomePage extends StatelessWidget {
  const BarberShopHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.blue[900]!, Colors.blue[700]!],
          ),
        ),
        child: Column(
          children: [
            _buildTopBar(),
            _buildMainContent(),
            _buildBottomBar(),
          ],
        ),
      ),
    );
  }

  Widget _buildTopBar() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Row(
            children: [
              Icon(Icons.account_circle, color: Colors.white),
              SizedBox(width: 8),
              Text('Perfil', style: TextStyle(color: Colors.white)),
            ],
          ),
          const Row(
            children: [
              Icon(Icons.monetization_on, color: Colors.yellow),
              SizedBox(width: 4),
              Text('1000', style: TextStyle(color: Colors.white)),
              SizedBox(width: 16),
              Icon(Icons.diamond, color: Colors.lightBlue),
              SizedBox(width: 4),
              Text('50', style: TextStyle(color: Colors.white)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMainContent() {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.all(106),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.2),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.content_cut, size: 80, color: Colors.white),
            const SizedBox(height: 16),
            const Text('Barbería Estilo', style: TextStyle(color: Colors.white, fontSize: 24)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {},
              child: const Text('Reservar Cita'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomBar() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _BottomBarItem(icon: Icons.home, label: 'Inicio'),
          _BottomBarItem(icon: Icons.calendar_today, label: 'Citas'),
          _BottomBarItem(icon: Icons.person, label: 'Perfil'),
          _BottomBarItem(icon: Icons.settings, label: 'Ajustes'),
        ],
      ),
    );
  }
}

class _BottomBarItem extends StatelessWidget {
  final IconData icon;
  final String label;

  const _BottomBarItem({Key? key, required this.icon, required this.label}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.white)),
      ],
    );
  }
}