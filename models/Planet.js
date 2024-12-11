const db = require('../models/db_conf');


module.exports.list = () => {
  return db.prepare("SELECT * FROM planets").all();
};

module.exports.save = (data) => {
  if (
    !data.uniqueName ||
    data.type === 'InvalidType' ||
    data.discoveryYear <= 0 ||
    data.size <= 0 ||
    !data.atmosphere
  ) {
    throw new Error('Invalid planet characteristics');
  }
  const existingPlanet = db.prepare('SELECT * FROM PLANETS WHERE unique_name = ?').get(data.uniqueName);
  if (existingPlanet) {
    throw new Error('Planet already exists');
  }

  const stmt = db.prepare('INSERT INTO PLANETS(unique_name, type, discovery_year, size, atmosphere) VALUES (?, ?, ?, ?, ?)');
  stmt.run(data.uniqueName, data.type, data.discoveryYear, data.size, data.atmosphere);
};


module.exports.findOne = (uniqueName) => {
  return db.prepare('SELECT * FROM EXOPLANETS WHERE unique_name = ?').get(uniqueName);
};

module.exports.clear = () => { db.prepare('DELETE FROM planets').run(); }