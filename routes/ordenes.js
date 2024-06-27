var express = require('express');
var router = express.Router();
var OrdenesController = require('../controllers/ordenes');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esAdmin = require('../middlewares/autenticacion').esAdmin;

/* GET users listing. */
router.get('/',estaAutenticado, OrdenesController.listar);

router.get('/crear/:id',estaAutenticado, esAdmin, OrdenesController.formCrear);

router.post('/',estaAutenticado, esAdmin, OrdenesController.agregar);

router.get('/actualizar/:id',estaAutenticado, esAdmin, OrdenesController.formActualizar);

router.post('/detalles/crear',estaAutenticado, esAdmin, OrdenesController.crearDetalle);

router.put('/:id',estaAutenticado, esAdmin, OrdenesController.actualizar);

//router.delete('/:id',estaAutenticado, esAdmin, OrdenesController.borrar);

module.exports = router;
