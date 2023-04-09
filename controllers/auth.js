const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body)

    const { email, senha } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            return res.render('login', {
                message: 'Este email já está em uso.'
            })
        } else {
            let hashedPassword = await bcrypt.hash(senha, 8, (err, hash) => {
                if (error) {
                    console.log(error)
                }
            });

            db.query('INSERT INTO users SET ?', {email: email, senha: hashedPassword}, (error, results) => {
                if (error) {
                    console.log(error)
                }
            })
        }
    })
}