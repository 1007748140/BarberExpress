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
      appBar: AppBar(title: Text('Register')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: EdgeInsets.all(16.0),
          children: [
            TextFormField(
              decoration: InputDecoration(labelText: 'First Name'),
              validator: (value) => value!.isEmpty ? 'Please enter your first name' : null,
              onSaved: (value) => _userData['first_name'] = value,
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Last Name'),
              validator: (value) => value!.isEmpty ? 'Please enter your last name' : null,
              onSaved: (value) => _userData['last_name'] = value,
            ),
            DropdownButtonFormField<int>(
              decoration: InputDecoration(labelText: 'Country'),
              value: _selectedCountryId,
              items: _countries.map((country) => DropdownMenuItem<int>(
                value: country['id'] as int,
                child: Text(country['name'] as String),
              )).toList(),
              onChanged: _onCountryChanged,
              validator: (value) => value == null ? 'Please select a country' : null,
            ),
            DropdownButtonFormField<int>(
              decoration: InputDecoration(labelText: 'State'),
              value: _selectedStateId,
              items: _states.map((state) => DropdownMenuItem<int>(
                value: state['id'] as int,
                child: Text(state['name'] as String),
              )).toList(),
              onChanged: (value) {
                setState(() {
                  _selectedStateId = value;
                  _userData['state_id'] = value;
                });
              },
              validator: (value) => value == null ? 'Please select a state' : null,
            ),
            DropdownButtonFormField<int>(
              decoration: InputDecoration(labelText: 'Role'),
              value: _selectedRoleId,
              items: _roles.map((role) => DropdownMenuItem<int>(
                value: role['id'] as int,
                child: Text(role['name'] as String),
              )).toList(),
              onChanged: (value) {
                setState(() {
                  _selectedRoleId = value;
                  _userData['role_id'] = value;
                });
              },
              validator: (value) => value == null ? 'Please select a role' : null,
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Email'),
              validator: (value) => value!.isEmpty ? 'Please enter your email' : null,
              onSaved: (value) => _userData['email'] = value,
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
              validator: (value) => value!.isEmpty ? 'Please enter a password' : null,
              onSaved: (value) => _userData['password'] = value,
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Phone'),
              validator: (value) => value!.isEmpty ? 'Please enter your phone number' : null,
              onSaved: (value) => _userData['phone'] = value,
            ),
            ElevatedButton(
              onPressed: _getCurrentLocation,
              child: Text('Get Current Location'),
            ),
            ElevatedButton(
              onPressed: _register,
              child: Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}