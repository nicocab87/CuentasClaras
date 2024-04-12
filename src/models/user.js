const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: String,
    password: String,
    age: Number,
    moments: {
        type: [{
            moment:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'moment'
            }
        }]
    }
})

const UserModel = mongoose.model('user', userSchema)    

module.exports = UserModel