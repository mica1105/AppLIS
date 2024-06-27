var express = require('express');
var router = express.Router();
var DetallesController = require('../controllers/detalles');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esAdmin = require('../middlewares/autenticacion').esAdmin;
var esBioquico= require('../middlewares/autenticacion').esBioquico;

/* GET users listing. */
router.post('/',estaAutenticado, esAdmin, DetallesController.agregar);

router.put('/:id',estaAutenticado, esBioquico, DetallesController.actualizar);

router.delete('/:id',estaAutenticado, esAdmin, DetallesController.borrar);

module.exports = router;