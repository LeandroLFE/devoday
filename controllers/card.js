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
    }}}}}}}}

    res.render('card', {
        txts_old: antigo.livros,
        selected: 1,
        txts_new: novo.livros,
        message: mensagem
    })
}

// Registrar no bd