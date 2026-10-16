describe('Testing de API Pokemon', () => {
  let pokemons;

  // Cargar el archivo de datos antes de ejecutar las pruebas
  before(() => {
    cy.fixture('pokemon.json').then((data) => {
      pokemons = data;
    });
  });

it('Reto 1: Consultar un Pokémon existente con éxito', () => {
    cy.request('https://993b1a51-dd4b-4578-a07b-8c0e8b2a86d6.mock.pstmn.io/api/v2/pokemon/pikachu').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('pikachu');
      expect(response.body.id).to.be.a('number');
      expect(response.body.abilities).to.be.an('array').and.not.be.empty;
      expect(response.body.types).to.be.an('array').and.not.be.empty;
    });
  });

  it('Reto 2: Validar múltiples Pokémon de forma parametrizada', () => {
    // Iteramos sobre cada objeto del archivo pokemons.json
    pokemons.forEach((pokemon) => {
      // Si prefieres usar tu Mock Server de Postman, puedes concatenar la variable, 
      // o usar directamente la URL pública de la API:
      cy.request(`https://993b1a51-dd4b-4578-a07b-8c0e8b2a86d6.mock.pstmn.io/api/v2/pokemon/${pokemon.name}`).then((response) => {
        
        // Aserciones claras y relevantes
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(pokemon.name);
        expect(response.body.id).to.eq(pokemon.id);
        expect(response.body.abilities).to.be.an('array').and.not.be.empty;
        expect(response.body.types).to.be.an('array').and.not.be.empty;
        });
      });
    });

    it('Reto 3: Validar escenario negativo con un Pokémon inexistente', () => {
    // Usamos el mock o la ruta simulada para el recurso inexistente
    const mockUrlInexistente = 'https://993b1a51-dd4b-4578-a07b-8c0e8b2a86d6.mock.pstmn.io/pokemoninexistente123';

    cy.request({
      method: 'GET',
      url: mockUrlInexistente,
      failOnStatusCode: false // Vital para evitar que Cypress falle automáticamente al recibir un 404
    }).then((response) => {
      // Validamos que el código HTTP sea 404
      expect(response.status).to.eq(404);
      
      // Opcional: validar que el flujo continuó de forma segura y controlada
      cy.log('El escenario negativo se manejó correctamente sin romper la ejecución');
    });
  });
  });

it('Reto 4: Validar información relacionada utilizando URLs de la primera respuesta', () => {
    // 1. Primera petición al Pokémon usando el Mock Server
    cy.request('https://993b1a51-dd4b-4578-a07b-8c0e8b2a86d6.mock.pstmn.io/api/v2/pokemon/pikachu').then((response) => {
      expect(response.status).to.eq(200);

      const originalAbilityUrl = response.body.abilities[0].ability.url; // Ej: https://pokeapi.co/api/v2/ability/9/
      const expectedAbilityName = response.body.abilities[0].ability.name;

      // Transformamos la URL oficial para que apunte a nuestro Mock Server de Postman
      // Reemplazamos el dominio base de la pokeapi por el dominio de nuestro Mock
      const mockAbilityUrl = originalAbilityUrl.replace('https://pokeapi.co', 'https://993b1a51-dd4b-4578-a07b-8c0e8b2a86d6.mock.pstmn.io');

      // 2. Segunda petición utilizando la URL adaptada al Mock
      cy.request(mockAbilityUrl).then((abilityResponse) => {
        // 3. Aserciones de validación y consistencia
        expect(abilityResponse.status).to.eq(200);
        expect(abilityResponse.body.name).to.eq(expectedAbilityName);
        
        cy.log(`Información relacionada validada con éxito para la habilidad: ${expectedAbilityName}`);
      });
    });
  }); 