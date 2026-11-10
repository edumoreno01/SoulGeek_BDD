// db.js
const Database = require('better-sqlite3');
const db = new Database('meubanco.db');

// Opcional: já deixa a tabela criada aqui para garantir
db.exec(`
   CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      perfil TEXT NOT NULL
   )
`);

// Exporta a conexão pronta
module.exports = db;
