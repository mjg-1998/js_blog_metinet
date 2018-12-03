const mongoose = require('mongoose');
const Empire = mongoose.model('Empire');
const eFunc = require('./empireFunctions');
const _ = require('lodash');

class empireMiddleware {

    static loadEmpireFromParameters(req, res, next, id) {
        eFunc.getEmpireById(id).then(function(chara) {
            req.data.empire= chara;
            next();
        }, err => next(err));
    };

    static displayAllEmpires(req,res,next){
        eFunc.getAllEmpires().then( function (all) {
            res.send(all);
        }, err => next(err));
    }

    static displayAnEmpire(req, res, next) {
        if (!(req.data.empire)) {
            return next({
                message: "Cet empire n'existe pas (ou plus) !",
                status: 404
            });
        }
        res.send(req.data.empire);
    }

    static createAnEmpire(req, res, next) {
        const empire = new Empire(
            req.body
        );
        empire.save(function (err, empireSaved) {
                if (err) {
                    next(err);
                }
                res.send(empireSaved);
            }
        );
    }

    static modifyAnEmpire(req, res, next) {
        req.data.empire= _.extend(req.data.empire, req.body);
        req.data.empire.save((err, empireUpdated) => {
            if(err) {
                return next(err);
            }
            else {
                res.send(empireUpdated);
            }
        });
    }

    static deleteAnEmpire(req, res, next) {
        req.data.empire.delete((err, info) => {
            if (err) return next(err);
            res.send({
                message: "Cet empire a été supprimé. "
            });
        });
    }
}

module.exports = empireMiddleware;