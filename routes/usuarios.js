var express = require('express');
var router = express.Router();
var UsuarioController = require('../controllers/usuarios');
var estaAutenticado = require('../middlewares/autenticacion').verificaToken;
var esAdmin = require('../middlewares/autenticacion').esAdmin;

/* GET users listing. */
router.get('/',estaAutenticado, esAdmin, UsuarioController.listar);

router.get('/perfil',estaAutenticado, UsuarioController.perfil);

router.get('/crear', UsuarioController.formCrear);

router.post('/', UsuarioController.agregar);

router.get('/:id',estaAutenticado, UsuarioController.formActualizar);

router.put('/:id',estaAutenticado, UsuarioController.actualizar);

router.delete('/:id',estaAutenticado, UsuarioController.borrar);

module.exports = router;
