const Planet = require('../../models/Planet');
const httpMocks = require('node-mocks-http');
const router = require('../../routes/planets');

describe('Planet Routes', () => {
  beforeEach(() => {
    spyOn(Planet, 'save');
  });

  it('should add a planet when data is valid', () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/add',
      body: {
        uniqueNamePlanet: 'Earth',
        hClassPlanet: 'Rocky',
        discoveryYearPlanet: 2023,
      },
    });
    const res = httpMocks.createResponse();

    router.handle(req, res);

    expect(res.statusCode).toBe(302);
    expect(Planet.save).toHaveBeenCalledWith(
      jasmine.objectContaining({
        uniqueName: 'Earth',
        hClass: 'Rocky',
        discoveryYear: 2023,
      })
    );
  });
});
