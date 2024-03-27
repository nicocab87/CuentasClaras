// Variables
const friendForm = document.getElementById("friendForm");
const userNamesDiv = document.getElementById("userNames");
const friendsContainer = document.getElementById("friendsContainer");
const calculateButton = document.getElementById("calculateButton");
const socket = io();

// Functions
const addFriendsDiv = (userId)=>{
    socket.emit('addFriend', userId)
    socket.on('dataToFiends', (data)=>{
        friendsContainer.innerHTML= ` `;

        data.forEach((element) => {
            const friendsDiv = document.createElement('div');
            friendsDiv.innerHTML = `
            <div class="boxFriend">
            <h1>${element.name}</h1>
            <h3>Ha puesto:$ ${element.money}</h3>
            </div>
            `
            friendsDiv.classList.add("box");

            friendsContainer.appendChild(friendsDiv);
        });
    })
}


const fecthCalculator = async (userID, payload)=>{
    try {
        await fetch(`/api/user/addFriends/${userID}`,{
            method: 'POST',
            body : JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then((res)=>{
            addFriendsDiv(userID)
        })
    } catch (error) {
    console.error('Hubo un error:', error);
    }
}

//Initializate page
fetch('/api/userInfo')
        .then(response => response.json())
        .then(data => {
            const userId = data.userId;
            addFriendsDiv(userId)
        })
        .catch(error => {
            console.error('Hubo un error:', error);
    });



// EventListenner
friendForm.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const formData = new FormData(friendForm);
    const payload = {};

    formData.forEach((value, key) => {
        if (key === 'money') {
            payload[key] = parseFloat(value); 
        } else {
            payload[key] = value;
        }
    });


    fetch('/api/userInfo')
        .then(response => response.json())
        .then(data => {
            const userId = data.userId;
            fecthCalculator(userId, payload);
            friendForm.reset();
        })
        .catch(error => {
            console.error('Hubo un error:', error);
    });
})
