import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:myapp/presentation/pages/auth/register_page.dart';
import 'package:myapp/bloc/auth/register_bloc.dart';
import 'package:myapp/bloc/auth/register_event.dart';
import 'package:myapp/bloc/auth/register_state.dart';
import 'package:myapp/core/services/navigation_service.dart';

class MockRegisterBloc extends MockBloc<RegisterEvent, RegisterState> implements RegisterBloc {}

void main() {
  group('RegisterPage', () {
    late MockRegisterBloc mockRegisterBloc;

    setUp(() {
      mockRegisterBloc = MockRegisterBloc();
    });

    testWidgets('Debe disparar el evento RegisterCredentialsSubmitted cuando se envían las credenciales', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<RegisterBloc>(
            create: (_) => mockRegisterBloc,
            child: RegisterPage(),
          ),
        ),
      );

      // Simular envío de credenciales
      final emailField = find.byKey(Key('email_field'));
      final passwordField = find.byKey(Key('password_field'));
      final roleField = find.byKey(Key('role_field')); // Asegúrate de que estos estén definidos en tu widget

      await tester.enterText(emailField, 'test@example.com');
      await tester.enterText(passwordField, 'password123');
      await tester.enterText(roleField, 'user'); // Suponiendo que el rol es un campo de texto

      await tester.tap(find.byType(ElevatedButton)); // Suponiendo que el botón es un ElevatedButton
      await tester.pump();

      // Verificar que se haya disparado el evento RegisterCredentialsSubmitted
      verify(mockRegisterBloc.add(RegisterCredentialsSubmitted(
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      ))).called(1);
    });

    testWidgets('Debe disparar el evento RegisterPersonalInfoSubmitted cuando se envían los datos personales', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<RegisterBloc>(
            create: (_) => mockRegisterBloc,
            child: RegisterPage(),
          ),
        ),
      );

      // Navegar al paso de información personal
      final firstNameField = find.byKey(Key('first_name_field'));
      final lastNameField = find.byKey(Key('last_name_field'));
      final phoneField = find.byKey(Key('phone_field'));

      await tester.enterText(firstNameField, 'Juan');
      await tester.enterText(lastNameField, 'Pérez');
      await tester.enterText(phoneField, '123456789');

      await tester.tap(find.byType(ElevatedButton)); // Enviar datos
      await tester.pump();

      // Verificar que se haya disparado el evento RegisterPersonalInfoSubmitted
      verify(mockRegisterBloc.add(RegisterPersonalInfoSubmitted(
        firstName: 'Juan',
        lastName: 'Pérez',
        phone: '123456789',
        profileImage: null, // Suponiendo que la imagen de perfil no se ha agregado
      ))).called(1);
    });

    testWidgets('Debe disparar el evento RegisterLocationSubmitted cuando se envían los datos de ubicación', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<RegisterBloc>(
            create: (_) => mockRegisterBloc,
            child: RegisterPage(),
          ),
        ),
      );

      // Navegar al paso de ubicación
      final countryField = find.byKey(Key('country_field'));
      final departmentField = find.byKey(Key('department_field'));
      final addressField = find.byKey(Key('address_field'));

      await tester.enterText(countryField, 'Argentina');
      await tester.enterText(departmentField, 'Buenos Aires');
      await tester.enterText(addressField, 'Calle Falsa 123');

      await tester.tap(find.byType(ElevatedButton)); // Enviar datos
      await tester.pump();

      // Verificar que se haya disparado el evento RegisterLocationSubmitted
      verify(mockRegisterBloc.add(RegisterLocationSubmitted(
        latitude: null, // Suponiendo que no hemos ingresado coordenadas
        longitude: null, // Lo mismo para longitud
        countryId: 'Argentina',
        departmentId: 'Buenos Aires',
        address: 'Calle Falsa 123',
      ))).called(1);
    });

    testWidgets('Debe mostrar un mensaje de error si el registro falla', (WidgetTester tester) async {
      // Simular un estado de error
      when(mockRegisterBloc.state).thenReturn(RegisterState(error: 'Ha ocurrido un error'));

      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<RegisterBloc>(
            create: (_) => mockRegisterBloc,
            child: RegisterPage(),
          ),
        ),
      );

      // Verificar que el mensaje de error se muestre
      expect(find.text('Ha ocurrido un error'), findsOneWidget);
    });

    testWidgets('Debe redirigir al usuario después de un registro exitoso', (WidgetTester tester) async {
      // Simular un estado exitoso
      when(mockRegisterBloc.state).thenReturn(RegisterState(isComplete: true, role: 'user'));

      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<RegisterBloc>(
            create: (_) => mockRegisterBloc,
            child: RegisterPage(),
          ),
        ),
      );

      // Verificar que se haya llamado a la navegación
      verify(mockRegisterBloc.add(RegisterCredentialsSubmitted(
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      ))).called(1);
      // Puedes verificar la redirección con un mock de NavigationService si lo necesitas
    });
  });
}
