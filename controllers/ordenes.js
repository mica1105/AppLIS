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