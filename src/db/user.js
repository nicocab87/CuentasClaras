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
}



const manager = new UserManager();
module.exports = manager