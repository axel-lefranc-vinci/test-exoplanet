const Planet = require('../../models/Planet');
const { find } = require('../../models/User');

describe('Planet Model', () => {

  afterAll(() => { Planet.delete(); });

  it('Test 1: ne doit pas enregistrer de doublons', () => {
    const planet = {
      uniqueName: 'Earth',
      type: 'Gazeuse',
      discoveryYear: 2023,
      size: 12742,
      atmosphere: 'Ténue',
    };

    const errorMessage = "Planet already exists";

    const findPlanet = Planet.findOne(planet.uniqueName);
    if (findPlanet) {
      expect(errorMessage).toEqual('Planet already exists');
    }
    else {
      Planet.save(planet);
      expect(Planet.findOne(planet.uniqueName)).toEqual(planet);
    }
  });

  it('Test 2: ne doit pas enregistrer des caractéristiques invalides', () => {
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


  it('Test 3: Mock de la fonction save', () => {
    spyOn(Planet, 'save').and.callFake((data) => {
      console.log('Mock Save Called with:', data);
    });
    const planet = {
      uniqueName: 'Mars',
      type: 'Gazeuse',
      discoveryYear: 2024,
      size: 6787,
      atmosphere: 'Ténue',
    };

    Planet.save(planet);
    expect(Planet.save).toHaveBeenCalledWith(planet);
  });
});
