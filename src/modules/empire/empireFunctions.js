const mongoose = require('mongoose');
const empire = mongoose.model('Empire');

class empireFunctions {

    static getEmpireById(id) {
        return new Promise(function (resolve, reject) {
            empire.find({"_id": id}, function (err, empires) {
                if (err) {
                    reject(err);
                }
                return resolve(empires[0]);
            });
        })
    };


    static getAllEmpires() {
        return new Promise(function (resolve, reject) {
            empire.find({}, function (err, allCharacters) {
                if (err) {
                    reject(err);
                }
                resolve(allCharacters);
            });
        })
    }
}

module.exports=empireFunctions;