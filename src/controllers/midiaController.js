const midiaModel = require('../models/midiaModel');

const getAllMidias = (req, res) => {
   const midias = midiaModel.getAllMidias();
   res.status(200).json(midias);
};

const getMidiaId = (req, res) => {
   const id = parseInt(req.params.id);
   const midia = midiaModel.getMidiaId(id);

   if (!midia) {
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
      return res.status(404).json({ erro: 'Mídia não encontrada' });
   }
   res.json(midia);
}

const createMidia = (req, res) => {
   if(req.body.tipo == null || req.body.tipo == ""){
        return res.status(400).json({ erro: 'Digite um tipo' });
    }
    if(req.body.tipo !== "filme" && req.body.tipo !== "serie"){
        return res.status(400).json({ erro: 'Digite um tipo válido' });
    }
    if(req.body.titulo == null || req.body.titulo == ""){
        return res.status(400).json({ erro: 'Digite um titulo' });
    }
    const dados = {
    tipo: req.body.tipo,
    titulo:req.body.titulo,
    poster: req.body.poster,
    sinopse: req.body.sinopse,
    genero: req.body.genero,
    ano: req.body.ano,
    criado_por: req.session.usuario.id
   };
    const createmidia = midiaModel.createMidia(dados);
   res.status(201).json(createmidia);
};

const deleteMidia = (req, res) => {
   const midiaatual = midiaModel.getMidiaId(req.params.id)
   if (!midiaatual) {
      return res.status(404).json({ erro: 'Mídia não encontrada' });
   }
   if(midiaatual.origem_api !== "local"){
    return res.status(403).json({ erro: 'Acesso proibido' });
   }
   const midiadeletada = midiaModel.deleteMidia(req.params.id);
   res.status(204).send();
   };

const atualizarMidia = (req, res) => {
   const midiaexistente = midiaModel.getMidiaId(req.params.id);
   if (!midiaexistente){
    return res.status(404).json({ erro: 'Mídia não encontrada' });
   }
   if(midiaexistente.origem_api !== "local"){
        return res.status(403).json({ erro: 'Acesso proibido' });
    }
   if (req.body.titulo === undefined || req.body.titulo == ""){
    return res.status(400).json({ erro: 'Digite um título' });
   }
   if (req.body.tipo === undefined || req.body.tipo == ""){
    return res.status(400).json({ erro: 'Digite um tipo' });
   }
   if(req.body.tipo !== "filme" && req.body.tipo !== "serie"){
        return res.status(400).json({ erro: 'Digite um tipo válido' });
    }
    
    const dados = {
    id: req.params.id,
    tipo: req.body.tipo,
    titulo:req.body.titulo,
    poster: req.body.poster,
    sinopse: req.body.sinopse,
    genero: req.body.genero,
    ano: req.body.ano
   };
   const midiaatualizada = midiaModel.atualizarMidia(dados);
   res.json(midiaatualizada);
   };
    


module.exports = {
   getAllMidias,
   getMidiaId,
   createMidia,
    deleteMidia,
    atualizarMidia
};
