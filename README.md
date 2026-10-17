# Pruebas Automatizadas de API - PokéAPI con Cypress ⚡
Este proyecto contiene una suite de pruebas automatizadas para la API pública de Pokémon (PokeAPI) desarrollada con Cypress y JavaScript. El objetivo principal es validar los endpoints principales, asegurar la consistencia del modelo de datos de los Pokémon y comprobar la navegación entre recursos relacionados.

# Pre-requisitos 🔧
Para ejecutar este proyecto necesitas tener instalado en tu sistema:

Node.js (versión 18.x o superior recomendada)

npm (gestor de paquetes de Node)

Git (para clonar el repositorio)

# Instalación
Sigue estos pasos para configurar tu entorno de desarrollo local:

Clona el repositorio:

git clone https://github.com/sofiasepulveda15-a11y/pokemon_api_OP.git


cd pokemon_api_OP


Instala las dependencias del proyecto:

npm install

# Ejecutando las pruebas
El proyecto está configurado para ejecutar la suite de pruebas tanto en modo interactivo (Runner de Cypress) como en modo headless (para integración continua).

# Modo Interactivo (Test Runner)
Abre la interfaz gráfica de Cypress para seleccionar y visualizar la ejecución en tiempo real:
npx cypress open

# Modo Headless (Línea de Comandos)
Ejecuta la suite completa directamente en la terminal:

npx cypress run

# Evidencias de Ejecución 📸
Se muestra la captura de la ejecución exitosa de la suite completa de pruebas en la carpeta evidencias.

## Pruebas automatizadas
Las pruebas están estructuradas para validar cuatro retos técnicos clave consumiendo datos dinámicos mediante Data-Driven Testing con archivos Fixture:

Reto 1 - Consulta exitosa de un Pokémon: Valida que el primer Pokémon del archivo JSON (pikachu) devuelva un código HTTP 200 y la estructura correcta de datos.

Reto 2 - Validación de múltiples Pokémon: Recorre dinámicamente un arreglo en pokemon.json validando las propiedades esenciales (id, name, abilities, types) de cada Pokémon.

Reto 3 - Escenario negativo: Comprueba el manejo de errores del sistema enviando una petición a un recurso inexistente y esperando una respuesta HTTP 404 sin romper la ejecución de Cypress (failOnStatusCode: false).

Reto 4 - Validación de información relacionada: Realiza peticiones encadenadas. Primero obtiene la información básica de un Pokémon, extrae la URL de su primera habilidad y realiza una segunda petición a dicha URL relacionada para comprobar que la información sea consistente.

# Arquitectura y Reutilización de Código ⌨️
Para garantizar un código limpio, mantenible y escalable, se implementaron dos mecanismos de reutilización:

Custom Command (cy.validarEstructuraPokemon): Registrado en cypress/support/commands.js, centraliza las aserciones comunes del objeto Pokémon (status, nombre, ID y arreglos no vacíos de habilidades/tipos).

Función Helper (getFirstAbility): Declarada en el spec principal, encapsula la extracción del objeto de la primera habilidad (URL y Nombre) desde la respuesta del JSON.

Configuración Global de BaseURL: Definida en cypress.config.js (https://pokeapi.co) para desacoplar el dominio base de las pruebas.

# Construido con 🛠️
Cypress - Framework de automatización de pruebas end-to-end y APIs.
JavaScript  - Lenguaje de programación.
Node.js - Entorno de ejecución para JavaScript.
PokéAPI - RESTful Pokémon API oficial consumida en las pruebas.

# Autor ✒️
Sofia Sepulveda Arriaga/ Automatización QA
