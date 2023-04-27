const express = require('express');
const router = express.Router();

const antigo = require('../bibliaAPI/textosAntigo');
const novo = require('../bibliaAPI/textosNovo');
const { verify } = require('jsonwebtoken');
let imagens = ['cordeiro', 'coelho'];

async function userIcon(vari, page, res) {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    if (page == 'index') {
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
                return res.render('index', {
                    level: Lvl,
                    cards: usuarios[0].cards,
                    cardsLevel: cardsLvl
                })
            } else if (vari.ima == x) {
                return res.render('index', {
                    imagem: imagens[x-1],
                    level: Lvl,
                    cards: usuarios[0].cards,
                    cardsLevel: cardsLvl
                })
            }
        }

    } else if (page == 'card') {
        for (let x = 0; x <= imagens.length; x++) {
            if (vari.ima == 0) {
                return res.render('card', {
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    message: "Preencha os itens e salve para exibir o versículo",
                    tit: "Leitura"
                })
            } else if (vari.ima == x) {
                return res.render('card', {
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

router.get('/', async (req, res) => {
    const accessToken = req.cookies["access-token"];
    
    if (!accessToken) {
        return res.render('landing')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    }
});

router.get('/home', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('landing')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/landing', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('landing')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/criar', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'card', res);
    } 
});

router.get('/feedback', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'feedback', res);
    } 
});

router.get('/tutorial', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'tutorial/tutoA', res);
    } 
});

router.get('/tutorialB', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'tutorial/tutoB', res);
    }
});

router.get('/tutorialC', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'tutorial/tutoC', res);
    }
});

router.get('/tutorialD', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'tutorial/tutoD', res);
    }
});

router.get('/login', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/cadastro', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/verificar', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (accessToken) {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/alterar', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('alterar')
    }
});

router.get('/trocar', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        res.render('trocar')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'ialterar', res);
    }
});

router.get('/auth/trocar', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        res.render('trocar')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'ialterar', res);
    }
});

router.get('/auth/alterar', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('alterar')
    }
});

router.get('/auth/home', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/auth/cadastro', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/auth/login', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/auth/verificar', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

module.exports = router;
