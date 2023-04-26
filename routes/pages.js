const express = require('express');
const router = express.Router();

const antigo = require('../bibliaAPI/textosAntigo');
const novo = require('../bibliaAPI/textosNovo');
const { verify } = require('jsonwebtoken');
let imagens = ['cordeiro', 'coelho'];

function userIcon(vari, page, res) {
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

router.get('/', (req, res) => {
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
        for (let x = 0; x <= imagens.length; x++) {
            if (usuarioCookie.ima == 0) {
                return res.render('card', {
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    message: "Preencha os itens e salve para exibir o versículo",
                    tit: "Leitura"
                })
            } else if (usuarioCookie.ima == x) {
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

    if (!accessToken) {
        return res.render('cadastro')
    } else {
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
