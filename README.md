# BarberExpress

 Este proyecto esta dividido en dos partes: BarberExpressBackend, el cual es la parte del servidor de arranque y barberexpressapp
 la cual es la aplicación compuesta por modulos, la cual consume la api o servicios que contiene la parte del backend.

``` estructura de carpetas
La siguiente estructura contiene información acerca de carpetas y archivos implementadas(no
tienen comentario), en implementación (En implementación), y faltantes por implementar(falta).

BarberExpress/
├── BarberExpressBackend/       # Carpeta de backend
│   ├── build/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── modules/                # Carpeta de modulos
│   │   │   ├── auth/               #falta adaptaciones
│   │   │   │   ├── controllers/
│   │   │   │   ├── dtos/
│   │   │   │   ├── services/
│   │   │   │   └── routes/
│   │   │   ├── countries/
│   │   │   │   ├── controllers/
│   │   │   │   ├── entities/
│   │   │   │   ├── services/
│   │   │   │   └── routes/
│   │   │   ├── roles/
│   │   │   │   ├── controllers/
│   │   │   │   ├── entities/
│   │   │   │   ├── services/
│   │   │   │   └── routes/
│   │   │   ├── states/
│   │   │   │   ├── controllers/
│   │   │   │   ├── entities/
│   │   │   │   ├── services/
│   │   │   │   └── routes/
│   │   │   ├── users/
│   │   │   │   ├── controllers/
│   │   │   │   ├── dtos/
│   │   │   │   ├── services/
│   │   │   │   ├── routes/
│   │   │   │   └── entities/
│   │   │   ├── appointments/       # (relacionada con citas)falta
│   │   │   │   ├── controllers/    # falta
│   │   │   │   ├── services/       # falta
│   │   │   │   ├── routes/         # falta
│   │   │   │   └── entities/       # falta
│   │   │   ├── services/           # falta
│   │   │   │   ├── controllers/    # falta
│   │   │   │   ├── services/       # falta
│   │   │   │   ├── routes/         # falta
│   │   │   │   └── entities/       # falta
│   │   │   └── barbers/            # falta
│   │   │       ├── controllers/    # falta
│   │   │       ├── services/       # falta
│   │   │       ├── routes/         # falta
│   │   │       └── entities/       # falta
│   │   │
│   │   └── app.ts
│   │
│   │
│   ├── eslint.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
└── BarberExpressApp/      # Carpeta para la aplicación móvil (Flutter)
    lib/
    ├── core/
    │   ├── api/
    │   │   └── api_client.dart    # Para manejar las llamadas HTTP
    │   └── utils/
    │       └── validators.dart     # Para validaciones de formularios
    ├── features/
    │   └── auth/
    │       ├── data/
    │       │   ├── models/
    │       │   │   ├── user_model.dart
    │       │   │   └── auth_response_model.dart
    │       │   └── repositories/
    │       │       └── auth_repository.dart
    │       ├── presentation/
    │       │   ├── screens/
    │       │   │   ├── login_screen.dart
    │       │   │   └── register_screen.dart
    │       │   └── widgets/
    │       │       ├── custom_text_field.dart
    │       │       └── auth_button.dart
    │       └── providers/
    │           └── auth_provider.dart
    └── main.dart

```

## Tecnologia usada

- **Node.js:** Para ejecutar el servidor y el backend. Lo estás utilizando para ejecutar el archivo principal index.js.

- **Express.js:** Un framework web para Node.js que  permite manejar rutas y solicitudes HTTP de manera eficiente.

- **TypeScript:** Un superconjunto de JavaScript que añade tipado estático, lo que mejora la robustez y escalabilidad del código.

- **mysql12:** es un paquete de Node.js que permite conectar y realizar consultas a bases de datos MySQL.

- **typeorm:** es un ORM (Object-Relational Mapping) para TypeScript y JavaScript (usando Node.js). Permite interactuar con bases de datos relacionales de manera más intuitiva, utilizando objetos en lugar de SQL puro. Esto facilita la manipulación de datos, la creación de esquemas y las consultas a la base de datos

- **Cors:** Un middleware de Express que permite manejar solicitudes HTTP desde dominios cruzados.

- **Body-parser:** Un middleware de Express para procesar el cuerpo de las solicitudes HTTP, facilitando el acceso a los datos enviados en formato JSON o URL-encoded.

- **ESLint:** Una herramienta de análisis de código estático para identificar patrones problemáticos en tu código y aplicar reglas de estilo.

- **ts-node:** Un ejecutor de TypeScript que permite ejecutar scripts TypeScript sin necesidad de precompilarlos.

- **@types:** Paquetes de definiciones de tipos para utilizar TypeScript con bibliotecas como Node.js, Express y Cors.
