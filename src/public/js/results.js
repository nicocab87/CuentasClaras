//variables
const container = document.getElementById("container");
const infoFriend = document.getElementById("infoFriend")
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
        await printArrays();
    })
    .catch(error => {
        console.error('Hubo un error:', error);
    });

// Front-end
const printArrays = async () => {
    infoFriend.innerHTML = '';

    calculateArray.forEach(subArray => {
        const status = subArray[0];
        const infoStatus = Object.entries(subArray[1]);

        if (status !== 'totalMoney') {
            const infoFriendDiv = document.createElement('div');
            const htmlContent = infoStatus.map(info => {
                const data = info[1];
                let innerHtml = '';
                for (let key in data) {
                    innerHtml += `<p>${key}: ${data[key]}</p>`;
                }
                return innerHtml;
            }).join('');
            infoFriendDiv.innerHTML = htmlContent;
            infoFriend.appendChild(infoFriendDiv);
        }
    });
}
