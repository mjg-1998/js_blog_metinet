const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const Character = mongoose.model('Character');
const gFunc = require('./groupFunctions');
const _ = require('lodash');

class groupMiddleware {

    static loadGroupFromParameters(req, res, next, id) {
        gFunc.getGroupById(id).then(function(group) {
            req.data.groupe= group;
            next();
        }, err => next(err));
    };

    static displayAllGroups(req,res,next){
        gFunc.getAllGroups().then( function (all) {
            res.send(all);
        }, err => next(err));
    }

    static displayAGroup(req, res, next) {
        if (!(req.data.groupe)) {
            return next({
                message: "Ce groupe n'existe pas (ou plus) !",
                status: 404
            });
        }
        res.send(req.data.groupe);
    }

    static createAGroup(req, res, next) {
        const group = new Group(
            req.body
        );
        group.save(function (err, groupSaved) {
                if (err) {
                    next(err);
                }
                res.send(groupSaved);
            }
        );
    }

    static modifyAGroup(req, res, next) {
        req.data.groupe= _.extend(req.data.groupe, req.body);
        req.data.groupe.save((err, groupUpdated) => {
            if(err) {
                return next(err);
            }
            else {
                res.send(groupUpdated);
            }
        });
    }

    static deleteAGroup(req, res, next) {
        req.data.groupe.delete((err, info) => {
            if (err) return next(err);
            res.send({
                message: "Ce groupe a été supprimé. "
            });
        });
    }

    static getAllCharacters(req,res,next){
        Character.find({"mainGroup": req.data.groupe}, function(err, all) {
            if(err){
                next(err);
            }
            res.send(all);
        })
    }
}

module.exports = groupMiddleware;