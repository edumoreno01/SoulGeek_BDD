
const db = require('../dbSqlite');
const bcrypt = require('bcrypt');


const getAllUsuarios = () => {
    return db.prepare(`
        SELECT id_usuario AS id, nome, email, perfil
        FROM usuarios
    `).all();
};


const getUsuarioId = (id) => {
    return db.prepare(`
        SELECT id_usuario AS id, nome, email, perfil
        FROM usuarios
        WHERE id_usuario = ?
    `).get(id) || null;
};


const createUsuario = async (usuarioData) => {
    const { nome, email, senha } = usuarioData;

    if (
        typeof nome !== 'string' || !nome.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof senha !== 'string' || senha.length < 8
    ) {
        throw new Error('Dados inválidos. A senha deve ter pelo menos 8 caracteres.');
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const resultado = db.prepare(`
        INSERT INTO usuarios (nome, email, senha_hash, perfil)
        VALUES (?, ?, ?, 'comum')
    `).run(nome.trim(), email.trim(), senhaHash);

    return {
        id_usuario: Number(resultado.lastInsertRowid),
        nome: nome.trim(),
        email: email.trim(),
        perfil: 'comum'
    };
};


const getUsuarioEmail = (email) => {
    return db.prepare(`
        SELECT id_usuario AS id, nome, email, perfil
        FROM usuarios
        WHERE email = ? COLLATE NOCASE
    `).get(email) || null;
};

const getUsuarioNome = (nome) => {
    return db.prepare(`
        SELECT id_usuario AS id, nome, email, perfil
        FROM usuarios
        WHERE nome = ? COLLATE NOCASE
    `).get(nome) || null;
};

const contarAdmins = () => {
    const resultado = db.prepare(`
        SELECT COUNT(*) AS total
        FROM usuarios
        WHERE perfil = 'admin'
    `).get();

    return resultado.total;
};


const deleteUsuario = (id) => {
    const usuario = getUsuarioId(id);

    if (!usuario) {
        return null;
    }

    if (usuario.perfil === 'admin' && contarAdmins() <= 1) {
        return false;
    }

    db.prepare(`
        DELETE FROM usuarios
        WHERE id_usuario = ?
    `).run(id);

    return true;
};


const atualizarUsuario = (usuarioData) => {
    const { id, nome, email } = usuarioData;

    const usuario = getUsuarioId(id);

    if (!usuario) {
        return null;
    }

    db.prepare(`
        UPDATE usuarios
        SET nome = ?, email = ?
        WHERE id_usuario = ?
    `).run(nome, email, id);

    return getUsuarioId(id);
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
};