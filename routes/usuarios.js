var express = require('express');
var router = express.Router();
var UsuarioController = require('../controllers/usuarios');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esAdmin = require('../middlewares/autenticacion').esAdmin;

/* GET users listing. */
router.get('/',estaAutenticado, esAdmin, UsuarioController.listar);

router.get('/perfil',estaAutenticado, UsuarioController.perfil);

router.get('/crear', estaAutenticado,esAdmin, UsuarioController.formCrear);

router.post('/',estaAutenticado,esAdmin, UsuarioController.agregar);

router.get('/:id',estaAutenticado,esAdmin, UsuarioController.formActualizar);

router.put('/:id',estaAutenticado,esAdmin, UsuarioController.actualizar);

router.delete('/:id',estaAutenticado,esAdmin, UsuarioController.borrar);

module.exports = router;
