var express = require('express');
var router = express.Router();
var ExamenesController = require('../controllers/examenes');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;

/* GET users listing. */
router.get('/',estaAutenticado, ExamenesController.listar);

router.get('/:id/:ordenId',estaAutenticado, ExamenesController.agregarADetalle);

router.get('/insertar', estaAutenticado, ExamenesController.formCrear);

router.get('/:id', estaAutenticado, ExamenesController.formActualizar);

router.post('/',estaAutenticado, ExamenesController.agregarExamen);

router.post('/agregarDet',estaAutenticado, ExamenesController.agregarDeterminacion);

router.post('/agregarRef',estaAutenticado, ExamenesController.agregarReferencia);

router.put('/:id',estaAutenticado, ExamenesController.actualizar);

router.delete('/:id',estaAutenticado, ExamenesController.borrar);

module.exports = router;