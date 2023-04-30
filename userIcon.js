let imagens = ['cordeiro', 'coelho'];
const antigo = require('../bibliaAPI/textosAntigo');
const novo = require('../bibliaAPI/textosNovo');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fs = require("fs");
const localDbPath = `${__dirname}/localdb.json`;
let dbContent = fs.readFileSync(localDbPath, "utf8");
let db = JSON.parse(dbContent);
let sug1 = db.phrase.titulo;
let sug2 = sug1.split('_')

let sugestaoTit = sug2.length > 1 ? `${sug2[0]} ${sug2[1]}`: sug1;
let sugestaoTex = db.phrase.text;

async function userIcon(vari, page, res) {
    if (page == 'index' || page == 'tutorial/tutoA' || page == 'tutorial/tutoD') {
        let usuarios = await prisma.Users.findMany({select: {
            cards: true
            }, where: {
                email: vari.username
            }
        })

        let Lvl = Math.floor(parseInt(usuarios[0].cards) / 10) + 1 // Recupera o level
        let cardsLvl = (Math.floor(parseInt(usuarios[0].cards) / 10) * 10) + 9 // Recupera o máximo de cards no level

        for (let x = 0; x <= imagens.length; x++) {
            if (vari.ima == 0) {
                return res.render(page, {
                    level: Lvl,
                    cards: usuarios[0].cards,
                    cardsLevel: cardsLvl,
                    sugTit: sugestaoTit,
                    sugTex: sugestaoTex
                })
            } else if (vari.ima == x) {
                return res.render(page, {
                    imagem: imagens[x-1],
                    level: Lvl,
                    cards: usuarios[0].cards,
                    cardsLevel: cardsLvl,
                    sugTit: sugestaoTit,
                    sugTex: sugestaoTex
                })
            }
        }

    } else if (page == 'card' || page == 'tutorial/tutoB' || page == 'tutorial/tutoC') {
        for (let x = 0; x <= imagens.length; x++) {
            if (vari.ima == 0) {
                return res.render(page, {
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    message: "Preencha os itens e salve para exibir o versículo",
                    tit: "Leitura"
                })
            } else if (vari.ima == x) {
                return res.render(page, {
                    imagem: imagens[x-1],
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    message: "Preencha os itens e salve para exibir o versículo",
                    tit: "Leitura"
                })
            }
        }

    } else {
        for (let x = 0; x <= imagens.length; x++) {
            if (vari.ima == 0) {
                return res.render(page)
            } else if (vari.ima == x) {
                return res.render(page, {
                    imagem: imagens[x-1]
                })
            }
        }
    }
}

module.exports = userIcon