const express = require('express');
const router = express.Router();
const eMiddleware = require('./raceMiddleware');
router.param('raceId', eMiddleware.loadRaceFromParameters);

router.route('/')
    .get(eMiddleware.displayAllRaces)
    .post(eMiddleware.createAnRace);

router
    .get('/:raceId', eMiddleware.displayAnRace)
    .put('/:raceId', eMiddleware.modifyAnRace)
    .delete('/:raceId', eMiddleware.deleteAnRace);

module.exports = router;
