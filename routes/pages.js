const express = require('express');

const router = express.Router();

// Precisa fazer um post pra cada? (routes auth)

router.get('/', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('landing')
    } else {
        return res.render('index')
    } 
});

router.get('/criar', (req, res) => {
    const accessToken = req.cookies["access-token"]
    const fun = require('../bibliaAPI/class');
    const antigo = require('../bibliaAPI/textosAntigo');
    const novo = require('../bibliaAPI/textosNovo');

    if (!accessToken) {
        return res.render('login')
    } else {
        return res.render('card', {
            txts_old: antigo.livros,
            selected: 1,
            txts_new: novo.livros,
            message: "Preencha os itens e salve para exibir o versículo",
            tit: "Leitura"
        })
    } 
});

router.get('/login', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        return res.render('index')
    } 
});

router.get('/cadastro', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('index')
    } 
});

module.exports = router;
