const { where } = require('sequelize');
const Usuario = require('../models').Usuario;
const Resultado= require('../models').Resultado;
const Paciente= require('../models').Paciente;
const  Detalle= require('../models').Detalle;
const Orden= require('../models').Orden;
const Examen= require('../models').Examen;
const Determinacion= require('../models').Determinacion;
const Referencia= require('../models').Referencia;


exports.listar= async (req, res) => {

    const id= req.params.id;
    const orden= await Orden.findByPk(id);
    const resultados= await Resultado.findAll({
        include: [Detalle,Examen,Determinacion,Referencia]
    },{
        where: {ordenId: id}
    });
    res.render('./resultados/', {
        title: 'Resultados de Orden NRO: '+ id,
        resultados: resultados,
        orden: orden
    });
};

exports.detalles= async(req,res)=> {
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const id= req.params.id;
    const orden= await Orden.findByPk(id);
    const detalles= await Detalle.findAll({
        where: {ordenId: id}, 
        include: [{ model: Examen, include: [Determinacion] }]
    });
    const paciente= await orden.getPaciente();
    res.render("./resultados/gestion",{
        title: "Gestion de Resultados de Examenes",
        detalles: detalles,
        orden: orden,
        paciente: paciente,
        usuario: usuario
    });
};

exports.formVerResultados= async (req, res) => {
    const id= req.params.id;
    const detalle= await Detalle.findOne({where: {id: id}, include:[Examen]});
    const resultados= await Resultado.findAll({
        include: [{ model: Determinacion, include: [Referencia] }]
    },{
        where: {detalleId: detalle.id}
    });
    res.render('./resultados/ver', {
        title: 'Resultados de Orden NRO: '+ id,
        resultados: resultados,
        detalle: detalle,
        ordenId: detalle.ordenId
    });
}

exports.cargarResultado= async (req, res) => {
    const ordenId= req.params.ordenId;
    const detalleId= req.params.detalleId;
    const detalle= await Detalle.findByPk(detalleId);
    const examen= await Examen.findOne({where:{id: detalle.examenId},  include: [{ model: Determinacion, include: [Referencia] }]});
    const orden= await Orden.findOne({where:{id: ordenId}, include: [Paciente] });
    res.render('./resultados/cargar', {
        title: 'Resultados de Examenes',
        examen: examen,
        detalle: detalle,
        orden: orden
    });
};

exports.agregar = async (req, res) => {
    try {
        // Busca al usuario por su email en la sesión
        const usuario = await Usuario.findOne({ where: { email: req.session.usuario } });

        // Extrae los datos necesarios del cuerpo de la solicitud
        const ordenId = req.body.ordenId;
        const detalleId = req.body.detalleId;
        const cantResultados = req.body.cant;

        // Crea un array para almacenar las promesas de creación de resultados
        const promesas = [];

        // Itera sobre la cantidad de resultados y crea los registros de resultados
        for (let i = 1; i < cantResultados; i++) {
            const valor = req.body[`valor${i}`];
            const determinacionId = req.body[`determinacion${i}`];

            // Crea el resultado y guarda la promesa en el array
            promesas.push(
                Resultado.create({
                    detalleId,
                    valor,
                    determinacionId,
                    usuarioId: usuario.id
                })
            );
        }

        // Espera a que se completen todas las promesas de creación de resultados
        await Promise.all(promesas);

        // Redirige a la página de detalles de resultados
        res.redirect(`/resultados/gestion/${ordenId}`);
    } catch (error) {
        console.error('Error al agregar resultados:', error);
        res.status(500).send('Error al agregar resultados');
    }
};

