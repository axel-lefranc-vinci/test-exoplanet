const Planet = require('../../models/Planet');

describe('Planet Model', () => {
  beforeEach(() => {
    // Réinitialise avant chaque test
    Planet.clear();
  });

  afterAll(() => {
    // Réinitialise après tous les tests
    Planet.clear();
  });

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

    const found = planets.some(p => p.unique_name === 'Earth');
    expect(found).toBeTrue();
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
    expect(() => {
      Planet.save(planet);
    }).toThrow(new Error('Planet already exists'));
  });

  it('Test 3: ne doit pas enregistrer des caractéristiques invalides', () => {
    const invalidPlanet = {
      uniqueName: 'Invalid',
      type: 'InvalidType',
      discoveryYear: -1,
      size: -10,
      atmosphere: '',
    };

    expect(() => {
      Planet.save(invalidPlanet);
    }).toThrow(new Error('Invalid planet characteristics'));
  });

  it('Test 4: Mock de la fonction findOne', () => {
    spyOn(Planet, 'findOne').and.returnValue({ unique_name: 'Earth' });
    const result = Planet.findOne('Earth');
    expect(result).toEqual({ unique_name: 'Earth' });
  });

  it('Test 5: Mock de la fonction save', () => {
    spyOn(Planet, 'save').and.callFake((data) => {
      console.log('Mock Save Called with:', data);
    });
    Planet.save({
      uniqueName: 'Mars',
      type: 'Gazeuse',
      discoveryYear: 2024,
      size: 6787,
      atmosphere: 'Ténue',
    });
    expect(Planet.save).toHaveBeenCalledWith({
      uniqueName: 'Mars',
      type: 'Gazeuse',
      discoveryYear: 2024,
      size: 6787,
      atmosphere: 'Ténue',
    });
  });
});
