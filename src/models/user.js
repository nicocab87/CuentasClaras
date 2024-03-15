const { mongoose } = require("mongoose");

const friendSchema = new mongoose.Schema({
    name: String,
    money: Number
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    friends: {
        type: [friendSchema],
        default: []
    }
})

const UserModel = mongoose.model('user', userSchema)    

module.exports = UserModel