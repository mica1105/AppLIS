var express = require('express');
var router = express.Router();
var PacienteController = require('../controllers/pacientes');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;

/* GET users listing. */
router.get('/',estaAutenticado, PacienteController.listar);

router.get('/perfil',estaAutenticado, PacienteController.perfil);

router.post('/buscar',estaAutenticado, PacienteController.buscar);

router.get('/crear',estaAutenticado, PacienteController.formCrear);

router.post('/',estaAutenticado, PacienteController.agregar);

router.get('/:id',estaAutenticado, PacienteController.formActualizar);

router.put('/:id',estaAutenticado, PacienteController.actualizar);

router.delete('/:id',estaAutenticado, PacienteController.borrar);

module.exports = router;