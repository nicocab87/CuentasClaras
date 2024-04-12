const mongoose = require('mongoose');
const FriendModel = require ('../models/friend');
const momentManager = require('./moments');

class FriendManager {
    
    async addFriend(momentId, newFriends){
        const friend = await FriendModel.create(newFriends)
        const moment = await momentManager.getMomentById(momentId)

        moment.friends.push(friend._id)
        console.log(moment)
        const data = await momentManager.updateMoment(momentId, moment)
        return data
    }

    async deleteFriend(momentId, idFriend) {

        const moment = await momentManager.getMomentById(momentId)

        const updatedMoment = moment[0].friends.filter(m => m._id.toString() !== idFriend);
        const data = await momentManager.updateMoment(momentId, updatedMoment)
        console.log(data, 'data')
        return data;
    }

    async getFriends(momentId){
        const data = await momentManager.getMomentById(momentId)
        console.log(data)
        const friend = data.friends
        if(!data){
            return console.error('El ID no coincide con ningún momento')
        }
        return friend
    }
}


const friendManager = new FriendManager();
module.exports = friendManager