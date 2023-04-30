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
const { verify } = require('jsonwebtoken');

const userIcon = require('../userIcon');


/* 

const getAuthor = await prisma.user.findUnique({
  where: {
    id: "20",
  },
  include: {
    posts: true, // All posts where authorId == 20
  },
});
*/

//const job = nodeSchedule.scheduleJob('*/1 * * * *', () => {
//console.log(new Date());
//});


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
                                    titulo = c == d ? `${antigo.livros[a].abr} ${b}:${c}` : `${antigo.livros[a].abr} ${b}:${c}-${d}`;
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
                                    titulo = c == d ? `${novo.livros[a].abr} ${b}:${c}` : `${novo.livros[a].abr} ${b}:${c}-${d}`;
    }}}}}}}}

    const accessToken = req.cookies["access-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);
    const tutoToken = req.cookies["tuto-token"];

    let imagens = ['cordeiro', 'coelho'];
    for (let x = 0; x <= imagens.length; x++) {
        if (usuarioCookie.ima == 0) {
            if (tutoToken) {
                return res.render('tutorial/tutoC', {
                    txts_old: antigo.livros,
                    txts_new: novo.livros,
                    message: mensagem,
                    tit: titulo
                })
            } else {
                return res.render('card', {
                    txts_old: antigo.livros,
                    txts_new: novo.livros,
                    message: mensagem,
                    tit: titulo
                })
            }
            
        } else if (usuarioCookie.ima == x) {
            if (tutoToken) {
                return res.render('tutorial/tutoC', {
                    imagem: imagens[x-1],
                    txts_old: antigo.livros,
                    txts_new: novo.livros,
                    message: mensagem,
                    tit: titulo
                })
            } else {
                return res.render('card', {
                    imagem: imagens[x-1],
                    txts_old: antigo.livros,
                    txts_new: novo.livros,
                    message: mensagem,
                    tit: titulo
                })
            }
        }
    }
}

// Registrar no bd
exports.envio = (req, res) => {
    const {titulo2} = req.body;
    const accessToken = req.cookies["access-token"];
    const tutoToken = req.cookies["tuto-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);
    console.log(titulo) // Quando for direto
    console.log(titulo2) // --> Quando for por sugestão

    if (tutoToken) {
        userIcon(usuarioCookie, 'tutorial/tutoD', res);
    } else {
        userIcon(usuarioCookie, 'index', res);
    }
    // Split ('', ':', '-'); para descobrir as variáveis de abr, cap, verI e verF -> se não tiver verF é igual a verI

    // Caso for comparar o título com as abrs, lembrar que tem abr de 3 letras (tem mais?)

    // Se os dados da leitura forem enviados, registrar no bd, se não, dar mensagem de erro
     /* else {
        res.render('card', {
            err: "Para enviar é necessário definir uma leitura"
        }) */

    // É possível acessar a passagem escolhida daqui?
}