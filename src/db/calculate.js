const friendManager = require("./friends")

class CalculateMoneyManager {
    
    async calculateMoney (userId){
        const data = await friendManager.getFriends(userId)

        let totalMoney = 0
        let haveToPay = []
        let haveToBePaid = []
        let dontHaveToPay=[]

        data.map((f)=>{
            totalMoney += f.money
        })

        const lengtData = data.length

        let toPayEachOne = (totalMoney/lengtData)

        data.forEach(f => {
            const toPay = f.money - toPayEachOne;
    
            if (toPay < 0) {
                const toPayPositive = Math.abs(toPay);
                haveToPay.push({ name: f.name, toPay: toPayPositive.toFixed(2) }); 
            } else if (toPay > 0) {
                haveToBePaid.push({ name: f.name, toBePaid: toPay.toFixed(2) }); 
            } else {
                dontHaveToPay.push({ name: f.name, toPay: toPay.toFixed(2) }); 
            }
        });

        let finalArray = { toPay:haveToPay, toBePaid:haveToBePaid, dontPay: dontHaveToPay, secondaryInfo:{totalMoney, toPayEachOne, lengtData} }

        return finalArray
    }

    async crossArrays(idUser){
        const data = await calculateManager.calculateMoney(idUser)
        let finalData = []
    
        const {toPay, toBePaid, dontPay} = data 
    
        toPay.forEach((personToPay) => {
            toBePaid.forEach((personToBePaid) => {
                let transferAmount = Math.min(personToPay.toPay, personToBePaid.toBePaid);
    
                if (transferAmount > 0) {
                    finalData.push({
                        from: personToPay.name,
                        to: personToBePaid.name,
                        amount: transferAmount.toFixed(2)
                    });
    
                    personToPay.toPay -= transferAmount;
                    personToBePaid.toBePaid -= transferAmount;
                }
            });
        });
    
        return finalData;
    }
}


const calculateManager = new CalculateMoneyManager ();
module.exports = calculateManager