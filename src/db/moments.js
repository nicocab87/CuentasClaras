const MomentModel = require("../models/moment");
const UserModel = require("../models/user");

class MomentManager{

    async createMoment(){
        const moment = MomentModel.create()
        const user = await UserModel.findById(userId)

        const updatedUser = user.moment.concat(moment._id)
        const data = await UserModel.updateOne({_id:user}, {moment: updatedUser});

        return data
    }

    async deleteMoment(idMoment){       
        return await MomentModel.deletOne({_id: idMoment});
    }

    
}

const momentManager = new MomentManager();
module.exports = momentManager