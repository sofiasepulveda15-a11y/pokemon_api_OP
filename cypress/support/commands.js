// Comando para validar respuestas base de Pokemon
Cypress.Commands.add('validarEstructuraPokemon', (response, expectedPokemon) => {
    //Código HTTP 200.
    expect(response.status).to.eq(200);
    //El nombre corresponde al Pokémon solicitado.
    expect(response.body.name).to.eq(expectedPokemon.name);
    //El identificador (id) es válido .
    expect(response.body.id).to.eq(expectedPokemon.id);
    //La respuesta contiene habilidades (abilities)y se valida la estructura en el JSON
    expect(response.body).to.have.property('abilities').that.is.an('array').and.is.not.empty;
    //La respuesta contiene tipos (types) y se valida la estructura en el JSON
    expect(response.body.types).to.be.an('array').and.not.be.empty;
});