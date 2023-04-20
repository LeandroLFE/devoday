const mysql = require('mysql')
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const nodemailer = require('nodemailer');
const usuario = "devodaysuporte@gmail.com"
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: usuario,
        pass: process.env.EMAILS
    }
})

// REGISTRAR
exports.register = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT email, senha, verify FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            if (results[0].verify == 0) {
                res.render('verificação', {
                    emailenv: email
                });
            } else {
                res.render('cadastro', {
                    message: 'Este email já está cadastrado e verificado'
                })
            }

        } else {
            let code = Math.floor((Math.random() * (9999-1111)) +1111);
            let texto = "Você solicitou verificação de email. Seu código de verificação gerado é " + code;

            transporter.sendMail({
                from: usuario,
                to: email,
                subject: "Verificação de usuário",
                text: texto
            })/* .then(info => {
                console.log(info)
            }).catch(error => {
                console.log(error)
            }) */

            let hashedPassword = await bcrypt.hash(senha, 8);

            db.query('INSERT INTO users SET ?', {email: email, senha: hashedPassword, token: code}, (error) => {
                if (error) {
                    console.log(error)
                }
            });

            res.render('verificação', {
                emailenv: email
            });
        }
    })
}

// LOGAR
exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT email, senha, verify FROM users WHERE email = ?', [email], async (error, results) => {
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
                        const acessToken = sign({ username: results[0].email}, process.env.TOKEN);
                        return acessToken;
                    }
                    const accessToken = createTokens(results[0].email)
    
                    res.cookie('access-token', accessToken, {
                        maxAge: 60*60*24*70*1000
                    })
    
                    res.render('index');
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

    db.query('SELECT email, token FROM users WHERE email = ?', [emaile], async (error, results) => {
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
                const acessToken = sign({ username: user}, process.env.TOKEN);
                return acessToken;
            }
            const accessToken = createTokens(results[0].email)

            res.cookie('access-token', accessToken, {
                maxAge: 60*60*24*70*1000
            })

            res.render('index');
            
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

    res.render('index');
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

exports.deletar = (req, res) => {
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    db.query('DELETE from users WHERE email = ?', [usuarioCookie.username], async (error, results) => {
        if (error) {
            console.log(error)
        }
        res.clearCookie('access-token')
        res.render('landing')
    });
}

exports.sair = (req, res) => {
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    res.clearCookie("access-token")
    res.render('landing')
}