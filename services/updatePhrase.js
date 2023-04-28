const fs = require("fs");

const localDbPath = `${__dirname}/../localdb.json`;

let dbContent = fs.readFileSync(localDbPath, "utf8");
let db = JSON.parse(dbContent);

const getPhrase = () => {
  // Faça a rota da api para coletar a frase aqui e retorne ela.
  const phrases = [
    "O Senhor é meu pastor e nada me faltará.",
    "Deus é amor.",
    "Tudo posso naquele que me fortalece.",
    "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
    "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
};

const updatePhrase = () => {
  const data = JSON.parse(fs.readFileSync("dblocal.json", "utf8"));
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
setInterval(verifyTimeLeft(), 
// @param ms - s - m - h
1000 * 60 * 60 * 3);
