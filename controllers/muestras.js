const Muestra= require('../models').Muestra;
const Tipo= require('../models').Tipo;
const EstadoMuestra= require('../models').EstadoMuestra;
const Orden= require('../models').Orden;
const Usuario= require('../models').Usuario;
const Paciente= require('../models').Paciente;
const PDF= require('pdfkit');



exports.listar= async (req, res) => {
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const muestras= await Muestra.findAll({
        include: [{ model: Orden, include: [Paciente] }, Tipo, EstadoMuestra],
        where: {ordenId: req.params.id}
    });
    res.render('./muestras/', {
        title: 'Etiquetas de Muestras',
        muestras: muestras,
        usuario: usuario,  
    });
};

exports.crear= async (req, res) => {
    let id= req.body.ordenId;
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    const muestra= await Muestra.create({
        tipoId: req.body.tipoId,
        estadoMuestraId: req.body.estado,
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
    res.redirect('/ordenes/actualizar/'+id);
};

exports.actualizar= async (req, res) => {
    const id= req.params.id;
    await Muestra.update({
        estadoMuestraId: req.body.estado,
        usuarioId: req.session.usuario
    },{
        where: {id: id}
    });
    const muestras= await Muestra.findAll({
        include: [Tipo,Usuario,Orden,Paciente,EstadoMuestra]
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
    const orden= muestra.ordenId;
    await muestra.destroy();
    res.redirect('/ordenes/actualizar/'+ orden);
};

exports.etiqueta= async (req, res) => {
    const id= req.params.id;
    const muestra= await Muestra.findOne({
        where: {id: id},
        include: [{ model: Orden, include: [Paciente] }, Tipo]
    });
    if(muestra.ordenId==null){
        res.send('La muestra no tiene una orden asignada');
    }  
    else{
        
        const doc= new PDF({ bufferPages: true, size: 'A7' , margin: 5, aligments: 'center'});
        const filename= 'etiqueta+' + req.params.id + Date.now()+'.pdf';
        const stream= res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="'+ filename +'"'
        });
        doc.on('data', (data) => {
            stream.write(data);
        });
        doc.on('end', () => {
            stream.end();
        });
        doc
        .fontSize(10)
        .text('ETIQUETA DE MUESTRAS', 5, 10, { align: 'center' })
        .fontSize(8)
        .text('PACIENTE: '+ muestra.Orden.Paciente.nombre + ' ' + muestra.Orden.Paciente.apellido, 5, 35, { align: 'center' })
        .fontSize(8)
        .text('DNI: ' + muestra.Orden.Paciente.dni, 5, 55, { align: 'center' })
        .fontSize(8)
        .text('TIPO DE MUESTRA: ' + muestra.Tipo.descripcion, 5, 75, { align: 'center' })
        .fontSize(8)
        .text('FECHA: ' + muestra.getFormattedDate(muestra.fecha), 5, 95, { align: 'center' });
        doc.rect(doc.x, 2, 195, doc.y).stroke();
        doc.end();
    }
    
}
