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
            let hashedPassword = await bcrypt.hash(senha, 8);

            db.query('INSERT INTO users SET ?', {email: email, senha: hashedPassword}, (error, results) => {
                if (error) {
                    console.log(error)
                }

                console.log('Conta criada com sucesso!')

                const createTokens = (user) => {
                    const acessToken = sign({ username: results[0].email}, "AFAE3765FGHSGA63");
                    return acessToken;
                }
                const accessToken = createTokens(results[0].email)

                res.cookie('access-token', accessToken, {
                    maxAge: 60*60*24*70*1000
                })

                res.render('index');
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

                const createTokens = (user) => {
                    const acessToken = sign({ username: results[0].email}, "AFAE3765FGHSGA63");
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
