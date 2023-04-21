const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('landing')
    } else {
        return res.render('index')
    } 
});

router.get('/home', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('landing')
    } else {
        return res.render('index')
    } 
});

router.get('/landing', (req, res) => {
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

router.get('/feedback', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        res.render('feedback')
    } 
});

router.get('/tutorial', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        res.render('tutorial/tutoA')
    } 
});

router.get('/tutorialB', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        res.render('tutorial/tutoB')
    } 
});

router.get('/tutorialC', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        res.render('tutorial/tutoC')
    } 
});

router.get('/tutorialD', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        res.render('tutorial/tutoD')
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

router.get('/verificar', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('index')
    } 
});

router.get('/alterar', (req, res) => {
    res.render('alterar')
});

router.get('/auth/alterar', (req, res) => {
    res.render('alterar')
});

router.get('/altera', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('altera')
    }
});

router.get('/auth/altera', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('altera')
    }
});

router.get('/auth/home', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        return res.render('index')
    } 
});

router.get('/auth/cadastro', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('index')
    } 
});

router.get('/auth/login', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        return res.render('index')
    } 
});

module.exports = router;
