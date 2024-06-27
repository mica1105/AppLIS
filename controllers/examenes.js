
const Usuario = require('../models').Usuario;
const Examen = require('../models').Examen;
const Determinacion = require('../models').Determinacion;
const Referencia = require('../models').Referencia;
const Muestra = require('../models').Muestra;
const Orden = require('../models').Orden;

exports.listar= async (req, res) => {
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const examenes = await Examen.findAll({include: [{ model: Determinacion, include: [Referencia] }],});
    res.render('./examenes/', {
        title: 'Gestion de Examenes',
        usuario: usuario,
        examenes: examenes
    });
};

exports.agregarADetalle= async (req, res) => {
    const id= req.params.id;
    const muestra= await Muestra.findByPk(id);
    const ordenId= req.params.ordenId;
    const orden= await Orden.findByPk(ordenId);
    const examenes = await Examen.findAll({
        include: [Determinacion, Referencia],
    });
    res.render('./examenes/', {
        title: 'Seleccione los Examenes a Realizar para la Orden NRO:' + ordenId,
        examenes: examenes,
        muestra: muestra,
        orden: orden
    });
};

exports.formCrear= async (req, res) => {
    res.render('./examenes/crear', {
        title: 'Crear Nuevo Examen'
    });
};

exports.agregarExamen= async (req, res) => {
    const examen= await Examen.create({
        nombre: req.body.nombre,
        disponible: req.body.disponible
    });
    await examen.save();
    res.redirect('/examenes/' + examen.id);
};

exports.formActualizar= async (req, res) => {
    const id= req.params.id;
    const examen= await Examen.findByPk(id);
    const determinaciones = await Determinacion.findAll({include:[Referencia], where: {examenId: id}});
    res.render('./examenes/crear', {
        title: 'Examen',
        examen: examen,
        determinaciones: determinaciones
    });
}

exports.actualizar= async (req, res) => {
    const id= req.params.id;
    const examen= await Examen.findByPk(id);
    await examen.update({
        nombre: req.body.nombre,
        disponible: req.body.disponible
    });
    res.redirect('/examenes/' + examen.id);
}

exports.agregarDeterminacion= async (req, res) => {
    const id= req.body.examenId;
    const determinacion=await Determinacion.create({
        dato: req.body.dato,
        medida: req.body.medida,
        examenId: id
    })
    determinacion.save();
    res.redirect('/examenes/' + id);
}

exports.agregarReferencia= async (req, res) => {
    const id= req.body.determinacionId;
    let edad= req.body.edad;
    let sexo= req.body.sexo;
    if(edad==''){
        edad= null;
    }
    if(sexo=='Sin Referencia'){
        sexo= null;        
    }
    
    const referencia=await Referencia.create({
        edad: edad,
        sexo: sexo,
        min: req.body.min,
        max: req.body.max,
        determinacionId: id
    })
    
    referencia.save();
    const determinacion= await Determinacion.findByPk(id);
    res.redirect("/examenes/"+determinacion.examenId);
}

exports.borrar= async (req, res) => {
    const id= req.params.id;
    const examen= await Examen.findByPk(id);
    const determinaciones = await Determinacion.findAll({where: {examenId: id}});
    for(let det of determinaciones){
        const referencias = await Referencia.findAll({where: {determinacionId: det.id}});
        for(let ref of referencias){
            await ref.destroy();
        }
        await det.destroy();
    }
    await examen.destroy();
    res.redirect('/examenes/');
}