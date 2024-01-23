const bcrypt = require('bcrypt');
const Usuario= require('../models').Usuario;
const Rol = require('../models').Rol;

exports.listar= async (req, res) => {
    const usuarios = await Usuario.findAll({include: [Rol]});
    res.render('./usuarios/', {
        title: 'Gestion de Usuario',
        usuarios:usuarios
    });
}
exports.formCrear= async (req, res) => {
    res.render('./usuarios/registro', {
        title: 'Crear Usuario'
    });
}

exports.agregar= async (req, res) => {
    let rol= 1;
    const usuario= await Usuario.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        rolId: rol
    });
    const salt= await bcrypt.genSalt(10);
    usuario.password= await bcrypt.hash(usuario.password, salt);
    await usuario.save();
    res.render('./', {
        success: 'success',
        mensaje: 'Usuario Creado'
    });
}