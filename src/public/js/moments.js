
// Variables
const momentsForm = document.getElementById("momentForm");
const moments = document.getElementById("moments");
const socket = io()

// Functions
const obtenerUserId = async () => {
    try {
        const response = await fetch('/api/session/current');
        const data = response.json();
        return data.user.id; // Devuelve el ID del usuario desde la respuesta del servidor
    } catch (error) {
        console.error('Hubo un error al obtener el ID de usuario:', error);
        return null; // En caso de error, devuelve null
    }
}

const borrarMoment = async (userId, momentId) => {
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

const addMomentDiv = (userId)=>{
    socket.emit('addMoment', userId);
    socket.on('dataToMoments', (data)=>{
        moments.innerHTML=``;
        console.log('data', data)

        data.forEach((e)=>{
            const momentDiv = document.createElement('div');
            momentDiv.innerHTML= `
            <div class="boxMoment">
                <h1>${e.name}</h1>
                <button id="delete_${e._id}" data-moment-id="${e._id}" class="deleteM"> </button>
            </div>
            `
            momentDiv.classList.add("box")
            moments.appendChild(momentDiv)
        })
    })

}

//Initializate page
fetch('api/session/current')
    .then(res=>res.json())
    .then(data=>{
        const userId = data.user.id;
        addMomentDiv(userId)
    })
    .catch(error=>console.error(error))


// EventListener
momentsForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const momentData = new FormData(momentsForm);
    const payload = {};

    momentData.forEach((value, key) => {payload[key] = value});
    
    const userID = await obtenerUserId()
    console.log(userID)

    try {
        fetch(`/api/moment/${userID}/createMoment`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.json())
        .then((data)=>{
            addMomentDiv(userID)
            momentsForm.reset();
        })
    } catch (error) {
        console.error('Hubo un error:', error);
    }
})

moments.addEventListener('click', async (event) => {
    const button = event.target.closest('.deleteM'); 
    if (button) {
        const userId = await obtenerUserId(); 
        const friendId = button.dataset.momentId; 
        if (userId) {
            await borrarAmigo(userId, friendId); 
            await addFriendsDiv(userId)
        }
    }
});