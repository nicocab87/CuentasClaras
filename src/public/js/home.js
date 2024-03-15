const socket = io();

// Variables
const nameForm = document.getElementById("nameForm");

// EventListenner

nameForm.addEventListener('submit', async (e)=>{

    const formData = new FormData(nameForm);
    const obj = {};
    console.log(formData)

    formData.forEach((value, key) => obj[key] = value);

    try {
        if(!obj.name == ' '){
            await fetch('api/user/',{
                method: 'POST',
                body : JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                console.log(res)
                socket.emit('userName', res)})
        }
    } catch (error) {
        console.error('Hubo un error:', error);
    }
})