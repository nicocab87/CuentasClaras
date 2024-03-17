// Elements

const loginForm = document.getElementById("loginForm")

// Swal Creation
const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});


// EventListenner

loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const formData = new FormData(loginForm);
    const obj = {};

    formData.forEach((value, key) => obj[key] = value);

    try {
        await fetch('api/session/login',{
            method: 'POST',
            body : JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status == 200) {
                console.log(res.status)
                    window.location.replace("/");
            } else {
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se ha encontrado el usuario",
                });
            }
            })
            .then((data) => {
            console.log(data);
            });
    } catch (error) {
        console.error('Hubo un error:', error);
    }

})