var express = require('express');
var router = express.Router();
var ExamenesController = require('../controllers/examenes');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esTecnico = require('../middlewares/autenticacion').esTecnico;

/* GET users listing. */
router.get('/',estaAutenticado, esTecnico, ExamenesController.listar);

router.get('/:id/:ordenId',estaAutenticado, ExamenesController.agregarADetalle);

router.get('/insertar', estaAutenticado, esTecnico, ExamenesController.formCrear);

router.get('/:id', estaAutenticado, esTecnico, ExamenesController.formActualizar);

router.post('/',estaAutenticado, esTecnico, ExamenesController.agregarExamen);

router.post('/agregarDet',estaAutenticado, esTecnico, ExamenesController.agregarDeterminacion);

router.post('/agregarRef',estaAutenticado, esTecnico, ExamenesController.agregarReferencia);

router.put('/:id',estaAutenticado, esTecnico, ExamenesController.actualizar);

router.delete('/:id',estaAutenticado, esTecnico, ExamenesController.borrar);

module.exports = router;