var express = require('express');
var router = express.Router();
var MuestrasController = require('../controllers/muestras');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;

/* GET users listing. */
router.get('/:id',estaAutenticado, MuestrasController.listar);

router.get('/muestra/:id',estaAutenticado, MuestrasController.buscar);

router.get('/cargar/:id',estaAutenticado, MuestrasController.formCrear);

router.post('/',estaAutenticado, MuestrasController.crear);

router.get('/actualizar/:id',estaAutenticado, MuestrasController.formActualizar);

router.put('/:id',estaAutenticado, MuestrasController.actualizar);

router.delete('/:id',estaAutenticado, MuestrasController.borrar);

module.exports = router;