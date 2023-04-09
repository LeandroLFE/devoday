const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            let hashedPassword = await bcrypt.hash(senha, 8);

            db.query('INSERT INTO users SET ?', {email: email, senha: hashedPassword}, (error, results) => {
                if (error) {
                    console.log(error)
                }

                console.log('Conta criada com sucesso!')
                res.render('home');
            })
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
                console.log('Conta acessada com sucesso!')
                res.render('home');
                
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