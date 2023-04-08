// VARIÁVEIS
var input = document.querySelector('.sinput input');
var img = document.querySelector('.sinput i');

// CÓDIGO
img.addEventListener('click', function () {
    input.type = input.type == 'text' ? 'password' : 'text';
    img.className = img.className == "fi fi-rr-eye" ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye";
});




// ORGANIZAR AINDA
let email = document.querySelector('#email');
let senha = document.querySelector('#senha');

let login = document.querySelector('.login');
let criar = document.querySelector('.criar');

function Logar(e) {
    e.preventDefault()

    //verificar

    //redirecionar
    window.location.href = "index.html";
}

function Criar(e) {
    e.preventDefault()

    //verificar
    /*
    Swal.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
            .then(response => {
                if (!response.ok) {
                throw new Error(response.statusText)
                }
                return response.json()
            })
            .catch(error => {
                Swal.showValidationMessage(
                `Request failed: ${error}`
                )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
            })
        }
        })
        
    */

    //adicionar ao banco

    //redirecionar
    window.location.href = "index.html";
}

