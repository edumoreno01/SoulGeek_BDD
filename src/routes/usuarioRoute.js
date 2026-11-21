const express = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/autenticacao');
const usuarioController = require('../controllers/usuarioController');

// Definindo as rotas para as operações CRUD

router.get('/', autenticacao.exigirAdmin, usuarioController.getAllUsuarios);
router.get('/sessao', usuarioController.sessao);
router.get('/:id', autenticacao.exigirProprioOuAdmin, usuarioController.getUsuarioId);
router.post('/', usuarioController.createUsuario );
router.delete('/:id', autenticacao.exigirProprioOuAdmin, usuarioController.deleteUsuario);
router.put('/:id', autenticacao.exigirProprioOuAdmin, usuarioController.atualizarUsuario);
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);

module.exports = router;
