import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'api_service.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  final Map<String, dynamic> _userData = {};
  List<Map<String, dynamic>> _countries = [];
  List<Map<String, dynamic>> _states = [];
  List<Map<String, dynamic>> _roles = [];
  int? _selectedCountryId;
  int? _selectedStateId;
  int? _selectedRoleId;

  @override
  void initState() {
    super.initState();
    _loadInitialData();
  }

  void _loadInitialData() async {
    try {
      final countries = await ApiService.getCountries();
      final roles = await ApiService.getRoles();
      setState(() {
        _countries = List<Map<String, dynamic>>.from(countries);
        _roles = List<Map<String, dynamic>>.from(roles);
      });
    } catch (e) {
      print('Error loading initial data: $e');
      // Mostrar un mensaje de error al usuario
    }
  }

  void _onCountryChanged(int? countryId) async {
    if (countryId != null) {
      try {
        final states = await ApiService.getStates(countryId);
        setState(() {
          _selectedCountryId = countryId;
          _states = List<Map<String, dynamic>>.from(states);
          _selectedStateId = null;
          _userData['country_id'] = countryId;
          _userData['state_id'] = null;
        });
      } catch (e) {
        print('Error loading states: $e');
        // Mostrar un mensaje de error al usuario
      }
    }
  }

  void _getCurrentLocation() async {
    try {
      final position = await Geolocator.getCurrentPosition();
      setState(() {
        _userData['latitude'] = position.latitude;
        _userData['longitude'] = position.longitude;
      });
    } catch (e) {
      print('Error getting location: $e');
      // Mostrar un mensaje de error al usuario
    }
  }

  void _register() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        final result = await ApiService.register(_userData);
        // Manejar el registro exitoso
        print(result);
      } catch (e) {
        // Manejar el error de registro
        print('Error registering: $e');
        // Mostrar un mensaje de error al usuario
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Registro', style: TextStyle(color: Colors.white)),
        backgroundColor: Color(0xFF1E2A3B),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF1E2A3B), Color(0xFF8B4513)],
          ),
        ),
        child: Form(
          key: _formKey,
          child: ListView(
            padding: EdgeInsets.all(16.0),
            children: [
              _buildInputField('Nombre', (value) => _userData['first_name'] = value),
              _buildInputField('Apellido', (value) => _userData['last_name'] = value),
              _buildDropdown('País', _countries, _selectedCountryId, _onCountryChanged),
              _buildDropdown('Estado', _states, _selectedStateId, (value) {
                setState(() {
                  _selectedStateId = value;
                  _userData['state_id'] = value;
                });
              }),
              _buildDropdown('Rol', _roles, _selectedRoleId, (value) {
                setState(() {
                  _selectedRoleId = value;
                  _userData['role_id'] = value;
                });
              }),
              _buildInputField('Email', (value) => _userData['email'] = value),
              _buildInputField('Contraseña', (value) => _userData['password'] = value, isPassword: true),
              _buildInputField('Teléfono', (value) => _userData['phone'] = value),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _getCurrentLocation,
                child: Text('Obtener Ubicación Actual'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 4, 95, 75),
                  foregroundColor: Colors.white,
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _register,
                child: Text('Registrarse'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 12, 139, 0),
                  foregroundColor: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInputField(String label, Function(String) onSaved, {bool isPassword = false}) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: TextFormField(
        decoration: InputDecoration(
          labelText: label,
          labelStyle: TextStyle(color: Colors.white70),
          filled: true,
          fillColor: Colors.white.withOpacity(0.1),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide.none,
          ),
        ),
        style: TextStyle(color: Colors.white),
        obscureText: isPassword,
        validator: (value) => value!.isEmpty ? 'Por favor, completa este campo' : null,
        onSaved: (value) => onSaved(value!),
      ),
    );
  }

  Widget _buildDropdown(String label, List<Map<String, dynamic>> items, int? selectedValue, Function(int?) onChanged) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: DropdownButtonFormField<int>(
        decoration: InputDecoration(
          labelText: label,
          labelStyle: TextStyle(color: Colors.white70),
          filled: true,
          fillColor: Colors.white.withOpacity(0.1),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide.none,
          ),
        ),
        dropdownColor: Color(0xFF1E2A3B),
        style: TextStyle(color: Colors.white),
        value: selectedValue,
        items: items.map((item) => DropdownMenuItem<int>(
          value: item['id'] as int,
          child: Text(item['name'] as String),
        )).toList(),
        onChanged: onChanged,
        validator: (value) => value == null ? 'Por favor, selecciona una opción' : null,
      ),
    );
  }
}