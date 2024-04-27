const Resutado= require('../models').Resutado;
const  Detalle= require('../models').Detalle;
const Orden= require('../models').Orden;
const Examen= require('../models').Examen;
const Determinacion= require('../models').Determinacion;
const Referencia= require('../models').Referencia;

exports.listar= async (req, res) => {
    const id= req.params.id;
    const orden= await Orden.findByPk(id);
    const resultados= await Resutado.findAll({
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
