

// HEADER
let menu = document.querySelector('.conta');
function show() {
    menu.style.display = menu.style.display == "none" ? "block" : "none";
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