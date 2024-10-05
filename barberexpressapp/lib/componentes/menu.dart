import 'package:flutter/material.dart';

class BottomMenuBar extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemSelected;

  const BottomMenuBar({
    Key? key,
    required this.selectedIndex,
    required this.onItemSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      currentIndex: selectedIndex,
      onTap: onItemSelected,
      selectedItemColor: Colors.brown[800],
      unselectedItemColor: Colors.brown[300],
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Inicio',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.calendar_today),
          label: 'Reservar',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.content_cut),
          label: 'Servicios',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Perfil',
        ),
      ],
    );
  }
}