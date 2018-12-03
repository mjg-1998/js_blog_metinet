const mongoose = require('mongoose');
const Character = mongoose.model('Character');
const cFunc = require('./characterFunctions');
const _ = require('lodash');

class characterMiddleware {

    static loadCharacterFromParameters(req, res, next, charaId) {
       cFunc.getCharacterById(charaId).then(function(chara) {
           req.data.chara = chara;
           next();
       }, err => next(err));
    };

    static displayAllCharacters(req,res,next){
        cFunc.getAllCharacters().then( function (all) {
            res.send(all);
        }, err => next(err));
    }

    static displayACharacter(req, res, next) {
        if (!(req.data.chara)) {
            return next({
                message: "Ce personnage n'existe pas (ou plus) !",
                status: 404
            });
        }
        res.send(req.data.chara);
    }

    static createACharacter(req, res, next) {
        const chara = new Character(
            req.body
        );
        chara.save(function (err, characterSaved) {
                if (err) {
                    next(err);
                }
                res.send(characterSaved);
            }
        );
    }

    static modifyACharacter(req, res, next) {
        req.data.chara = _.extend(req.data.chara, req.body);
        req.data.chara.save((err, charaUpdated) => {
            if(err) {
                return next(err);
            }
            else {
                res.send(charaUpdated);
            }
        });
    }

    static deleteACharacter(req, res, next) {
        req.data.chara.delete((err, info) => {
            if (err) return next(err);
            res.send({
                message: "Le personnage a été supprimé. "
            });
        });
    }
}

module.exports = characterMiddleware;