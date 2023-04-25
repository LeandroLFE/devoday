const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USUARIO,
        pass: process.env.EMAILS
    }
})

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

exports.modelo = async (req, res) => {
    
}

/* 

const { problema, ItensProblema, descrição } = req.body;
    let texto; 

    if (problema == "Outros" || problema == "Sugestão") {
        texto = `Olá, agradecemos pelo seu feedback e iremos verificar. Sua opção foi: "${problema}". E sua descrição foi: "${descrição}"`
    } else if (problema == undefined) {
        texto = `Olá, agradecemos pelo seu feedback e iremos verificar. Sua opção foi: "Outros". E sua descrição foi: "${descrição}"`
    } else {
        texto = `Olá, agradecemos pelo seu feedback e iremos verificar. Suas opções foram: "${problema}" > "${ItensProblema}". E sua descrição foi: "${descrição}"`
    }
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    transporter.sendMail({
        from: usuario,
        to: [usuario, usuarioCookie.username],
        subject: "Feedback",
        text: texto
    })

    userIcon(usuarioCookie, 'index', res);


*/