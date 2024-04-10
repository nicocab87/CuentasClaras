//variables
const container = document.getElementById("container");
const infoFriend = document.getElementById("infoFriend");
const infoFriendResult = document.getElementById("infoFriendResult");
let calculateArray;
let resultArray;

//Function
const calculate = async (id) => {
    try {
        const calculateResponse = await fetch(`/api/calculate/calculateMoney/${id}`);
        const resultResponse = await fetch(`/api/calculate/result/${id}`);
        const calculateData = await calculateResponse.json();
        const resultData = await resultResponse.json();

        console.log(calculateData, 'array calulate')
        console.log(resultData, 'result array')

        calculateArray = Object.entries(calculateData.data);
        resultArray = resultData.data;
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}

// Get userID and calculate
fetch('/api/session/current')
    .then(response => response.json())
    .then(async data => {
        userId = data.user.id;
        await calculate(userId);
        await printCalculateArray();
        await printResultArray()
    })
    .catch(error => {
        console.error('Hubo un error:', error);
    });

// Front-end
const printCalculateArray = async () => {
    infoFriend.innerHTML = '';

    calculateArray.forEach(subArray => {
        const status = subArray[0];
        const infoStatus = Object.entries(subArray[1]);

        if (status !== 'secondaryInfo') {
            const infoFriendDiv = document.createElement('div');
            let htmlContent = '';

            infoStatus.forEach(info => {
                const data = info[1];
                htmlContent += `
                    <p class="infoFriend">${data.name} ${data.toPay ? `debe pagar $${data.toPay}` : `le deben pagar: $${data.toBePaid}`}</p>
                `;
                infoFriendDiv.classList.add(`${data.toPay && 'friendsToPay'}`)
                infoFriendDiv.classList.add(`${data.toBePaid && 'friendstoBePaid'}`)
                infoFriendDiv.classList.add(`${data.dontPay && 'friendsDontPay'}`)
            }); 
            
            infoFriend.classList.add("infoFriends","box")

            infoFriendDiv.innerHTML = htmlContent; 
            infoFriend.appendChild(infoFriendDiv);
        }else{
            console.log(subArray)
            const data = subArray[1]
            const totalMoney= document.createElement('div');
            totalMoney.innerHTML=`
            <p class="infoMoney">En total se ha puesto: <strong>$${data.totalMoney}</strong> y son <strong>${data.lengtData}</strong> personas, por lo cual cada uno debe poner <strong>${data.totalMoney}</strong>/<strong>${data.lengtData}</strong> = <strong>$${data.toPayEachOne}</strong>. Debido a esto:</p>
            `
            totalMoney.classList.add("totalMoney")
            infoFriend.appendChild(totalMoney)
        }
    });
}

const printResultArray = () =>{
    infoFriendResult.innerHTML = '';
    let htmlContent = '';

    resultArray.forEach((obj)=>{
        htmlContent+= `
        <div class="resultArray">
            <p>${obj.from} le debe pagar a ${obj.to}: $${obj.amount} </p>
        </div>
        `
    })

    const textResult = document.createElement('p')
    textResult.innerHTML='Una sugerencia de como efectuar los pagos es:'
    textResult.classList.add('textResult')

    infoFriendResult.innerHTML = htmlContent
    infoFriendResult.appendChild(textResult)

}
