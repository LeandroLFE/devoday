const fun = require('../bibliaAPI/class');
const antigo = require('../bibliaAPI/textosAntigo');
const novo = require('../bibliaAPI/textosNovo');
const hbs = require('hbs');
hbs.registerHelper('checkSelected', function (id, target) {
    return id === target
});

hbs.registerHelper('json', function (content) {
    return JSON.stringify(content);
});

let mensagem;
let titulo;

// Escolher o card
exports.escolha = (req, res) => {
    const { livro, capitulo, verI, verF } = req.body; // Recebe os valores do formulário

    //ANTIGO 
    for (a = 0; a < antigo.livros.length; a++) {
        if (antigo.livros[a].nome == livro) { // Para saber o livro

            for (b = 1; b <= antigo.livros[a].capitulos; b++) {
                if (b == capitulo) { // Para saber o capítulo

                    for (c = 1; c <= antigo.livros[a].leitura[b]["versi"]; c++) {
                        if (c == verI) { // Para saber o versículo inicial

                            for (d = 1; d <= antigo.livros[a].leitura[b]["versi"]; d++) {
                                if (d == verF) { // Para saber o versículo final
                                    mensagem = fun.agrupar(antigo.livros[a], b, c, d);
                                    titulo = `${antigo.livros[a].abr} ${b}:${c}-${d}`;
    }}}}}}}}

    // NOVO 
    for (a = 0; a < novo.livros.length; a++) {
        if (novo.livros[a].nome == livro) { // Para saber o livro

            for (b = 1; b <= novo.livros[a].capitulos; b++) {
                if (b == capitulo) { // Para saber o capítulo

                    for (c = 1; c <= novo.livros[a].leitura[b]["versi"]; c++) {
                        if (c == verI) { // Para saber o versículo inicial

                            for (d = 1; d <= novo.livros[a].leitura[b]["versi"]; d++) {
                                if (d == verF) { // Para saber o versículo final
                                    mensagem = fun.agrupar(novo.livros[a], b, c, d);
                                    titulo = `${novo.livros[a].abr} ${b}:${c}-${d}`;
    }}}}}}}}

    res.render('card', {
        txts_old: antigo.livros,
        txts_new: novo.livros,
        message: mensagem,
        tit: titulo
    })
}

// Registrar no bd
exports.envio = (req, res) => {
    res.render ('index');
    console.log(titulo)
    // Caso for comparar o título com as abrs, lembrar que tem abr de 3 letras (tem mais?)

    // Se os dados da leitura forem enviados, registrar no bd, se não, dar mensagem de erro
     /* else {
        res.render('card', {
            err: "Para enviar é necessário definir uma leitura"
        }) */

    // É possível acessar a passagem escolhida daqui?
}