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

exports.cadastro = async (req, res) => {
    const { email, senha, icon } = req.body;
    
    let usuarios = await prisma.Users.findMany({select: {
            email: true,
            verify: true
        }, where: {
            email: email
        }
    })

    if (usuarios.length > 0) {
        if (usuarios[0].verify == 0) {
            res.render('verificação', {
                emailenv: email
            });
        } else {
            res.render('cadastro', {
                message: 'Este email já está cadastrado e verificado'
            });
        }
    } else {
        let code = Math.floor((Math.random() * (9999-1111)) +1111);
        let hashedPassword = await bcrypt.hash(senha, 8);
        let texto = "Você solicitou verificação de email. Seu código de verificação gerado é " + code;

        transporter.sendMail({
            from: process.env.USUARIO,
            to: email,
            subject: "Verificação de usuário",
            text: texto
        })

        await prisma.Users.create({data: {
            email,
            senha: hashedPassword,
            token: code,
            icon
        }})
        res.render('verificação', {
            emailenv: email
        });
    }
}
