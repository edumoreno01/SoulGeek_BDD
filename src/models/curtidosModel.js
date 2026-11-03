/*IMPORTANTE!!!
usuarios:   id, nome (único), email (único), senha, perfil ('admin' ou 'comum')
curtidos:   id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
watchlist:  id_usuario, id_midia, tipo   (chave composta id_usuario + id_midia)
avaliacoes: id_usuario, id_midia, tipo, nota, review   (chave composta id_usuario + id_midia)
*/

let curtidos = [
    {id_usuario: 1, id_midia: "tt0096895", tipo: "filme"},
    {id_usuario: 1, id_midia: "tt0196895", tipo: "filme"}
];

const getAllCurtidos = () => curtidos;

const getCurtidoId = (id) => curtidos.find(curtidos => curtidos.id === parseInt(id));

const getCurtidoFilme = (id) => curtidos.find(curtido => curtido.id === parseInt(id));
