const MomentModel = require("../models/moment");
const UserModel = require("../models/user");

class MomentManager{

    async createMoment(userId, momentName){
        const moment = await MomentModel.create(momentName)
        const user = await UserModel.findById(userId)

        user.moments.push(moment._id)
        const data = await UserModel.updateOne({_id:user}, user);
        return data
    }

    async deleteMoment(idMoment, idUser){   
        try {
            const moment = await MomentModel.deletOne({_id: idMoment});
            if(!moment){
                return console.error('No se ha eliminado el momento')
            }
            const user = await UserModel.findById(idUser);
            const updatedMoment = user.moments.filter(moment=> moment._id.toString() !== idMoment );
            const data = await UserModel.updateOne({ _id: idUser }, { moments: updatedMoment });
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    async getMoments(id){
        const data = await UserModel.find({_id:id}).populate('moments')
        const dataMoment = data[0].moments
        return dataMoment
    }

    async getMomentById(id){
        const data = await MomentModel.find({_id:id}).populate('moments');
        return data
    }

    async updateMoment(id, update){
        //const moment = momentManager.getMomentById(id)
        const data = await MomentModel.updateOne({_id:id}, {friends:update})
        return data
    }
}

const momentManager = new MomentManager();
module.exports = momentManager