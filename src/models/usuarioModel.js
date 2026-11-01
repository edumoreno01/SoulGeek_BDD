/*IMPORTANTE!!!
usuarios:   id, nome (único), email (único), senha, perfil ('admin' ou 'comum')
curtidos:   id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
watchlist:  id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
avaliacoes: id_usuario, id_midia, tipo, nota, review   (chave composta id_usuario + id_midia)
*/

let usuarios = [
  { id: 1, nome: 'Admin', email: 'admin@soulgeek.com', senha: '123456', perfil: 'admin' }
];

const getAllUsuarios = () => usuarios;

const getUsuarioId = (id) => usuarios.find(usuario => usuario.id === parseInt(id));

const getUsuarioEmail = (email) => usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());

const getUsuarioNome = (nome) => usuarios.find(usuario => usuario.nome.toLowerCase() === nome.toLowerCase());

const createUsuario = (usuarioData) => {
    if (getUsuarioEmail(usuarioData.email)) {
        return "email_repetido";
    }
    if (getUsuarioNome(usuarioData.nome)) {
        return "nome_repetido";
    }
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
   const indice = usuarios.indexOf(usuario);  
   if (indice !== -1){   
      usuarios.splice(indice, 1);
      return usuarios;  
   }  
   else {
      return null;
   }
   
 };

 const atualizarUsuario = (usuarioData) => {
   
    const usuarioExistente = getUsuarioId(usuarioData.id);

   if (!usuarioExistente) {
      return null;
   }
   
   if (usuarioData.email !== undefined && usuarioData.email !== "") {
      const donoEmail = getUsuarioEmail(usuarioData.email);
      if (donoEmail && donoEmail.id !== usuarioExistente.id) {
         return "email_repetido";
      }
   }

   if (usuarioData.nome !== undefined && usuarioData.nome !== "") {
      const donoNome = getUsuarioNome(usuarioData.nome);
      if (donoNome && donoNome.id !== usuarioExistente.id) {
         return "nome_repetido";
      }
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
    createUsuario,
    deleteUsuario,
    atualizarUsuario
 }