const db = require('../db');

const getAllMidias = () => {
   return db.prepare('SELECT id_midia AS id, id_externo, tipo, origem_api, titulo, poster, sinopse, genero, ano FROM midias').all();
};

const getMidiaId = (id) => {
   return db.prepare('SELECT id_midia AS id, id_externo, tipo, origem_api, titulo, poster, sinopse, genero, ano FROM midias WHERE id_midia = ?').get(id);
};

const createMidia = (midiaData) => {
   db.prepare('INSERT INTO midias (tipo, titulo, poster, sinopse, genero, ano, criado_por) VALUES (?, ?, ?, ?, ?, ?, ?)').run(midiaData.tipo, midiaData.titulo, midiaData.poster || null , midiaData.sinopse || null, midiaData.genero || null, midiaData.ano || null, midiaData.criado_por);
   return getAllMidias();
};

const atualizarMidia = (midiaData) => {
   const midiaExistente = getMidiaId(midiaData.id);
   if (!midiaExistente) {
      return null;
   }
   db.prepare('UPDATE midias SET titulo = ?, tipo = ?, poster = ?, sinopse = ?, genero = ?, ano = ? WHERE id_midia = ?').run(midiaData.titulo, midiaData.tipo, midiaData.poster || null, midiaData.sinopse || null, midiaData.genero || null, midiaData.ano || null, midiaData.id);
   return getAllMidias();
};

const deleteMidia = (id) => {
   const midia = getMidiaId(id);
   if (!midia) {
      return null;
   }
   db.prepare('DELETE FROM midias WHERE id_midia = ?').run(id);
   return getAllMidias();
};

module.exports = {
    getAllMidias,
    getMidiaId,
    createMidia,
    atualizarMidia,
    deleteMidia
}
