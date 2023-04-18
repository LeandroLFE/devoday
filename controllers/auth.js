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

// REGISTRAR
exports.register = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT email, senha FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            res.render('cadastro', {
                message: 'Este email já está cadastrado'
            })
        
        } else {
            const nodemailer = require('nodemailer');
            const usuario = "devodaysuporte@gmail.com"
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: usuario,
                    pass: process.env.EMAILS
                }
            })

            let code = Math.floor((Math.random() * (9999-1111)) +1111);
            let texto = "Seu código é " + code;

            transporter.sendMail({
                from: usuario,
                to: email,
                subject: "TÍTULO",
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

    db.query('SELECT email, senha FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {

            if (await bcrypt.compare(senha, results[0].senha)) {
                const createTokens = (user) => {
                    const acessToken = sign({ username: results[0].email}, process.env.TOKEN);
                    return acessToken;
                }
                const accessToken = createTokens(results[0].email)

                res.cookie('access-token', accessToken, {
                    maxAge: 60*60*24*70*1000
                })

                res.render('index');
                
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
    const { codeE, emailENV } = req.body;

    db.query('SELECT email, token FROM users WHERE email = ?', [emailENV], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (codeE == results[0].token) {
            db.query('UPDATE users SET verify = 1 WHERE email = ?', [emailENV], async (error, results) => {
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
            res.render('cadastro', {
                message: "Código de verificação inválido, tente novamente"
            })
        };
    })
};