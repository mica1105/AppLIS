var express = require('express');
var router = express.Router();
var OrdenesController = require('../controllers/ordenes');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;

/* GET users listing. */
router.get('/',estaAutenticado, OrdenesController.listar);

router.get('/crear/:id',estaAutenticado, OrdenesController.formCrear);

router.post('/',estaAutenticado, OrdenesController.agregar);

router.get('/actualizar/:id',estaAutenticado, OrdenesController.formActualizar);

router.post('/detalles/crear',estaAutenticado, OrdenesController.crearDetalle);

router.put('/:id',estaAutenticado, OrdenesController.actualizar);

//router.delete('/:id',estaAutenticado, OrdenesController.borrar);

module.exports = router;
