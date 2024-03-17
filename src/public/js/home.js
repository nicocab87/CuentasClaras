// Variables
const nameForm = document.getElementById("nameForm");
const userNamesDiv = document.getElementById("userNames")

// EventListenner

nameForm.addEventListener('submit', async (e)=>{

    const formData = new FormData(nameForm);
    const obj = {};

    formData.forEach((value, key) => obj[key] = value);

    try {
        if(!obj.name == ' '){
            await fetch('api/user/',{
                method: 'POST',
                body : JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res=>res.json())
            .then((res)=>{
                console.log(res)})
        }
    } catch (error) {
        console.error('Hubo un error:', error);
    }
})


