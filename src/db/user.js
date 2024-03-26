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
    
    async addFriend(userId, newFriends){
        const user = await UserModel.findById(userId)
        const updatedUser = user.friends.concat(newFriends)
        const data = await UserModel.updateOne({_id:user}, {friends:updatedUser});
        return data
    }

    async getFriends(userId){
        const user = await UserModel.findById(userId).lean()
        if(!user){
            return console.error('No se ha encontrado el usuario')
        }
        const data = user.friends
        return data
    }

    async calculateMoney (userId){
        const data = await manager.getFriends(userId)

        let totalMoney = 0
        let haveToPay = []
        let haveToBePaid = []
        let dontHaveToPay=[]

        data.map((f)=>{
            totalMoney += f.money
        })

        let toPayEachOne = (totalMoney/(data.length))

        data.forEach(f => {
            const toPay = (f.money - toPayEachOne)

            if(toPay < 0){
                let toPayPostive = toPay * -1
                haveToPay.push({name: f.name, toPay: toPayPostive})
                
            }else if(toPay>0){
                haveToBePaid.push({name: f.name, toBePaid: toPay})
            }else{
                dontHaveToPay.push({name: f.name, toPay: toPay})
            }
        });

        let finalArray = { toPay:haveToPay, toBePaid:haveToBePaid, dontPay: dontHaveToPay, totalMoney }

        return finalArray
    }

    async crossArrays(idUser){
        const data = await manager.calculateMoney(idUser)
        let finalData = []
    
        const {toPay, toBePaid, dontPay} = data 
    
        toPay.forEach((personToPay) => {
            toBePaid.forEach((personToBePaid) => {
                let transferAmount = Math.min(personToPay.toPay, personToBePaid.toBePaid);
    
                if (transferAmount > 0) {
                    finalData.push({
                        from: personToPay.name,
                        to: personToBePaid.name,
                        amount: transferAmount
                    });
    
                    personToPay.toPay -= transferAmount;
                    personToBePaid.toBePaid -= transferAmount;
                }
            });
        });
    
        return finalData;
    }


}



const manager = new UserManager();
module.exports = manager