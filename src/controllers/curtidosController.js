const curtidosModel = require('../models/curtidosModel');
const midiaModel = require('../models/midiaModel');

// POST /curtidos - Curtir uma mídia
const curtir = (req, res) => {
   const idUsuario = req.session.usuario.id;
   let idMidia;
if (req.body.id_midia != null && req.body.id_midia != "") {
      // mídia que já está no banco (ex: filme cadastrado pelo admin)
      const midia = midiaModel.getMidiaId(req.body.id_midia);
      if (!midia) {
         return res.status(404).json({ erro: 'Mídia não encontrada' });
      }
      idMidia = midia.id;
   } else {
      // mídia que vem de API: precisa dos dados para achar ou criar
      if (req.body.tipo == null || req.body.tipo == "") {
         return res.status(400).json({ erro: 'Tipo não informado' });
      }
      if (req.body.tipo !== "filme" && req.body.tipo !== "serie") {
         return res.status(400).json({ erro: 'Tipo válido não informado' });
      }
      if (req.body.id_externo == null || req.body.id_externo == "") {
         return res.status(400).json({ erro: 'id da mídia não informado' });
      }
      if (req.body.titulo == null || req.body.titulo == "") {
         return res.status(400).json({ erro: 'Título não informado' });
      }
      let origemApi = 'omdb';
      if (req.body.tipo === 'serie') {
         origemApi = 'tvmaze';
      }
      idMidia = midiaModel.acharOuCriarMidia({
         origem_api: origemApi,
         tipo: req.body.tipo,
         id_externo: req.body.id_externo,
         titulo: req.body.titulo
      });
   }

   if (curtidosModel.getCurtido(idUsuario, idMidia)) {
      return res.status(400).json({ erro: 'Mídia já curtida' });
   }
   const curtidos = curtidosModel.createCurtido(idUsuario, idMidia);
   res.status(201).json(curtidos);
};

const listar = (req, res) => {
   const idUsuario = req.session.usuario.id;
   const curtidos = curtidosModel.getCurtidosUsuario(idUsuario);
   res.status(200).json(curtidos); 
}

const descurtir = (req, res) => {
   const idUsuario = req.session.usuario.id;
   const idMidia = parseInt(req.params.id);

   if (!curtidosModel.getCurtido(idUsuario, idMidia)) {
      return res.status(404).json({ erro: 'Curtida não encontrada' });
   }
   const curtidos = curtidosModel.deleteCurtido(idUsuario, idMidia);
   res.status(200).json(curtidos);
};
module.exports = {
   curtir,
   listar,
   descurtir
};