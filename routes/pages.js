const express = require('express');
const router = express.Router();

const antigo = require('../bibliaAPI/textosAntigo');
const novo = require('../bibliaAPI/textosNovo');
const { verify } = require('jsonwebtoken');

const userIcon = require('../userIcon');

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

router.get('/sugerido', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login');

    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        const fs = require("fs");
        const localDbPath = `${__dirname}/../localdb.json`;
        let dbContent = fs.readFileSync(localDbPath, "utf8");
        let db = JSON.parse(dbContent);
        let sug1 = db.phrase.titulo;
        let sug2 = sug1.split('_')

        let sugestaoTit = sug2.length > 1 ? `${sug2[0]} ${sug2[1]}`: sug1;
        let sugestaoTex = db.phrase.text;

        for (let x = 0; x <= imagens.length; x++) {
            if (usuarioCookie.ima == 0) {
                return res.render('card', {
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    message: sugestaoTex,
                    tit: sugestaoTit,
                    titInp: sug1
                })
            } else if (usuarioCookie.ima == x) {
                return res.render('card', {
                    imagem: imagens[x-1],
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    message: sugestaoTex,
                    tit: sugestaoTit,
                    titInp: sug1
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

router.get('/auth/feedback', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('feedback')
    }
});

router.get('/auth/tutorial', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('tutorial/tutoA')
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

router.get('/criar/feedback', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('feedback')
    }
});

router.get('/criar/tutorial', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('tutorial/tutoA')
    }
});

router.get('/criar/alterar', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('alterar')
    }
});

router.get('/criar/home', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/criar/cadastro', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/criar/login', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/criar/verificar', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

module.exports = router;
