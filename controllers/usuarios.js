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
    const roles= await Rol.findAll();
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    res.render('./usuarios/registro', {
        title: 'Crear Usuario',
        roles: roles,
        usuario: usuario
    });
};

exports.agregar= async (req, res) => {
    const usuario= await Usuario.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        rolId: req.body.rol
    });
    const salt= await bcrypt.genSalt(10);
    usuario.password= await bcrypt.hash(usuario.password, salt);
    const usuarios = await Usuario.findAll({include: [Rol]});
    await usuario.save();
    res.render('./usuarios/', {
        title: 'Gestion de Usuario',
        usuarios:usuarios,
        codigo: 'success',
        mensaje: 'Usuario Creado',
        usuario: usuario
    });
};

exports.formActualizar= async (req, res) => {
    const id= req.params.id;
    const roles= await Rol.findAll();
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    const usuarioM= await Usuario.findByPk(id);
    res.render('./usuarios/registro', {
        title: 'Actualizar Usuario',
        roles: roles,
        usuarioM: usuarioM,
        usuario: usuario
    });
};

exports.actualizar= async (req, res) => {
    const id= req.params.id;
    await Usuario.update({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        rolId: req.body.rol
    },{
        where: {id: id}
    });
    const usuario= await Usuario.findByPk(id);
    const usuarios = await Usuario.findAll({include: [Rol]});
    res.render('./usuarios/', {
        title: 'Gestion de Usuario',
        usuarios:usuarios,
        codigo: 'success',
        mensaje: 'Usuario NRO: '+ usuario.id +' Actualizado',
        usuario: usuario
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
        codigo: 'error',
        mensaje: 'Usuario Borrado',
        usuario: usuario
    });
};


