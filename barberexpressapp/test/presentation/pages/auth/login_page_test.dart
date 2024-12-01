import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:myapp/presentation/pages/auth/login_page.dart';
import 'package:myapp/bloc/auth/auth_bloc.dart';
import 'package:myapp/bloc/auth/auth_event.dart';
import 'package:myapp/bloc/auth/auth_state.dart';

class MockAuthBloc extends MockBloc<AuthEvent, AuthState> implements AuthBloc {}

void main() {
  group('LoginPage', () {
    late MockAuthBloc mockAuthBloc;

    setUp(() {
      mockAuthBloc = MockAuthBloc();
    });

    testWidgets('Debe mostrar los campos de correo y contraseña', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<AuthBloc>(
            create: (_) => mockAuthBloc,
            child: LoginPage(),
          ),
        ),
      );

      expect(find.byType(TextField), findsNWidgets(2)); // Correo y Contraseña
      expect(find.byType(CustomButton), findsOneWidget); // Botón de inicio de sesión
    });

    testWidgets('Debe mostrar mensaje de error si la validación de campos falla', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<AuthBloc>(
            create: (_) => mockAuthBloc,
            child: LoginPage(),
          ),
        ),
      );

      // Interactuar con el formulario sin llenar los campos
      await tester.tap(find.byType(CustomButton));
      await tester.pump();

      // Verificar si se muestra un error en los campos
      expect(find.text('Por favor ingrese un correo electrónico válido'), findsOneWidget);
      expect(find.text('Por favor ingrese una contraseña'), findsOneWidget);
    });

    testWidgets('Debe llamar al bloc para realizar el login cuando el formulario es válido', (WidgetTester tester) async {
      // Simular un formulario válido
      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<AuthBloc>(
            create: (_) => mockAuthBloc,
            child: LoginPage(),
          ),
        ),
      );

      // Escribir un email y una contraseña válidos
      await tester.enterText(find.byType(TextField).first, 'test@example.com');
      await tester.enterText(find.byType(TextField).at(1), 'password123');

      // Simular clic en el botón de login
      await tester.tap(find.byType(CustomButton));
      await tester.pump();

      // Verificar que se haya disparado el evento LoginEvent
      verify(mockAuthBloc.add(LoginEvent(email: 'test@example.com', password: 'password123'))).called(1);
    });
  });
}
