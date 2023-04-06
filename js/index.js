const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'devo-login'
})

db.connect( (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Mysql conectado!')
    }
});

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>")
})

app.listen(3000, () => {
    console.log("Servidor ligado")
})

/*
POST => inserir
GET => Buscar um/mais
PUT => alterar
DELETE => remover
*/