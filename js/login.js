// VARIÁVEIS
var input = document.querySelector('.sinput input');
var img = document.querySelector('.sinput i');

// CÓDIGO
img.addEventListener('click', function () {
    input.type = input.type == 'text' ? 'password' : 'text';
    img.className = img.className == "fi fi-rr-eye" ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye";
});

// CADASTRO

var email = "a"

var criar = document.querySelector('.criar');

/*

PROBLEMAS:
- Ele não verifica mais os campos
- Não recebe mais os campos?
- Toma espaço para baixo
- Aumentar ou diminuir valores por padrão

*/

criar.addEventListener('click', function () {

    Swal.fire({
        title: `Digite o código que recebeu em seu email ${email}`,
        input: 'number',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
    
        /* FUNÇÃO PRA VERIFICAR O CÓDIGO */
    
        /* parte padrão
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
        */
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Seu email foi confirmado!`
    
            /* Redirecionar para página principal */
          })
        }
    })

});
