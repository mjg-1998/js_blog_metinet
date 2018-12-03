const express = require('express');
const router = express.Router();
const cMiddleware = require('./characterMiddleware');
router.param('charaId', cMiddleware.loadCharacterFromParameters);

router.route('/')
    .get(cMiddleware.displayAllCharacters)
    .post(cMiddleware.createACharacter);

router
    .get('/:charaId', cMiddleware.displayACharacter)
    .put('/:charaId', cMiddleware.modifyACharacter)
    .delete('/:charaId', cMiddleware.deleteACharacter);

module.exports = router;
