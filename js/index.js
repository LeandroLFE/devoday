const express = require('express');

const app = express();

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