var express = require('express');
var router = express.Router();
var ResultadosController = require('../controllers/resultados');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;

/* GET users listing. */
router.get('/gestion/:id',estaAutenticado,ResultadosController.detalles);

router.get('/cargar/:ordenId/:detalleId',estaAutenticado,ResultadosController.cargarResultado);

router.get('/:id',estaAutenticado, ResultadosController.formVerResultados);

router.post('/',estaAutenticado, ResultadosController.agregar);


module.exports = router;