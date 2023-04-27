

// HEADER
let menu = document.querySelector('.conta');
menu.style.display = "none";
function show() {
    if (menu.style.display == "none") {
        menu.style.display = "block"
    } else {
        menu.style.display = "none"
    }
    //menu.style.display = menu.style.display == "none" ? "block" : "none";
}
function voltar() {
    window.location.href = ('/')
}

function deletar() {
    let res = window.prompt('Quer mesmo excluir sua conta? Isso apagará permanentemente todos os seus devocionais e conquistas. Caso queira, digite "sim"')
    if (res == 'sim') {
        window.location.replace('/auth/deletar')
    }
}