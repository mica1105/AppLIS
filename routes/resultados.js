var express = require('express');
var router = express.Router();
var ResultadosController = require('../controllers/resultados');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;

/* GET users listing. */
router.get('/:id',estaAutenticado, ResultadosController.listar);

module.exports = router;