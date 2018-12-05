const mongoose = require('mongoose');
const race = mongoose.model('Race');
const character = mongoose.model('Character');

class raceFunctions {

    static getRaceById(id) {
        return new Promise(function (resolve, reject) {
            race.find({"_id": id}, function (err, races) {
                if (err) {
                    reject(err);
                }
                return resolve(races[0]);
            });
        })
    };

    static getCharasByRaceId(id) {
        return new Promise(function (resolve, reject) {
            character.find({"race": id}, function (err, charas) {
                if (err) {
                    reject(err);
                }
                return resolve(charas);
            });
        })
    };


    static getAllRaces() {
        return new Promise(function (resolve, reject) {
            race.find({}, function (err, allCharacters) {
                if (err) {
                    reject(err);
                }
                resolve(allCharacters);
            });
        })
    }
}

module.exports=raceFunctions;