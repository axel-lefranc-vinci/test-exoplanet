const express = require('express');
const router = express.Router();

const Planet = require("../models/Planet.js");



router.get('/', function (req, res, next) {
    const planetsTable = Planet.list();
    res.render('planets/index.hbs', { planetsTable});
});

router.post('/add', function (req, res, next) {
    console.log("POST ADD PLANET");
    
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

})
    
module.exports = router;