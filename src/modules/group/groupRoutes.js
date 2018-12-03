const express = require('express');
const router = express.Router();
const gMiddleware = require('./groupMiddleware');
router.param('groupId', gMiddleware.loadGroupFromParameters);

router.route('/')
    .get(gMiddleware.displayAllGroups)
    .post(gMiddleware.createAGroup);

router
    .get('/:groupId', gMiddleware.displayAGroup)
    .put('/:groupId', gMiddleware.modifyAGroup)
    .delete('/:groupId', gMiddleware.deleteAGroup);

module.exports = router;
