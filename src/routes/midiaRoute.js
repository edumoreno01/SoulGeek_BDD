const express = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/autenticacao');
const midiaController = require('../controllers/midiaController');

router.get('/',  midiaController.getAllMidias);
router.get('/:id', midiaController.getMidiaId);
router.post('/', autenticacao.exigirAdmin, midiaController.createMidia );
router.delete('/:id', autenticacao.exigirAdmin, midiaController.deleteMidia);
router.put('/:id', autenticacao.exigirAdmin, midiaController.atualizarMidia);

module.exports = router;
