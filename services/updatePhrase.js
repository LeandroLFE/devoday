const fs = require("fs");

const localDbPath = `${__dirname}/../localdb.json`;

let dbContent = fs.readFileSync(localDbPath, "utf8");
let db = JSON.parse(dbContent);

const getPhrase = () => {
  const fun = require('../bibliaAPI/class');
  const antigo = require('../bibliaAPI/textosAntigo');
  const novo = require('../bibliaAPI/textosNovo');

  let variTest = Math.floor(Math.random() * 2); // Escolhe qual das duas variáveis usar
  let liv;
  let cap;
  let versI;
  let versF;

  if (variTest == 0) {
    liv = Math.floor(Math.random() * antigo.livros.length) // Escolhe o livro
    cap = Math.floor(Math.random() * (antigo.livros[liv].capitulos - 1) + 1) // Escolhe o capítulo
    versI = Math.floor(Math.random() * (antigo.livros[liv].leitura[cap]["versi"] - 1) + 1) // Escolhe o versículo
    versF = Math.floor(Math.random() * (antigo.livros[liv].leitura[cap]["versi"] - versI) + versI); // Escolhe o versículo

    return fun.agrupar(antigo.livros[liv], cap, versI, versF)

  } else {
    liv = Math.floor(Math.random() * novo.livros.length) // Escolhe o livro
    cap = Math.floor(Math.random() * (novo.livros[liv].capitulos - 1) + 1) // Escolhe o capítulo
    versI = Math.floor(Math.random() * (novo.livros[liv].leitura[cap]["versi"] - 1) + 1) // Escolhe o versículo
    versF = Math.floor(Math.random() * (novo.livros[liv].leitura[cap]["versi"] - versI) + versI); // Escolhe o versículo

    return fun.agrupar(novo.livros[liv], cap, versI, versF)
  }
};

const updatePhrase = () => {
  const data = JSON.parse(fs.readFileSync("localdb.json", "utf8"));
  data.phrase.text = getPhrase();
  data.phrase.lastUpdate = new Date().toISOString();
  fs.writeFileSync(`${__dirname}/../localdb.json`, JSON.stringify(data));
};

const verifyTimeLeft = () => {
  const lastUpdate = new Date(db.phrase.lastUpdate);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - lastUpdate.getTime());
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hoursDiff >= 24) {
    updatePhrase();
  }
};

// Verifica a cada 3 horas (reduza caso o servidor desligue com menos tempo)
setInterval(() => verifyTimeLeft(), 
// @param ms - s - m - h
1000 * 60 * 60 * 3);
