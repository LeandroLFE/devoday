const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
////////////////////
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

// REGISTRAR
exports.register = async (req, res) => {
    const { email, senha, icone } = req.body;
    
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
            icon: parseInt(icone)
        }})
        res.render('verificação', {
            emailenv: email
        });
    }
}

// LOGAR
exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT email, senha, icon, verify FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            if (await bcrypt.compare(senha, results[0].senha)) {

                if (results[0].verify == 0) {
                    res.render('verificação', {
                        emailenv: email
                    });
                } else {
                    const createTokens = (user) => {
                        const acessToken = sign({ username: results[0].email, ima: results[0].icon }, process.env.TOKEN);
                        return acessToken;
                    }
                    const accessToken = createTokens(results[0].email)
    
                    res.cookie('access-token', accessToken, {
                        maxAge: 60*60*24*70
                    })

                    var usuarioCookie = verify(accessToken, process.env.TOKEN);
                    userIcon(usuarioCookie, 'index', res);
                }
            } else {
                res.render('login', {
                    message: 'Senha incorreta'
                })
            }
        } else {
            res.render('login', {
                message: 'Não existe conta com este email'
            })
        }
    })
}

// VERIFICAR CONTA
exports.verificar = (req, res) => {
    const { codeE, emaile } = req.body;

    db.query('SELECT email, icon, token FROM users WHERE email = ?', [emaile], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (codeE == results[0].token) {
            db.query('UPDATE users SET verify = 1 WHERE email = ?', [emaile], async (error, results) => {
                if (error) {
                    console.log(error)
                }
            });
            const createTokens = (user) => {
                const acessToken = sign({ username: results[0].email, img: results[0].icon }, process.env.TOKEN);
                return acessToken;
            }
            const accessToken = createTokens(results[0].email)

            res.cookie('access-token', accessToken, {
                maxAge: 60*60*24*70*1000
            })

            var usuarioCookie = verify(accessToken, process.env.TOKEN);
            userIcon(usuarioCookie, 'index', res);
            
        } else {
            res.render('verificação', {
                message: "Código de verificação inválido, tente novamente"
            })
        };
    })
};

exports.avaliar = (req, res) => {
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
    })/* .then(info => {
        console.log(info)
    }).catch(error => {
        console.log(error)
    }) */

    userIcon(usuarioCookie, 'index', res);
}

exports.alterar = (req, res) => {
    const { emailant, email, senha } = req.body;
    const acessToken = req.cookies["access-token"]

    if (acessToken) {
        res.clearCookie('access-token')
    }

    if (emailant == email) {
        res.render('alterar', {
            message: 'Não é possível alterar para o mesmo email'
        })
    } else {

        db.query('SELECT email, senha, token, verify FROM users WHERE email = ?', [emailant], async (error, resultss) => {
            if (error) {
                console.log(error)
            }

            if (resultss.length > 0) {
                if (await bcrypt.compare(senha, resultss[0].senha)) {

                    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
                        if (error) {
                            console.log(error)
                        }
                        if (results.length > 0) {
                            res.render('alterar', {
                                message: 'Já existe uma conta cadastrada no novo email'
                            })
                        } else {
                            let texto = "Você solicitou verificação para o seu novo email. Seu código de verificação gerado é " + resultss[0].token;

                            transporter.sendMail({
                                from: usuario,
                                to: [email, emailant],
                                subject: "Verificação de novo usuário",
                                text: texto
                            });

                            db.query('UPDATE users SET email = ?, verify = 0 WHERE email = ?', [email, emailant], async (error) => {
                                if (error) {
                                    console.log(error)
                                }
                                res.render('verificação', {
                                    emailenv: email
                                });
                            });
                        }
                    })

                } else {
                    res.render('alterar', {
                        message: 'Senha incorreta'
                    })
                }
            } else {
                res.render('cadastro')
            }
        })
    }
}

exports.altera = (req, res) => {
    const { email, passant, senha } = req.body;
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    if (acessToken) {
        res.clearCookie('access-token')
    }

    if (passant == senha) {
        res.render('altera', {
            message: 'Não é possível alterar para a mesma senha'
        })
    } else {

        db.query('SELECT senha FROM users WHERE email = ?', [usuarioCookie.username], async (error, resultss) => {
            if (error) {
                console.log(error)
            }

            if (resultss.length > 0) {
                if (await bcrypt.compare(passant, resultss[0].senha)) {
                    transporter.sendMail({
                        from: usuario,
                        to: usuarioCookie.username,
                        subject: "Senha alterada",
                        text: "Este email confirma a mudança de senha solicitada."
                    });

                    let hashedPassword = await bcrypt.hash(senha, 8);
                    db.query('UPDATE users SET senha = ? WHERE email = ?', [hashedPassword, usuarioCookie.username], async (error) => {
                        if (error) {
                            console.log(error)
                        }
                        userIcon(usuarioCookie, 'index', res);
                    });
                } else {
                    res.render('altera', {
                        message: 'Senha antiga incorreta'
                    })
                }
            } else {
                res.render('cadastro')
            }
        })
    }
}

exports.deletar = (req, res) => {
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    db.query('SELECT senha FROM users WHERE email = ?', [usuarioCookie.username], async (error, results) => {
        if (error) {
            console.log(error)
        }
        
        db.query('DELETE from users WHERE email = ?', [usuarioCookie.username], async (error, results) => {
            if (error) {
                console.log(error)
            }
            res.clearCookie('access-token')
            res.render('landing')
        })
    })
}

exports.sair = (req, res) => {
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    res.clearCookie("access-token")
    res.render('landing')
}