var express = require('express');
var router = express.Router();
var MuestrasController = require('../controllers/muestras');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esAdmin = require('../middlewares/autenticacion').esAdmin;

/* GET users listing. */
router.get('/:id',estaAutenticado, MuestrasController.listar);

router.get('/etiqueta/:id',estaAutenticado, esAdmin, MuestrasController.etiqueta);

router.post('/',estaAutenticado, esAdmin, MuestrasController.crear);

router.put('/:id',estaAutenticado, MuestrasController.actualizar);

router.delete('/:id',estaAutenticado,esAdmin, MuestrasController.borrar);

module.exports = router;