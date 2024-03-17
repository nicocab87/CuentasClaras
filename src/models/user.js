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
    email: String,
    password: String,
    age: Number,
    friends: {
        type: [friendSchema],
        default: []
    }
})

const UserModel = mongoose.model('user', userSchema)    

module.exports = UserModel