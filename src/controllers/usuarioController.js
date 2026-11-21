const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

// GET /usuarios - Listar todas os usuarios
const getAllUsuarios = (req, res) => {
   const usuarios = usuarioModel.getAllUsuarios();
   res.status(200).json(usuarios);
};

// GET /usuarios/:id - Obter um usuario específica
const getUsuarioId = (req, res) => {
   const id = parseInt(req.params.id);
   const usuario = usuarioModel.getUsuarioId(id);

   if (!usuario) {
      // status é fundamental na API RESTful - código padronizado, confiável e profissional
      // define o código status HTTP que será enviado junto com a resposta
      /* Códigos HTTP
         200 OK -> requisição bem-sucedida (GET, PUT, DELETE bem feitos)
         201 Created -> Recurso criado com sucesso (POST)
         204 No Content -> Exclusão bem-sucedida, sem corpo de resposta
         400 Bad request -> Cliente enviou dados inválidos
         404 Not found -> Recurso não encontrado
         500 Internet Server Error -> Erro inesperado no servidor
      */
      return res.status(404).json({ erro: 'Usuário não encontrado' });
   }
   res.json(usuario);
}


// POST /usuarios - Criar um novo usuario
const createUsuario = (req, res) => {
   if(req.body.email == null || req.body.email == ""){
        return res.status(400).json({ erro: 'Digite um email' });
    }
    if(req.body.nome == null || req.body.nome == ""){
        return res.status(400).json({ erro: 'Digite um nome' });
    }
    if(req.body.senha == null || req.body.senha == ""){
        return res.status(400).json({ erro: 'Digite uma senha' });
    }
    if (usuarioModel.getUsuarioEmail(req.body.email)) {
        return res.status(400).json({ erro: 'Email repetido' });
    }
    if (usuarioModel.getUsuarioNome(req.body.nome)) {
        return res.status(400).json({ erro: 'Nome repetido' });
    }
    
    const createusuario = usuarioModel.createUsuario(req.body);
   res.status(201).json(createusuario);
};

// DELETE /usuarios/:id - Deletar uma tarefa
const deleteUsuario = (req, res) => {
   const usuariodeletada = usuarioModel.deleteUsuario(req.params.id);
   if (usuariodeletada === null) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
   }
   if (usuariodeletada === false){
        return res.status(400).json({ erro: 'Não pode não existir usuários admins' });
   }
   res.status(204).send();
};


// PUT /usuarios/:id - Atualizar uma tarefa
const atualizarUsuario = (req, res) => {
   const usuarioexistente = usuarioModel.getUsuarioId(req.params.id);
   if (!usuarioexistente){
    return res.status(404).json({ erro: 'Usuário não encontrado' });
   }
   if (req.body.email === undefined || req.body.email == ""){
    return res.status(400).json({ erro: 'Digite um email' });
   }
   if (req.body.nome === undefined || req.body.nome == ""){
    return res.status(400).json({ erro: 'Digite um nome' });
   }
   const donoEmail = usuarioModel.getUsuarioEmail(req.body.email);
   if (donoEmail && donoEmail.id !== usuarioexistente.id ){
    return res.status(400).json({ erro: 'Email repetido' });
   }
   const donoNome = usuarioModel.getUsuarioNome(req.body.nome);
   if (donoNome && donoNome.id !== usuarioexistente.id ){
    return res.status(400).json({ erro: 'Nome repetido' });
   }
   const dados = {
    id: req.params.id,
    nome:req.body.nome,
    email: req.body.email
   };
    const usuarioatualizada = usuarioModel.atualizarUsuario(dados);
   res.json(usuarioatualizada);
};

const login = (req, res) => {
   if (req.body.email === undefined || req.body.email == "") {
      return res.status(400).json({ erro: 'Digite email' });
   }
   if (req.body.senha === undefined || req.body.senha == "") {
      return res.status(400).json({ erro: 'Digite senha' });
   }
   const usuario = usuarioModel.getUsuarioLogin(req.body.email);
   if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
   }
   const senhaCorreta = bcrypt.compareSync(req.body.senha,usuario.senha_hash);
   if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
   }
   req.session.usuario = { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil };
   res.status(200).json({ id: usuario.id, nome: usuario.nome, perfil: usuario.perfil });
};

const logout = (req, res) => {
   req.session.destroy(() => {
      res.status(200).json({erro: 'Logout realizado'});
   });
};

const sessao = (req, res) => {
   if (!req.session.usuario) {
      return res.status(401).json({ erro: 'Não logado' });
   }
   res.status(200).json(req.session.usuario);
};

module.exports = {
   getAllUsuarios,
   getUsuarioId,
   createUsuario,
   deleteUsuario,
   atualizarUsuario,
   login,
   logout,
   sessao
};
