describe('Pruebas de la API de Pokemon', () => {
  let pokemons; //Variable para almacenar datos de pokemones. Se utiliza let para permitir reasignar valor

  const getFirstAbility = (pokemonBody) => {
    return {
      url: pokemonBody.abilities[0].ability.url,
      name: pokemonBody.abilities[0].ability.name
    };
  };
  // Carga el archivo de datos json
  before(() => {
    cy.fixture('pokemon.json').then((data) => {
      pokemons = data;
    });
  });

  it('Reto 1 Consulta exitosa de un Pokemon', () => {
    
    const primerPokemon = pokemons[0]; //Se elige pikachu como pokemon existente
    cy.request(`/api/v2/pokemon/${primerPokemon.name}`).then((response) => {
      //Validaciones de pokemon
      cy.validarEstructuraPokemon(response, primerPokemon);
    });
  });

  it('Reto 2 Validación de múltiples Pokemon', () => {
    // Se realiza sobre cada objeto del archivo pokemons.json
    pokemons.forEach((pokemon) => {
      cy.request(`/api/v2/pokemon/${pokemon.name}`).then((response) => {
        //Validaciones de pokemon
        cy.validarEstructuraPokemon(response, pokemon)
      });
    });
  });

  it('Reto 3 Escenario negativo (Pokemon inexistente)', () => {

    cy.request({
      method: 'GET',
      url: '/pokemoninexistente123',
      failOnStatusCode: false // Evita que Cypress falle al recibir el código 404. La aplicación de pruebas maneja correctamente la respuesta de error.
    }).then((response) => {
      expect(response.status).to.eq(404);
      cy.log('El escenario negativo no provocó una falla inesperada en la ejecución de Cypress.');
    });
  });


  it('Reto 4 Validación de información relacionada', () => {

    cy.fixture('pokemon').then((pokemonList) => {
      pokemonList.forEach((pokeData) => {
        // Primera petición de Pokemon 
        cy.request(`/api/v2/pokemon/${pokeData.name}`).then((response) => {
          cy.validarEstructuraPokemon(response, pokeData)

          //Se obtiene de la respuesta del primer request, la URL del segundo request y el nombre de esa habilidad
          const abilityInfo = getFirstAbility(response.body);

          // Segunda petición de habilidades
          cy.request(abilityInfo.url).then((abilityResponse) => {
            // Se valida respuesta exitosa de segunda petición
            expect(abilityResponse.status).to.eq(200);
            expect(abilityResponse.body.name).to.eq(abilityInfo.name); //Se valida que se obtuvo la habilidad obtenida desde el primer request
            cy.log(`Información relacionada validada con éxito para el pokemon: ${response.body.name} y la habilidad: ${abilityInfo.name}`);
          });
        });
      });
    });
  });
});
