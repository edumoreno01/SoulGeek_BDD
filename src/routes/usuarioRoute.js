const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

// Definindo as rotas para as operações CRUD

router.get('/', usuarioController.getAllUsuarios);
router.get('/usuario/:id', usuarioController.getUsuarioId);
router.post('/usuario', usuarioController.createUsuario ); // falta implementar
router.delete('/usuario/:id', usuarioController.deleteUsuario);
router.put('/usuario/:id', usuarioController.atualizarUsuario);
module.exports = router;
