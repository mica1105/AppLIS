var express = require('express');
var router = express.Router();
var PacienteController = require('../controllers/pacientes');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esAdmin = require('../middlewares/autenticacion').esAdmin;

/* GET users listing. */
router.get('/',estaAutenticado, esAdmin , PacienteController.listar);

router.get('/perfil',estaAutenticado, PacienteController.perfil);

router.get('/inicio',estaAutenticado, PacienteController.inicio);

router.get('/resultados/:id',estaAutenticado, PacienteController.resultados);

router.post('/buscar',estaAutenticado, esAdmin, PacienteController.buscar);

router.get('/crear',estaAutenticado,esAdmin, PacienteController.formCrear);

router.post('/',estaAutenticado, esAdmin ,PacienteController.agregar);

router.get('/:id',estaAutenticado, esAdmin, PacienteController.formActualizar);

router.put('/:id',estaAutenticado, esAdmin, PacienteController.actualizar);

router.delete('/:id',estaAutenticado, esAdmin, PacienteController.borrar);

module.exports = router;