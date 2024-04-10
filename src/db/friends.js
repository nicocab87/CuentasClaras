const UserModel = require("../models/user");

class FriendManager {
    
    async addFriend(userId, newFriends){
        const user = await UserModel.findById(userId)
        const updatedUser = user.friends.concat(newFriends)
        const data = await UserModel.updateOne({_id:user}, {friends:updatedUser});
        return data
    }

    async deleteFriend(userId, idFriend) {
        const user = await UserModel.findById(userId);

        const updatedFriends = user.friends.filter(friend => friend._id.toString() !== idFriend );
        const data = await UserModel.updateOne({ _id: userId }, { friends: updatedFriends });
        return data;
    }

    async getFriends(userId){
        const user = await UserModel.findById(userId).lean()
        if(!user){
            return console.error('No se ha encontrado el usuario')
        }
        const data = user.friends
        return data
    }
}


const friendManager = new FriendManager();
module.exports = friendManager