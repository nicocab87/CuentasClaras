const UserModel = require("../models/user");

class UserManager {

    constructor(){
        console.log('New intance of user manager')
    };

    async createUser(userName){
        const user = await UserModel.create(userName);
        return user
    };

    async getUsers(){
        const data = UserModel.find().lean();
        return data
    }
    async getUserById(id){
        const data = await UserModel.findOne({_id:id}).populate('moment')
        if(!data) console.error('el usuario no existe')
        return data
    }

    async modificateUser(userId, userUpdated){
        
    }
}



const manager = new UserManager();
module.exports = manager