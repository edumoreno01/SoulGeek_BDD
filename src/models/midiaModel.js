const db = require('../db');

const getMidiaExterna = (origem_api, tipo, id_externo) => {
   return db.prepare('SELECT id_midia AS id, id_externo, tipo, origem_api, titulo FROM midias WHERE origem_api = ? AND tipo = ? AND id_externo = ?').get(origem_api, tipo, String(id_externo));
};

const createMidiaExterna = (dados) => {
   return db.prepare('INSERT INTO midias (id_externo, tipo, origem_api, titulo, poster) VALUES (?, ?, ?, ?, ?)').run(String(dados.id_externo), dados.tipo, dados.origem_api, dados.titulo, dados.poster || null);
}

const acharOuCriarMidia = (dados) => {
   const midia = getMidiaExterna(dados.origem_api, dados.tipo, dados.id_externo);
   if (midia) {
      return midia.id;
   }
   const resultado = createMidiaExterna(dados);
   return resultado.lastInsertRowid;
};

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
   getMidiaExterna,
   createMidiaExterna,
   acharOuCriarMidia,
    getAllMidias,
    getMidiaId,
    createMidia,
    atualizarMidia,
    deleteMidia
}
