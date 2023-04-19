// VARIÁVEIS
var input = document.querySelector('.sinput input');
var img = document.querySelector('.sinput i');

// CÓDIGO
img.addEventListener('click', function () {
    input.type = input.type == 'text' ? 'password' : 'text';
    img.className = img.className == "fi fi-rr-eye" ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye";
});
