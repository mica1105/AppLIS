const bcrypt = require('bcrypt');
const Usuario= require('../models').Usuario;
const Rol = require('../models').Rol;

exports.listar= async (req, res) => {
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const usuarios= await Usuario.findAll({include:Rol});
    res.render('./usuarios/', {
        title: 'Gestion de Usuarios',
        usuarios: usuarios,
        usuario: usuario
    });
};

exports.perfil= async (req,res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    res.render('./usuarios/perfil', {
        title: 'Perfil de Usuario',
        usuario: usuario
    });
}

exports.formCrear= async (req, res) => {
    res.render('./usuarios/registro', {
        title: 'Crear Usuario'
    });
};

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
};

exports.formActualizar= async (req, res) => {
    const id= req.params.id;
    const usuario= await Usuario.findByPk(id);
    res.render('./usuarios/registro', {
        title: 'Actualizar Usuario',
        usuario: usuario
    });
};

exports.actualizar= async (req, res) => {
    const id= req.params.id;
    await Usuario.update({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email
    },{
        where: {id: id}
    });
    const usuario= await Usuario.findByPk(id);
    const usuarios = await Usuario.findAll({include: [Rol]});
    res.render('./usuarios/', {
        title: 'Gestion de Usuario',
        usuarios:usuarios,
        mensaje: 'Usuario NRO: '+ usuario.id +' Actualizado'
    });    
}

exports.borrar= async (req, res) => {
    const id= req.params.id;
    const usuario= await Usuario.findByPk(id);
    await usuario.destroy();
    const usuarios = await Usuario.findAll({include: [Rol]});
    res.render('./usuarios/', {
        title: 'Gestion de Usuario',
        usuarios:usuarios,
        mensaje: 'Usuario Borrado'
    });
};


