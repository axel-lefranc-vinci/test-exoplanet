const db = require('../models/db_conf');


module.exports.list = () => {
  return db.prepare("SELECT * FROM planets").all();
};

module.exports.save = (data) => {
  console.log(data);
      const stmt = db.prepare('INSERT INTO PLANETS(unique_name, type, discovery_year, size, atmosphere) VALUES (?, ?, ?, ?, ?)');
      const info = stmt.run(data.uniqueName, data.type, data.discoveryYear, data.size, data.atmosphere);
      console.log("planet model save" + info.changes);
};

module.exports.findOne = (uniqueName) => {
  return db.prepare('SELECT * FROM EXOPLANETS WHERE unique_name = ?').get(uniqueName);
};

module.exports.clear = () => { db.prepare('DELETE FROM planets').run(); }