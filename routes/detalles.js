var express = require('express');
var router = express.Router();
var ExamenesController = require('../controllers/examenes');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;

/* GET users listing. */
router.post('/',estaAutenticado, ExamenesController.agregar);

router.delete('/:id',estaAutenticado, ExamenesController.borrar);

module.exports = router;