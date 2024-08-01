// Variables
const friendForm = document.getElementById("friendForm");
const userNamesDiv = document.getElementById("userNames");
const friendsContainer = document.getElementById("friendsContainer");
const calculateButton = document.getElementById("calculateButton");
const deleteButtons = document.querySelectorAll('.delete');
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
                <h3>ha puesto: $${element.money}</h3>
                <button id="delete_${element._id}" data-friend-id="${element._id}" class="delete"> </button>
            </div>
            `
            friendsDiv.classList.add("box");

            friendsContainer.appendChild(friendsDiv);
        });
    })
}

const fecthCalculator = async (userID, payload)=>{
    try {
        await fetch(`/api/friend/addFriends/${userID}`,{
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

const borrarAmigo = async (userId, friendId) => {
    console.log('borrar desde funcion')
    try {
        const response = await fetch(`/api/friend/${userId}/deleteFriend/${friendId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            addFriendsDiv(userId)
        } else {
            console.error('Error al eliminar el amigo');
        }
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}

const obtenerUserId = async () => {
    try {
        const response = await fetch('/api/session/current');
        const data = await response.json();
        return data.user.id; // Devuelve el ID del usuario desde la respuesta del servidor
    } catch (error) {
        console.error('Hubo un error al obtener el ID de usuario:', error);
        return null; // En caso de error, devuelve null
    }
}

//Initializate page
fetch('/api/session/current')
        .then(response => response.json())
        .then(data => {
            const userId = data.user.id;
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

    fetch('/api/session/current')
        .then(response => response.json())
        .then(data => {
            const userId = data.user.id;
            fecthCalculator(userId, payload);
            friendForm.reset();
        })
        .catch(error => {
            console.error('Hubo un error:', error);
    });
})

friendsContainer.addEventListener('click', async (event) => {
    const button = event.target.closest('.delete'); 
    if (button) {
        const userId = await obtenerUserId(); 
        const friendId = button.dataset.friendId; 
        console.log(friendId)
        if (userId) {
            await borrarAmigo(userId, friendId); 
            await addFriendsDiv(userId)
        }
    }
});

module.exports={
    obtenerUserId
}