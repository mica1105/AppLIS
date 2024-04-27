const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const Orden= require('../models').Orden;
const Detalle= require('../models').Detalle;
const Estado= require('../models').Estado;
const Examen= require('../models').Examen;
const Muestra= require('../models').Muestra;
const Referencia= require('../models').Referencia;
const Determinacion= require('../models').Determinacion;
const Tipo= require('../models').Tipo;
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
    const ordenes = await Orden.findAll({include: [Paciente,Usuario,Detalle,Estado]});
    res.render('./ordenes/', {
        title: 'Gestion de paciente',
        usuario: usuario,
        ordenes:ordenes
    });
};

exports.formCrear= async (req, res) => {
    const id= req.params.id;
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    const paciente= await Paciente.findByPk(id);
    const todosExamenes= await Examen.findAll({});
    const Tipos= await Tipo.findAll({});
    res.render('./ordenes/crear', {
        title: 'Crear orden',
        usuario: usuario,
        paciente:paciente,
        todosExamenes:todosExamenes,
        tiposMuestras:Tipos
    });
}

exports.agregar= async (req, res) => {
    let fEntrega= new Date();
    fEntrega.setDate(fEntrega.getDate() + 5);
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    const orden= await Orden.create({
        pacienteId: req.body.pacienteId,
        usuarioId: usuario.id,
        estadoId: 1,
        medico: req.body.medico,
        diagnostico: req.body.diagnostico,
        fechaEntrega: fEntrega
    });
    await orden.save();
    res.redirect('./ordenes/actualizar/'+orden.id);
}

exports.formActualizar= async (req, res) => {
    const id= req.params.id;
    const orden= await Orden.findByPk(id);
    const detalles= await Detalle.findAll({where: {ordenId: id}, include: [{ model: Examen, include: [Determinacion] }]});
    const paciente= await Paciente.findByPk(orden.pacienteId);
    const todosExamenes= await Examen.findAll({});
    const muestras= await Muestra.findAll({where: {ordenId: id}, include: [Tipo,Usuario]});
    const tipos= await Tipo.findAll();
    res.render('./ordenes/crear', {
        title: 'Actualizar orden',
        orden:orden,
        paciente:paciente,
        detalles:detalles,
        muestras:muestras,
        todosExamenes:todosExamenes,
        tiposMuestras:tipos
    });
}
exports.actualizar= async (req, res) => {
    const id= req.params.id;
    const orden= await Orden.findByPk(id,{include: [Paciente]});
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    await orden.update({
        pacienteId: req.body.pacienteId,
        usuarioId: usuario.id,
        estadoId: 1,
        medico: req.body.medico,
        diagnostico: req.body.diagnostico,
        fechaEntrega: fEntrega
    });
    res.redirect('./ordenes/actualizar/'+orden.id);
}

exports.crearDetalle= async (req, res) => {
    const id= req.body.ordenId;
    const detalle= await Detalle.create({
        OrdenId: id,
        ExamenId: req.body.examenId
    });
    await detalle.save();
    res.redirect('./ordenes/actualizar/'+id);
}

