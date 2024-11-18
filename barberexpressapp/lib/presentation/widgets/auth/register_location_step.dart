// lib/presentation/widgets/auth/register_location_step.dart
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../../../config/app_theme.dart';
import '../../../core/services/location_service.dart';
import '../../../data/models/location/country_model.dart';
import '../../../data/models/location/department_model.dart';
import '../common/custom_button.dart';
import '../common/custom_dropdown.dart';

class RegisterLocationStep extends StatefulWidget {
  final Function(double latitude, double longitude, int countryId, int departmentId, String address) onSubmit;
  final VoidCallback onBack;
  final List<CountryModel> countries;
  final List<DepartmentModel> departments;

  const RegisterLocationStep({
    Key? key,
    required this.onSubmit,
    required this.onBack,
    required this.countries,
    required this.departments,
  }) : super(key: key);

  @override
  _RegisterLocationStepState createState() => _RegisterLocationStepState();
}

class _RegisterLocationStepState extends State<RegisterLocationStep> {
  GoogleMapController? _mapController;
  LatLng? _selectedLocation;
  CountryModel? _selectedCountry;
  DepartmentModel? _selectedDepartment;
  String _address = '';
  List<DepartmentModel> _filteredDepartments = [];
  bool _isLoading = false;
  bool _isLoadingLocation = false;

  @override
  void initState() {
    super.initState();
    _initializeLocation();
  }

  Future<void> _initializeLocation() async {
    if (widget.countries.isNotEmpty) {
      setState(() {
        _selectedCountry = widget.countries.first;
        _filteredDepartments = widget.departments
            .where((dept) => dept.countryId == _selectedCountry!.id)
            .toList();
      });
      print('Departamentos filtrados iniciales: ${_filteredDepartments.length}');
      await _getCurrentLocation();
    }
  }

  Future<void> _getCurrentLocation() async {
    setState(() => _isLoadingLocation = true);
    try {
      final location = await LocationService.getCurrentLocation();
      
      setState(() {
        _selectedLocation = LatLng(location.latitude, location.longitude);
        _address = location.address;
        
        // Actualizar departamento basado en la ubicación
        if (_filteredDepartments.isNotEmpty) {
          _selectedDepartment = _filteredDepartments.firstWhere(
            (dept) => dept.name.toLowerCase() == location.state.toLowerCase(),
            orElse: () => _filteredDepartments.first,
          );
        }
      });

      if (_mapController != null && _selectedLocation != null) {
        _mapController!.animateCamera(
          CameraUpdate.newLatLngZoom(_selectedLocation!, 15),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    } finally {
      setState(() => _isLoadingLocation = false);
    }
  }

  Future<void> _onMapTap(LatLng location) async {
    setState(() {
      _selectedLocation = location;
      _isLoading = true;
    });

    try {
      final locationResult = await LocationService.getLocationFromCoordinates(
        location.latitude,
        location.longitude,
      );

      setState(() {
        _address = locationResult.address;
        
        if (_filteredDepartments.isNotEmpty) {
          _selectedDepartment = _filteredDepartments.firstWhere(
            (d) => d.name.toLowerCase() == locationResult.state.toLowerCase(),
            orElse: () => _selectedDepartment ?? _filteredDepartments.first,
          );
        }
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al obtener la dirección')),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  bool get _isFormValid =>
      _selectedLocation != null &&
      _selectedCountry != null &&
      _selectedDepartment != null &&
      _address.isNotEmpty;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Ubicación',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: AppTheme.primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
            ),
            SizedBox(height: 8),
            Text(
              'Selecciona tu ubicación',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: AppTheme.accentColor,
                  ),
            ),
            SizedBox(height: 24),
            
            CustomDropdown<CountryModel>(
              value: _selectedCountry,
              hint: 'Selecciona tu país',
              items: widget.countries.map((country) => DropdownMenuItem(
                value: country,
                child: Text(country.name),
              )).toList(),
              onChanged: widget.countries.isNotEmpty ? (country) {
                if (country != null) {
                  setState(() {
                    _selectedCountry = country;
                    _selectedDepartment = null;
                    _filteredDepartments = widget.departments
                        .where((dept) => dept.countryId == country.id)
                        .toList();
                  });
                  print('País seleccionado: ${country.name}');
                  print('Departamentos filtrados: ${_filteredDepartments.length}');
                }
              } : null,
            ),
            
            SizedBox(height: 16),
            
            CustomDropdown<DepartmentModel>(
              value: _selectedDepartment,
              hint: 'Selecciona tu departamento',
              items: _filteredDepartments.map((department) => DropdownMenuItem(
                value: department,
                child: Text(department.name),
              )).toList(),
              onChanged: _selectedCountry != null ? (department) {
                setState(() {
                  _selectedDepartment = department;
                });
                if (department != null) {
                  print('Departamento seleccionado: ${department.name}');
                }
              } : null,
            ),

            SizedBox(height: 24),

            Container(
              height: 300,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppTheme.accentColor.withOpacity(0.3)),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Stack(
                  children: [
                    if (_selectedLocation == null || _isLoadingLocation)
                      Center(child: CircularProgressIndicator())
                    else
                      GoogleMap(
                        initialCameraPosition: CameraPosition(
                          target: _selectedLocation!,
                          zoom: 15,
                        ),
                        onMapCreated: (controller) => _mapController = controller,
                        markers: _selectedLocation == null
                            ? {}
                            : {
                                Marker(
                                  markerId: const MarkerId('selected_location'),
                                  position: _selectedLocation!,
                                  icon: BitmapDescriptor.defaultMarkerWithHue(
                                      BitmapDescriptor.hueAzure),
                                  infoWindow: const InfoWindow(
                                      title: 'Ubicación seleccionada'),
                                ),
                              },
                        onTap: _onMapTap,
                        myLocationEnabled: true,
                        myLocationButtonEnabled: true,
                        zoomControlsEnabled: true,
                        mapToolbarEnabled: false,
                      ),
                    Positioned(
                      top: 8,
                      right: 8,
                      child: FloatingActionButton(
                        mini: true,
                        backgroundColor: AppTheme.secondaryColor,
                        onPressed: _getCurrentLocation,
                        child: Icon(Icons.my_location, color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            if (_address.isNotEmpty) ...[
              SizedBox(height: 16),
              Container(
                padding: EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppTheme.accentColor.withOpacity(0.3)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Dirección seleccionada:',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primaryColor,
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(_address),
                  ],
                ),
              ),
            ],

            SizedBox(height: 24),
            
            Row(
              children: [
                Expanded(
                  child: CustomButton(
                    text: 'Atrás',
                    onPressed: widget.onBack,
                    isOutlined: true,
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: CustomButton(
                    text: 'Finalizar',
                    onPressed: _isFormValid
                        ? () {
                            print('Enviando datos de ubicación:');
                            print('Latitud: ${_selectedLocation!.latitude}');
                            print('Longitud: ${_selectedLocation!.longitude}');
                            print('País ID: ${_selectedCountry!.id}');
                            print('Departamento ID: ${_selectedDepartment!.id}');
                            print('Dirección: $_address');
                            
                            widget.onSubmit(
                              _selectedLocation!.latitude,
                              _selectedLocation!.longitude,
                              _selectedCountry!.id,
                              _selectedDepartment!.id,
                              _address,
                            );
                          }
                        : null,
                  ),
                ),
              ],
            ),
          ],
        ),
        if (_isLoading)
          Container(
            color: Colors.black54,
            child: Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppTheme.secondaryColor),
              ),
            ),
          ),
      ],
    );
  }

  @override
  void dispose() {
    _mapController?.dispose();
    super.dispose();
  }
}