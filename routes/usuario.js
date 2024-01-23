var express = require('express');
var router = express.Router();
var UsuarioController = require('../controllers/usuarios');

/* GET users listing. */
router.get('/', UsuarioController.listar);
router.get('/crear', UsuarioController.formCrear);
router.post('/', UsuarioController.agregar);

module.exports = router;
