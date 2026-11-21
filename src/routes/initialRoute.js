const express = require('express');
const router = express.Router();

const initialController = require('../controllers/initialController');

// Definindo as rotas para as operações CRUD

// Página Inicial
router.get('/', initialController.paginaInicial);

// Outras Paginas
router.get('/filmes', (req, res) => {
    res.render('filme', { paginaAtual: 'filmes' });
});

router.get('/series', (req, res) => {
    res.render('serie', { paginaAtual: 'series' });
});

router.get('/perfil', (req, res) => {
    res.render('perfil', { paginaAtual: 'perfil' });
});

router.get('/atores', (req, res) => {
    res.render('ator', { paginaAtual: 'atores' });
});

router.get('/sobre', (req, res) => {
    res.render('sobre', { paginaAtual: 'sobre' });
});

router.get('/midias', (req, res) => {
    res.render('media', { paginaAtual: 'midias' });
});

router.get('/detalhes-filme', (req, res) => {
    res.render('mediaFilme', { paginaAtual: 'detalhes-filme' });
});

module.exports = router;
