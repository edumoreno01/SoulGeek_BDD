const usuarioModel = require('../models/usuarioModel');

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
      return res.status(404).json({ erro: 'Usuário não encontrada' });
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
      return res.status(404).json({ erro: 'Usuário não encontrada' });
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
    return res.status(404).json({ erro: 'Usuário não encontrada' });
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

module.exports = {
   getAllUsuarios,
   getUsuarioId,
   createUsuario,
   deleteUsuario,
   atualizarUsuario,
};
