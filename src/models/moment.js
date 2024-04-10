const {mongoose} = require("mongoose");

const MomentSchema = new mongoose.Schema({
    name: String,
    friends:{
        type: [{
            friend:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'friend'
            },
            default: []
        }],
    }
})


const MomentModel = mongoose.model('moment', MomentSchema)    

module.exports = MomentModel