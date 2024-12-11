const Planet = require('../../models/Planet');

// Groupe les tests du modèle Planet
describe('Planet Model', () => {
  beforeEach(() => {
    Planet.clear(); // Réinitialisation avant chaque test
  });

  // Cas de test : sauvegarder une nouvelle planète
  it('should save a new planet', () => {
    const planet = { uniqueName: 'Earth', hClass: 'Rocky', discoveryYear: 2023, image: null };
    Planet.save(planet);

    const planets = Planet.list();
    expect(planets).toContainEqual(expect.objectContaining({ uniqueName: 'Earth' }));
  });

  // Cas de test : empêcher les doublons
  it('should not save a planet with duplicate name', () => {
    const planet = { uniqueName: 'Earth', hClass: 'Rocky', discoveryYear: 2023, image: null };
    Planet.save(planet);

    expect(() => {
      Planet.save(planet);
    }).toThrow('Planet already exists');
  });
});
