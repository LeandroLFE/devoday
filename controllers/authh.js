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