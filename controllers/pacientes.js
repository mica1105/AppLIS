const bcrypt = require('bcrypt');
const Paciente= require('../models').Paciente;
const Orden= require('../models').Orden;
const Detalle= require('../models').Detalle;
const Resultado= require('../models').Resultado;
const Examen= require('../models').Examen;
const Determinacion= require('../models').Determinacion;
const Referencia= require('../models').Referencia;
const Usuario = require('../models').Usuario;
const Estado = require('../models').Estado;

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
        title: 'Gestion de Pacientes',
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

exports.inicio= async (req,res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const paciente= await Paciente.findOne({where:{email: email}});
    const ordenes = await Orden.findAll({
        where: { pacienteId: paciente.id },
        include: [Estado]
    });    

    res.render('./pacientes/inicial', {
        title: 'Portal Paciente',
        paciente: paciente,
        ordenes: ordenes
    });
}

exports.buscar= async (req,res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    let dni= 0;
    if(req.body.dni!== ""){
        dni= req.body.dni;
        const paciente = await Paciente.findOne({where:{dni: dni}});
        if(paciente){
            const pacientes=[];
            pacientes.push(paciente);
            res.render('./pacientes/', {
                title: 'Gestion de paciente',
                usuario: usuario,
                pacientes:pacientes,
                codigo: 'success',
                mensaje: 'Paciente encontrado'   
            });
        }
        const pacientes = await Paciente.findAll();
        res.render('./pacientes/', {
            title: 'Gestion de paciente',
            usuario: usuario,
            pacientes:pacientes,
            codigo: 'error',
            mensaje: 'Paciente no encontrado'    
        });
        
    }
    if(req.body.dni=== ""){
        const pacientes = await Paciente.findAll();
        res.render('./pacientes/', {
            title: 'Gestion de paciente',
            usuario: usuario,
            pacientes:pacientes,
            codigo: 'error',
            mensaje: 'Ingrese el dni del paciente'    
        });
    }
    
}

exports.resultados= async (req,res) => {
    const id= req.params.id;
    const orden = await Orden.findOne({where:{id: id}, include: [Examen] });
    const detalles= await Detalle.findAll({
        where: {ordenId: orden.id}, 
        include:[{
            model: Resultado, 
            include: [{ 
                model: Determinacion, 
                include: [Referencia] 
            }]
        }]});
    const paciente= await Paciente.findOne({where:{email: req.session.usuario}});
    res.render('./resultados/ver', {
        title: 'Resultados de Orden NRO: '+ id,
        detalles: detalles,
        orden: orden,
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
        codigo: 'success',
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
    try {
        const id= req.params.id;
        const paciente= await Paciente.findByPk(id);
        const resultado = await Paciente.update({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fechaNac: req.body.fechaNac,
            sexo: req.body.sexo,
            telefono: req.body.telefono,
            email: req.body.email
        },{
            where: {id:id}
        });

        const pacientes = await Paciente.findAll();
        const usuario= await Usuario.findOne({where:{email: req.session.usuario}});

        if (resultado[0] === 0) {
            res.render('./pacientes/', {
                title: 'Gestion de Pacientes',
                usuario: usuario,
                pacientes:pacientes,
                codigo: 'error',
                mensaje: 'paciente NRO: '+id +' no encontrado'
            });
        }

        res.render('./pacientes/', {
            title: 'Gestion de Pacientes',
            usuario: usuario,
            pacientes:pacientes,
            codigo: 'success',
            mensaje: 'paciente NRO: '+ paciente.id +' Actualizado'
        }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error del servidor' });
    }
};


exports.borrar= async (req, res) => {
    const id= req.params.id;
    const paciente= await Paciente.findByPk(id);
    await paciente.destroy();
    const pacientes = await Paciente.findAll();
    res.render('./pacientes/', {
        title: 'Gestion de paciente',
        pacientes:pacientes,
        codigo: 'success',
        mensaje: 'paciente Borrado'
    });
};
