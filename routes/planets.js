const express = require('express');
const router = express.Router();

const Planet = require("../models/Planet.js");



router.get('/', function (req, res, next) {
    const planetsTable = Planet.list();
    res.render('planets/index.hbs', { planetsTable});
});

router.post('/add', function (req, res, next) {
    console.log("POST ADD PLANET");
    console.log(req.body);
        Planet.save({
            id : req.body.idPlanet,
            uniqueName: req.body.uniqueNamePlanet,
            type: req.body.typePlanet,
            discoveryYear: req.body.discoveryYearPlanet,
            size: req.body.sizePlanet,
            atmosphere: req.body.atmospherePlanet
        
        });
        res.redirect('/planets');
})


router.post('/test', function (req, res, next) {
    console.log("POST ADD PLANET");
    console.log(req.body);
})
        

/*router.post('/planets', async (req, res) => {
    const { name, size, atmosphere } = req.body;
  
    // Vérification de la duplication
    const exists = await Planet.findOne({ where: { name } });
    if (exists) return res.status(400).send('Planet already exists');
  
    // Validation des caractéristiques
    if (size <= 0) return res.status(400).send('Invalid planet size');
  
    // Ajout de la planète
    await Planet.create({ name, size, atmosphere });
    res.render('exoplanets/register', { message: 'Planet added successfully' });
});*/
  


module.exports = router;