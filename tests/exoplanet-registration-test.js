const request = require('supertest');
const app = require('../app');

describe('Planet Registration', () => {
  it('should not allow duplicate planet names', async () => {
    await request(app).post('/exoplanets').send({ name: 'Earth' });
    const response = await request(app).post('/exoplanets').send({ name: 'Earth' });
    expect(response.status).toBe(400);
  });

  it('should validate planet characteristics', async () => {
    const response = await request(app).post('/exoplanets').send({
      name: 'NewPlanet',
      size: -1,
    });
    expect(response.status).toBe(400);
  });
});
