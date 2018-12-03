const mongoose = require('mongoose');
const group = mongoose.model('Group');

class groupFunctions {

    static getGroupById(id) {
        return new Promise(function (resolve, reject) {
            group.find({"_id": id}, function (err, groups) {
                if (err) {
                    reject(err);
                }
                return resolve(groups[0]);
            });
        })
    };


    static getAllGroups() {
        return new Promise(function (resolve, reject) {
            group.find({}, function (err, allGroups) {
                if (err) {
                    reject(err);
                }
                resolve(allGroups);
            });
        })
    }
}

module.exports=groupFunctions;