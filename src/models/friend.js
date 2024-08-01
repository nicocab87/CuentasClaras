const {mongoose} = require("mongoose");

const friendSchema = new mongoose.Schema({
    name: String,
    money: Number
})


const FriendModel = mongoose.model('friend', friendSchema)    

module.exports = FriendModel
