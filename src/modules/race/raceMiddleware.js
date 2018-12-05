const mongoose = require('mongoose');
const Race = mongoose.model('Race');
const Character = mongoose.model('Character');
const eFunc = require('./raceFunctions');
const _ = require('lodash');

class raceMiddleware {

    static loadRaceFromParameters(req, res, next, id) {
        eFunc.getRaceById(id).then(function(chara) {
            req.data.race= chara;
            next();
        }, err => next(err));
    };

    static displayAllRaces(req,res,next){
        eFunc.getAllRaces().then( function (all) {
            res.send(all);
        }, err => next(err));
    }

    static displayAnRace(req, res, next) {
        if (!(req.data.race)) {
            return next({
                message: "Cet race n'existe pas (ou plus) !",
                status: 404
            });
        }
        res.send(req.data.race);
    }

    static createAnRace(req, res, next) {
        const race = new Race(
            req.body
        );
        race.save(function (err, raceSaved) {
                if (err) {
                    next(err);
                }
                res.send(raceSaved);
            }
        );
    }

    static modifyAnRace(req, res, next) {
        req.data.race= _.extend(req.data.race, req.body);
        req.data.race.save((err, raceUpdated) => {
            if(err) {
                return next(err);
            }
            else {
                res.send(raceUpdated);
            }
        });
    }

    static deleteAnRace(req, res, next) {
        req.data.race.delete((err, info) => {
            if (err) return next(err);
            res.send({
                message: "Cet race a été supprimé. "
            });
        });
    }

    static getAllCharacters(req,res,next){
        Character.find({"race": req.data.race}, function(err, all) {
            if(err){
                next(err);
            }
            res.send(all);
        })
    }
}

module.exports = raceMiddleware;