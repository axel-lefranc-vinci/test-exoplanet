const Planet = require('../../models/Planet');

describe('Planet Model', () => {

  it('Test 1: doit enregistrer une nouvelle planète', () => {
    const planet = {
      uniqueName: 'Earth',
      type: 'Gazeuse',
      discoveryYear: 2023,
      size: 12742,
      atmosphere: 'Ténue',
    };
  
    Planet.save(planet);
    const planets = Planet.list();
    expect(planets).toEqual([
      jasmine.objectContaining({
        unique_name: 'Earth',
        type: 'Gazeuse',
        discovery_year: 2023,
        size: 12742,
        atmosphere: 'Ténue',
      }),
    ]);
  });
  

  it('Test 2: ne doit pas enregistrer de doublons', () => {
    const planet = {
      uniqueName: 'Earth',
      type: 'Gazeuse',
      discoveryYear: 2023,
      size: 12742,
      atmosphere: 'Ténue',
    };

    Planet.save(planet);
    try {
      Planet.save(planet);
    } catch (error) {
      expect(error.message).toEqual('Planet already exists');
    }
  });

  it('Test 3: ne doit pas enregistrer des caractéristiques invalides', () => {
    const invalidPlanet = {
      uniqueName: 'Invalid',
      type: 'InvalidType',
      discoveryYear: -1,
      size: -10,
      atmosphere: '',
    };

    try {
      Planet.save(invalidPlanet);
    } catch (error) {
      expect(error.message).toEqual('Invalid planet type');
    }
  });


  it('Test 4: Mock de la fonction save', () => {
    spyOn(Planet, 'save').and.callFake((data) => {
      console.log('Mock Save Called with:', data);
    });
    const planet = {
      uniqueName: 'Mars',
      type: 'Gazeuse',
      discoveryYear: 2024,
      size: 6787,
      atmosphere: 'CO2',
    };

    Planet.save(planet);
    expect(Planet.save).toHaveBeenCalledWith(planet);
  });
});
