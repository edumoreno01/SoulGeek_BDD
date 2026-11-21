const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

// Definindo as rotas para as operações CRUD

router.get('/', usuarioController.getAllUsuarios);
router.get('/sessao', usuarioController.sessao);
router.get('/:id', usuarioController.getUsuarioId);
router.post('/', usuarioController.createUsuario ); // falta implementar
router.delete('/:id', usuarioController.deleteUsuario);
router.put('/:id', usuarioController.atualizarUsuario);
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);

module.exports = router;
