
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const caminhoBanco = path.join(__dirname, 'soulgeek.db');
const db = new DatabaseSync(caminhoBanco);

db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        senha_hash TEXT NOT NULL,
        perfil TEXT NOT NULL DEFAULT 'comum'
            CHECK (perfil IN ('admin', 'comum'))
    );

    CREATE TABLE IF NOT EXISTS midias (
        id_midia INTEGER PRIMARY KEY AUTOINCREMENT,
        id_externo TEXT NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('filme', 'serie')),
        origem_api TEXT NOT NULL,
        titulo TEXT NOT NULL,
        UNIQUE (origem_api, tipo, id_externo)
    );

    CREATE TABLE IF NOT EXISTS curtidos (
        id_usuario INTEGER NOT NULL,
        id_midia INTEGER NOT NULL,
        PRIMARY KEY (id_usuario, id_midia),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        FOREIGN KEY (id_midia) REFERENCES midias(id_midia)
    );

    CREATE TABLE IF NOT EXISTS watchlist (
        id_usuario INTEGER NOT NULL,
        id_midia INTEGER NOT NULL,
        PRIMARY KEY (id_usuario, id_midia),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        FOREIGN KEY (id_midia) REFERENCES midias(id_midia)
    );

    CREATE TABLE IF NOT EXISTS avaliacoes (
        id_usuario INTEGER NOT NULL,
        id_midia INTEGER NOT NULL,
        nota INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
        review TEXT,
        PRIMARY KEY (id_usuario, id_midia),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        FOREIGN KEY (id_midia) REFERENCES midias(id_midia)
    );
`);

console.log('Banco SQLite criado com sucesso!');
console.log('Tabelas:', db.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'"
).all().map(tabela => tabela.name));

db.close();
