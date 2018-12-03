const mongoose = require('mongoose');
const Character = mongoose.model('character');
const cFunc = require('./characterFunctions');


class characterMiddleware {

    static loadCharacterFromParameters(req, res, next, charaId) {
       cFunc.getCharacterById(charaId).then(function(chara) {
           req.data.character = chara;
           next(); }, err =>next(err));
    }

    static displayAllCharacters(req,res,next){
        cFunc.getAllCharacters().then( function (all) {
            res.send(all);
        }, err => next(err));
    }

    static displayACharacter(req, res, next) {
        if (!req.data.character) {
            return next({
                message: "Ce personnage n'existe pas (ou plus) !",
                status: 404
            });
        }
        res.send(req.data.character);
    }

    static createACharacter(req, res, next) {
        const character = new Character(
            req.body
        );
        character.save(function (err, characterSaved) {
                if (err) {
                    next(err);
                }
                res.send(characterSaved);
            }
        );
    }
}

module.exports = characterMiddleware;