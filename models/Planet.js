const db = require('../models/db_conf');


module.exports.list = () => {
  return db.prepare("SELECT * FROM planets").all();
};

module.exports.save = (data) => {
  console.log(data);
      const stmt = db.prepare('INSERT INTO PLANETS(planet_id, unique_name, type, discovery_year, size, atmosphere) VALUES (?, ?, ?, ?, ?, ?)');
      const info = stmt.run(data.id, data.uniqueName, data.type, data.discoveryYear, data.size, data.atmosphere);
      console.log("planet model save" + info.changes);
      
  };

/*module.exports = {
  save: (data) => {
    console.log("SAVE :" + JSON.stringify(data));
    // Si pas d'id => ajouter une planète
    if (data.id === undefined) {
      const stmt = db.prepare('INSERT INTO PLANETS(unique_name, hclass, discovery_year, image) VALUES (?, ?, ?, ?)');
      const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear, data.image);
      console.log("Planet model save add:" + info.changes);
    } else {
      // Si un id est présent => mettre à jour la planète
      const stmt = db.prepare('UPDATE PLANETS SET unique_name = ?, hclass = ?, discovery_year = ?, ist = ?, pclass = ? WHERE planet_id = ?');
      const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear, data.IST, data.pClass, data.id);
      console.log("Planet model save update:" + info.changes);
    }
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT * FROM PLANETS WHERE planet_id = ?');
    return stmt.get(id);
  },

  list: () => {
    const stmt = db.prepare('SELECT * FROM PLANETS');
    return stmt.all();
  },

  search: (name) => {
    const stmt = db.prepare('SELECT * FROM PLANETS WHERE unique_name LIKE ?');
    return stmt.all(`%${name}%`);
  },

  delete: (id) => {
    const stmt = db.prepare('DELETE FROM PLANETS WHERE planet_id = ?');
    const info = stmt.run(id);
    console.log("Planet model delete:" + info.changes);
  },
  
};*/

module.exports.findOne = (uniqueName) => {
  return db.prepare('SELECT * FROM EXOPLANETS WHERE unique_name = ?').get(uniqueName);
};