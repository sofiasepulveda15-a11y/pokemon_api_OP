describe('Pruebas de la API de Pokemon', () => {
  let pokemons; //Variable para almacenar datos de pokemones. Se utiliza para los diferentes retos. Se utiliza let para permitir reasignar valor

  const getFirstAbility = (pokemonBody) => {
    return {
      url: pokemonBody.abilities[0].ability.url,
      name: pokemonBody.abilities[0].ability.name
    };
  };
  // Carga el archivo de datos json antes de ejecutar las pruebas
  before(() => {
    cy.fixture('pokemon.json').then((data) => {
      pokemons = data;
    });
  });

  it('Reto 1 Consulta exitosa de un Pokemon', () => {
    //Se elige pikachu como pokemon existente
    const primerPokemon = pokemons[0];
    cy.request(`/api/v2/pokemon/${primerPokemon.name}`).then((response) => {
      //Validaciones de pokemon
      cy.validarEstructuraPokemon(response, primerPokemon);
    });
  });

  it('Reto 2 Validación de múltiples Pokemon', () => {
    // Se realiza sobre cada objeto del archivo pokemons.json
    pokemons.forEach((pokemon) => {
      //Se coloca la URL con variable
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
      //Código HTTP 404.
      expect(response.status).to.eq(404);
      cy.log('El escenario negativo no provocó una falla inesperada en la ejecución de Cypress.');
    });
  });


  it('Reto 4 Validación de información relacionada', () => {

    cy.fixture('pokemon').then((pokemonList) => {
      pokemonList.forEach((pokeData) => {
        // Primera petición al Pokemon 
        cy.request(`/api/v2/pokemon/${pokeData.name}`).then((response) => {

          //Se valida que la primera petición fue exitosa
          cy.validarEstructuraPokemon(response, pokeData)

          //Se obtiene de la respuesta del primer request, la URL del segundo request y el nombre de esa habilidad
          const abilityInfo = getFirstAbility(response.body);

          // Transformamos la URL oficial para que apunte a nuestro Mock Server de Postman
          // Reemplazamos el dominio base de la pokeapi por el dominio de nuestro Mock
          const mockAbilityUrl = abilityInfo.url.replace('https://pokeapi.co', 'https://993b1a51-dd4b-4578-a07b-8c0e8b2a86d6.mock.pstmn.io');

          // Segunda petición de habilidades
          cy.request(mockAbilityUrl).then((abilityResponse) => {
            // Se valida respuesta exitosa de segunda petición
            expect(abilityResponse.status).to.eq(200);
            //Se valida que se obtuvo la habilidad obtenida desde el primer request
            expect(abilityResponse.body.name).to.eq(abilityInfo.name);
            cy.log(`Información relacionada validada con éxito para el pokemon: ${response.body.name} y la habilidad: ${abilityInfo.name}`);
          });
        });
      });
    });
  });
});
