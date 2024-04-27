const Muestra= require('../models').Muestra;
const Tipo= require('../models').Tipo;
const Orden= require('../models').Orden;
const Usuario= require('../models').Usuario;
const Paciente= require('../models').Paciente;
const Examen= require('../models').Examen;
const Determinacion= require('../models').Determinacion;

exports.listar= async (req, res) => {
    const muestras= await Muestra.findAll({
        include: [Tipo,Usuario,Orden,Paciente]
    });
    res.render('./muestras/', {
        title: 'Gestion de Muestras',
        muestras: muestras
    });
};

exports.buscar= async (req, res) => {
    const id= req.params.id;
    const muestra= await Muestra.findByPk(id);
    res.render('./muestras/detalle', {
        title: 'Etiquera de Muestra',
        muestra: muestra
    })
};

exports.detalle= async (req, res) => {
    
};

exports.formCrear= async (req, res) => {
    const id= req.params.id;
    const orden= await Orden.findByPk(id,{include: [Paciente]});
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    const Tipos= await Tipo.findAll();
    res.render('./muestras/cargar', {
        title: 'Cargar muestra',
        orden:orden,
        usuario: usuario,
        Tipos: Tipos
    })
};

exports.crear= async (req, res) => {
    let id= req.body.ordenId;
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    const muestra= await Muestra.create({
        tipoId: req.body.tipoId,
        estado: req.body.estado,
        usuarioId: usuario.id,
        ordenId: id
    });
    await muestra.save();
    if(muestra.estado==true){
        await Orden.update({
            estadoId: 2
        },{
            where: {id: id}
        });
    }
    res.redict('./ordenes/actualizar/'+ muestra.ordenId);
};

exports.formActualizar= async (req, res) => {
    const id= req.params.id;
    const muestra= await Muestra.findByPk(id);
    const Tipos= await Tipo.findAll();
    const orden= await Orden.findByPk(muestra.ordenId);
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    res.render('./muestras/actualizar', {
        title: 'Actualizar muestra',
        muestra: muestra,
        Tipos: Tipos,
        orden: orden,
        usuario: usuario
    })
};

exports.actualizar= async (req, res) => {
    const id= req.params.id;
    await Muestra.update({
        estado: req.body.estado,
        usuarioId: req.session.usuario
    },{
        where: {id: id}
    });
    const muestras= await Muestra.findAll({
        include: [Tipo,Usuario,Orden,Paciente]
    });
    res.render('./muestras/', {
        title: 'Gestion de Muestras',
        muestras: muestras,
        codigo: 'success',
        mensaje: 'Muestra NRO: '+ id +' Actualizada'
    });   
};

exports.borrar= async (req, res) => {
    const id= req.params.id;
    const muestra= await Muestra.findByPk(id);
    await muestra.destroy();
    const muestras= await Muestra.findAll({
        include: [Tipo,Usuario,Orden,Paciente]
    });
    res.render('./muestras/', {
        title: 'Gestion de Muestras',
        muestras: muestras,
        success: 'success',
        mensaje: 'Muestra Borrada'
    });    
};


