Pequeño framework de automatización de pruebas de API desarrollado con Cypress y JavaScript, diseñado para validar endpoints de la PokéAPI aplicando buenas prácticas de calidad de software.

Tecnologías y Herramientas Utilizadas
Cypress: Motor de pruebas End-to-End y de API.

JavaScript (ES6+): Lenguaje de programación base.

Postman (Mock Server): Utilizado para simular las respuestas de la PokéAPI y evitar bloqueos de red o pasarelas de seguridad corporativas.

JSON: Para la separación de datos de prueba (fixtures).

Estructura del Proyecto
api-pokemon-automation/
├── cypress/
│   ├── e2e/
│   │   └── pokemon_api.cy.js    # Archivo con los 4 retos automatizados
│   ├── fixtures/
│   │   └── pokemon.json         # Datos de prueba parametrizados (Reto 2)
│   └── support/
│       └── commands.js          # Comandos personalizados (si aplica)
├── package.json                 # Dependencias y scripts del proyecto
└── README.md                    # Documentación del proyecto

Descripción de los Retos Cubiertos
Reto 1 (Consulta Exitosa): Valida código HTTP 200, correspondencia de nombre, formato numérico del ID y la presencia de arreglos válidos para habilidades y tipos.

Reto 2 (Pruebas Parametrizadas): Itera de forma dinámica sobre múltiples Pokémon (Pikachu, Charizard, Bulbasaur) utilizando datos separados almacenados en cypress/fixtures/pokemon.json.

Reto 3 (Escenario Negativo): Consulta un recurso inexistente gestionando correctamente el código 404 mediante failOnStatusCode: false para evitar fallas inesperadas en la ejecución.

Reto 4 (Información Relacionada): Extrae dinámicamente URLs de recursos relacionados desde la primera respuesta y realiza una segunda petición validando la consistencia de los datos.

Instrucciones de Instalación y Ejecución
Prerrequisitos
Asegúrate de tener instalado en tu equipo:

Node.js (versión LTS recomendada).
1. Clonar el repositorio e instalar dependencias
Abre tu terminal en la carpeta del proyecto y ejecuta:
npm install
2. Ejecutar las pruebas
Modo Interactivo (Interfaz gráfica de Cypress):
npx cypress open
(Una vez abierta la ventana, selecciona E2E Testing, elige tu navegador y haz clic sobre el archivo pokemon_api.cy.js).
Modo Headless (Desde la terminal / línea de comandos):
npx cypress run --spec "cypress/e2e/pokemon_api.cy.js"

Notas de Configuración (Entorno Mock)
Debido a políticas de red y seguridad (firewalls/proxies corporativos) que pueden bloquear peticiones salientes hacia pokeapi.co devolviendo errores 502, el framework está preparado para apuntar de forma estable a un Mock Server configurado en Postman, adaptando dinámicamente las URLs relacionadas cuando es necesario.