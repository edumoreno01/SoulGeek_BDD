const db = require('../db');

const getCurtidosUsuario = (id_usuario) => {
   return db.prepare('SELECT m.id_midia AS id, m.id_externo, m.tipo, m.origem_api, m.titulo, m.poster FROM curtidos AS c INNER JOIN midias AS m ON c.id_midia = m.id_midia WHERE c.id_usuario = ?').all(id_usuario);
};

const getCurtido = (id_usuario, id_midia) => {
   return db.prepare('SELECT id_usuario, id_midia FROM curtidos WHERE id_usuario = ? AND id_midia = ?').get(id_usuario, id_midia);
};

const createCurtido = (id_usuario, id_midia) => {
    db.prepare('INSERT INTO curtidos (id_usuario, id_midia) VALUES(?, ?)').run(id_usuario, id_midia);
    return getCurtidosUsuario(id_usuario);
};

const deleteCurtido = (id_usuario, id_midia) => {
    db.prepare('DELETE FROM curtidos WHERE id_usuario = ? AND id_midia = ?').run(id_usuario, id_midia);
    return getCurtidosUsuario(id_usuario);
};

module.exports = {
    getCurtidosUsuario,
    getCurtido,
    createCurtido,
    deleteCurtido
}