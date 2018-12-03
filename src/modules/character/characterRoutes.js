const express = require('express');
const router = express.Router();
const cMiddleware = require('./characterMiddleware');
router.param('charaID', cMiddleware.loadCharacterFromParameters);

router.route('/')
    .get(cMiddleware.displayAllCharacters)
    .post(cMiddleware.createACharacter);

router
    .get('/:charaId',)

module.exports = router;