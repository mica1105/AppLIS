var express = require('express');
var router = express.Router();
var ResultadosController = require('../controllers/resultados');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esTecOBioq = require('../middlewares/autenticacion').esTecOBioq;
var esTecnico = require('../middlewares/autenticacion').esTecnico;


/* GET users listing. */
router.get('/gestion/:id',estaAutenticado, esTecOBioq ,ResultadosController.detalles);

router.get('/cargar/:ordenId/:detalleId', esTecnico ,estaAutenticado,ResultadosController.cargarResultado);

router.get('/:id',estaAutenticado, esTecOBioq ,ResultadosController.formVerResultados);

router.get('/informe/:id',estaAutenticado, ResultadosController.informe);

router.post('/',estaAutenticado, esTecnico, ResultadosController.agregar);

router.put('/:id/:det',estaAutenticado, esTecOBioq, ResultadosController.actualizar);

router.delete('/:id',estaAutenticado, esTecOBioq,ResultadosController.eliminar);

module.exports = router;