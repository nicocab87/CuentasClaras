//variables
const container = document.getElementById("container");
const infoFriend = document.getElementById("infoFriend");
const infoFriendResult = document.getElementById("infoFriendResult");
let calculateArray;
let resultArray;

//Function
const calculate = async (id) => {
    try {
        const calculateResponse = await fetch(`/api/user/calculateMoney/${id}`);
        const resultResponse = await fetch(`/api/user/result/${id}`);
        const calculateData = await calculateResponse.json();
        const resultData = await resultResponse.json();


        calculateArray = Object.entries(calculateData.data);
        resultArray = resultData.data;
        console.log(resultArray)
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}

// Get userID and calculate
fetch('/api/userInfo')
    .then(response => response.json())
    .then(async data => {
        userId = data.userId;
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

        if (status !== 'totalMoney') {
            const infoFriendDiv = document.createElement('div');
            let htmlContent = '';

            infoStatus.forEach(info => {
                const data = info[1];
                htmlContent += `
                    <p>${data.name} ${data.toPay? `debe pagar $${data.toPay}` : `le deben pagar: $${data.toBePaid}`}</p>
                `;
            });
            infoFriend.classList.add("box")

            infoFriendDiv.innerHTML = htmlContent; 
            infoFriend.appendChild(infoFriendDiv);
        }
    });
}

const printResultArray = () =>{
    infoFriendResult.innerHTML = '';
    let htmlContent = '';

    resultArray.forEach((obj)=>{
        htmlContent+= `
        <div class="box resultArray">
            <p>${obj.from} le debe pagar a ${obj.to}: $${obj.amount} </p>
        </div>
        `
    })

    infoFriendResult.innerHTML = htmlContent

}
