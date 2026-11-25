/*IMPORTANTE!!!
usuarios:   id, nome (único), email (único), senha, perfil ('admin' ou 'comum')
curtidos:   id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
watchlist:  id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
avaliacoes: id_usuario, id_midia, tipo, nota, review   (chave composta id_usuario + id_midia)
*/


const db = require('../db');
const bcrypt = require('bcrypt');

const getUsuarioLogin = (email) => {
   return db.prepare('SELECT id_usuario AS id, nome, email, perfil, senha_hash FROM usuarios WHERE email = ? COLLATE NOCASE').get(email);
};

const getAllUsuarios = () => {
   return db.prepare('SELECT id_usuario AS id, nome, email, perfil FROM usuarios').all();
};

const getUsuarioId = (id) => {
   return db.prepare('SELECT id_usuario AS id, nome, email, perfil FROM usuarios WHERE id_usuario = ?').get(id);
};

const getUsuarioEmail = (email) => {
   return db.prepare('SELECT id_usuario AS id, nome, email, perfil FROM usuarios WHERE email = ? COLLATE NOCASE').get(email);
};

const getUsuarioNome = (nome) => {
   return db.prepare('SELECT id_usuario AS id, nome, email, perfil FROM usuarios WHERE nome = ? COLLATE NOCASE').get(nome);
};

const contarAdmins = () => {
   const resultado = db.prepare('SELECT COUNT(*) AS total FROM usuarios WHERE perfil = ?').get('admin');
   return resultado.total;
};


const createUsuario = (usuarioData) => {
   const senhaHash = bcrypt.hashSync(usuarioData.senha, 10);
   db.prepare('INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)').run(usuarioData.nome, usuarioData.email, senhaHash, 'comum');
   return getUsuarioEmail(usuarioData.email);
};

const deleteUsuario = (id) => {
   const usuario = getUsuarioId(id);
   if (!usuario) {
      return null;
   }
   if (usuario.perfil === 'admin' && contarAdmins() <= 1) {
      return false;
   }
   db.prepare('DELETE FROM usuarios WHERE id_usuario = ?').run(id);
   return getUsuarioId(id);
};

const atualizarUsuario = (usuarioData) => {
   const usuarioExistente = getUsuarioId(usuarioData.id);
   if (!usuarioExistente) {
      return null;
   }
   db.prepare('UPDATE usuarios SET nome = ?, email = ? WHERE id_usuario = ?').run(usuarioData.nome, usuarioData.email, usuarioData.id);
   return getUsuarioId(usuarioData.id);
};

const atualizarSenha = (id, senha) => {
  const hash = bcrypt.hashSync(senha, 10);
  db.prepare('UPDATE usuarios SET senha_hash = ? WHERE id_usuario = ?').run(hash, id);
};

module.exports = {
   getUsuarioLogin,
   getAllUsuarios,
   getUsuarioId,
   getUsuarioEmail,
   getUsuarioNome,
   contarAdmins,
   createUsuario,
   deleteUsuario,
   atualizarUsuario,
   atualizarSenha
}
