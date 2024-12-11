const app = require('../app'); // Remplacez par votre fichier principal
const request = require('supertest');

describe("Planet Registration", () => {
  it("should reject if planet already exists", async (done) => {
    const response = await request(app)
      .post('/planets')
      .send({ name: 'Mars', size: 6792, atmosphere: 'CO2', type: 'Rocky' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Planet already exists');
    done();
  });

  it("should reject if planet characteristics are invalid", async (done) => {
    const response = await request(app)
      .post('/planets')
      .send({ name: 'NewPlanet', size: -1000 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid planet characteristics');
    done();
  });

  it("should add a new planet if data is valid", async (done) => {
    const response = await request(app)
      .post('/planets')
      .send({ name: 'NewPlanet', size: 5000, atmosphere: 'Oxygen', type: 'Rocky' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Planet added successfully');
    done();
  });
});
