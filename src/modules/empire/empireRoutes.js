const express = require('express');
const router = express.Router();
const eMiddleware = require('./empireMiddleware');
router.param('empireId', eMiddleware.loadEmpireFromParameters);

router.route('/')
    .get(eMiddleware.displayAllEmpires)
    .post(eMiddleware.createAnEmpire);

router
    .get('/:empireId', eMiddleware.displayAnEmpire)
    .put('/:empireId', eMiddleware.modifyAnEmpire)
    .delete('/:empireId', eMiddleware.deleteAnEmpire);

module.exports = router;
