const express = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/autenticacao');
const curtidosController = require('../controllers/curtidosController');

router.post('/', autenticacao.exigirLogin, curtidosController.curtir );
router.get('/', autenticacao.exigirLogin, curtidosController.listar );
router.delete('/:id', autenticacao.exigirLogin, curtidosController.descurtir );
module.exports = router;