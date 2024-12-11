const db = require('../models/db_conf');

module.exports.list = () => {
  return db.prepare('SELECT * FROM planets').all();
};

module.exports.save = (data) => {
  // Vérification des caractéristiques
  if (!data.uniqueName || typeof data.uniqueName !== 'string') {
    throw new Error('Invalid planet name');
  }

  if (!['Gazeuse', 'Glacée', 'Naine', 'Exotique'].includes(data.type)) {
    throw new Error('Invalid planet type');
  }

  if (!['Dense', 'Ténue', 'Sans atmosphère'].includes(data.atmosphere)) {
    throw new Error('Invalid planet atmosphere');
  }

  if (data.discoveryYear <= 0 || typeof data.discoveryYear !== 'number') {
    throw new Error('Invalid discovery year');
  }

  if (data.size <= 0 || typeof data.size !== 'number') {
    throw new Error('Invalid planet size');
  }

  // Vérification des doublons
  const existingPlanet = db.prepare('SELECT * FROM planets WHERE unique_name = ?').get(data.uniqueName);
  if (existingPlanet) {
    throw new Error('Planet already exists');
  }

  // Insertion
  const stmt = db.prepare('INSERT INTO PLANETS(unique_name, type, discovery_year, size, atmosphere) VALUES (?, ?, ?, ?, ?)');
  stmt.run(data.uniqueName, data.type, data.discoveryYear, data.size, data.atmosphere);
};

module.exports.clear = () => {
  db.exec('DELETE FROM PLANETS');
};
