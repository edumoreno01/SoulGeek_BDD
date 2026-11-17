
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const caminhoBanco = path.join(__dirname, '../database/soulgeek.db');

const db = new DatabaseSync(caminhoBanco);

db.exec('PRAGMA foreign_keys = ON;');

module.exports = db;
