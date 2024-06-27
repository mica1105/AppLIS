const Detalle= require('../models').Detalle;
const Examen= require('../models').Examen;
const Orden= require('../models').Orden;
const Muestra= require('../models').Muestra;
const Determinacion= require('../models').Determinacion;
const Referencia= require('../models').Referencia;


exports.agregar= async (req, res) => {
    const detalle= Detalle.create({
        ordenId: req.body.ordenId,
        examenId: req.body.examenId,
        muestraId: req.body.muestraId,
    })
    await detalle.save();
    res.redict('/examenes/'+detalle.muestraId+'/'+detalle.ordenId);
}

exports.borrar= async (req, res) => {
    const id= req.params.id;
    const detalle= await Detalle.findOne({where: {examenId: id}});
    await detalle.destroy();
    res.redict('/ordenes/'+detalle.ordenId);
}

exports.actualizar= async (req, res) => {
    try{
        const id= req.params.id;
        const detalle= await Detalle.findByPk(id);
        await detalle.update({
            validado: true,
        });
        res.redirect('/resultados/'+detalle.id);
    } catch (error) {
        console.error('Error al actualizar detalle:', error);
        res.status(500).send('Error al actualizar detalle');
    }
}
