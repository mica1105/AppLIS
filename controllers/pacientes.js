const bcrypt = require('bcrypt');
const Paciente= require('../models').Paciente;
const Usuario = require('../models').Usuario;

exports.listar= async (req, res) => {
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const pacientes = await Paciente.findAll();
    res.render('./pacientes/', {
        title: 'Gestion de paciente',
        usuario: usuario,
        pacientes:pacientes
    });
};
exports.perfil= async (req,res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const paciente= await Paciente.findOne({where:{email: email}});
    res.render('./pacientes/perfil', {
        title: 'Perfil de Pacientes',
        paciente: paciente
    });
}

exports.formCrear= async (req, res) => {
    res.render('./pacientes/registro', {
        title: 'Crear paciente'
    });
};

exports.agregar= async (req, res) => {
    const paciente= await Paciente.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNac: req.body.fechaNac,
        sexo: req.body.sexo,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
    });
    const salt= await bcrypt.genSalt(10);
    paciente.password= await bcrypt.hash(paciente.password, salt);
    await paciente.save();
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    const pacientes = await Paciente.findAll();
    res.render('./pacientes/', {
        success: 'success',
        mensaje: 'Paciente Creado',
        title: 'Gestion de paciente',
        usuario: usuario,
        pacientes:pacientes
    });
};

exports.formActualizar= async (req, res) => {
    const id= req.params.id;
    const paciente= await Paciente.findByPk(id);
    res.render('./pacientes/registro', {
        title: 'Actualizar paciente',
        paciente: paciente
    });
};

exports.actualizar= async (req, res) => {
    const id= req.params.id;
    const paciente= await Paciente.findByPk(id);

    await Paciente.update({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNac: req.body.fechaNac,
        sexo: req.body.sexo,
        telefono: req.body.telefono,
        email: req.body.email
    },{
    },{
        where: {id:id}
    });
    
    const pacientes = await Paciente.findAll();
    res.render('./pacientes/', {
        title: 'Gestion de paciente',
        pacientes:pacientes,
        success: 'success',
        mensaje: 'paciente NRO: '+ paciente.id +' Actualizado'
    });    
}

exports.borrar= async (req, res) => {
    const id= req.params.id;
    const paciente= await Paciente.findByPk(id);
    await paciente.destroy();
    const pacientes = await Paciente.findAll();
    res.render('./pacientes/', {
        title: 'Gestion de paciente',
        pacientes:pacientes,
        success: 'success',
        mensaje: 'paciente Borrado'
    });
};
