/*IMPORTANTE!!!
usuarios:   id, nome (único), email (único), senha, perfil ('admin' ou 'comum')
curtidos:   id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
watchlist:  id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
avaliacoes: id_usuario, id_midia, tipo, nota, review   (chave composta id_usuario + id_midia)
*/

let usuarios = [
   { id: 1, nome: 'Admin', email: 'admin@soulgeek.com', senha: '123456', perfil: 'admin' },
   { id: 2, nome: 'Comum', email: 'comum@soulgeek.com', senha: '654321', perfil: 'comum' }
];

const db = require('../db');

const getAllUsuarios = () => db.prepare('SELECT * FROM usuarios').all();

const getUsuarioId = (id) => usuarios.find(usuario => usuario.id === parseInt(id));

const getUsuarioEmail = (email) => usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());

const getUsuarioNome = (nome) => usuarios.find(usuario => usuario.nome.toLowerCase() === nome.toLowerCase());

const contarAdmins = () => usuarios.filter(usuario => usuario.perfil.toLowerCase() === 'admin').length;

const createUsuario = (usuarioData) => {
   const newUsuario = {
      id: usuarios.length > 0 ? Math.max(...usuarios.map(t => t.id)) + 1 : 1,
      nome: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      perfil: 'comum'
   };
   usuarios.push(newUsuario);
   return usuarios;
};

const deleteUsuario = (id) => {

   const usuario = getUsuarioId(id);

   if (!usuario) {
      return null;
   }

   const totalAdmins = contarAdmins();
   if (usuario.perfil === 'admin' && totalAdmins === 1) {
      return false;
   }

   const indice = usuarios.indexOf(usuario);
   usuarios.splice(indice, 1);
   return usuarios;
};

const atualizarUsuario = (usuarioData) => {
   const usuarioExistente = getUsuarioId(usuarioData.id);

   if (!usuarioExistente) {
      return null;
   }

   if (usuarioData.email !== undefined && usuarioData.email !== "") {
      usuarioExistente.email = usuarioData.email;
   }

   if (usuarioData.nome !== undefined && usuarioData.nome !== "") {
      usuarioExistente.nome = usuarioData.nome;
   }

   return usuarios;
};

module.exports = {
   getAllUsuarios,
   getUsuarioId,
   getUsuarioEmail,
   getUsuarioNome,
   contarAdmins,
   createUsuario,
   deleteUsuario,
   atualizarUsuario
}
