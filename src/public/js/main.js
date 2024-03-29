//Variables
const perfilDiv = document.getElementById("perfilDiv");

//Event Listener

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

        });
    });

});


//Peticiones
fetch('/api/session/current')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        perfilDiv.innerHTML =' '
        if (data.user) {
            perfilDiv.innerHTML = `
            <li class="nav-item dropdown navbar-end">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${data.user.name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/profile">Perfil</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/api/session/logout">Cerrar sesión</a></li>
                </ul>
            </li>
            `
        }else{
            perfilDiv.innerHTML=`
            <div>
                <div class="navbar-item">
                    <div class="buttons">
                        <a href="/register" class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a href="/login" class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
            `
        }
    })
    .catch(error => {
        console.error('Hubo un error:', error);
    });