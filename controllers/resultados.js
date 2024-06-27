const { where, and } = require('sequelize');
const Usuario = require('../models').Usuario;
const Resultado= require('../models').Resultado;
const Paciente= require('../models').Paciente;
const  Detalle= require('../models').Detalle;
const Orden= require('../models').Orden;
const Examen= require('../models').Examen;
const Determinacion= require('../models').Determinacion;
const Referencia= require('../models').Referencia;
const PDFDocument = require('pdfkit-table');
const resultado = require('../models/resultado');


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
        pacienteO: paciente,
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
    const usuario= await Usuario.findOne({where:{email: req.session.usuario}});
    res.render('./resultados/ver', {
        title: 'Resultados de Orden NRO: '+ id,
        resultados: resultados,
        detalle: detalle,
        usuario: usuario
    });
}

exports.cargarResultado= async (req, res) => {
    try {
        const ordenId = req.params.ordenId;
        const detalleId = req.params.detalleId;

        const detalle = await Detalle.findByPk(detalleId);
        const resultados = await Resultado.findAll({ where: { detalleId: detalleId } });

        if (resultados.length > 0) {
            res.status(400).send('Ya hay resultados cargados para este detalle.');
        } else {
            
            const examen = await Examen.findOne({
                where: { id: detalle.examenId },
                include: [{ model: Determinacion, include: [Referencia] }]
            });
            const orden = await Orden.findOne({
                where: { id: ordenId },
                include: [Paciente]
            });

            res.render('./resultados/cargar', {
                title: 'Resultados de Examenes',
                examen: examen,
                detalle: detalle,
                orden: orden
            });
        }
    } catch (error) {
        console.error('Error al cargar resultados:', error);
        res.status(500).send('Error al cargar resultados');
    }
};

exports.agregar = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { email: req.session.usuario } });
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
                    validado: false,
                    determinacionId,
                    usuarioId: usuario.id
                })
            );
        }

        // Espera a que se completen todas las promesas de creación de resultados
        await Promise.all(promesas);

        res.redirect(`/resultados/gestion/${ordenId}`);
    } catch (error) {
        console.error('Error al agregar resultados:', error);
        res.status(500).send('Error al agregar resultados');
    }
};

exports.actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const determinacionId = req.params.det;
        console.log("determinacion id: "+determinacionId);
        const resultado = await Resultado.findOne({ where: { id: id, determinacionId: determinacionId } });
        await resultado.update({ valor: req.body.valor});
        const detalle= await Detalle.findOne({where: {id: resultado.detalleId}});
        res.redirect('/resultados/'+detalle.id);
    } catch (error) {
        console.error('Error al actualizar resultado:', error);             
        res.status(500).send('Error al actualizar resultado');
    }
};

exports.eliminar = async (req, res) => {
    try {
        const id = req.params.id;
        const resultados = await Resultado.findAll({ where: { detalleId: id } });
        for (let resultado of resultados) {
            await resultado.destroy();
        }
        res.redirect('/resultados/'+id);
    } catch (error) {
        console.error('Error al eliminar resultado:', error);             
        res.status(500).send('Error al eliminar resultado');
    }
};

exports.informe = async (req, res) => {
    try {
        const id = req.params.id;

        // Obtener la orden y el paciente asociado
        const orden = await Orden.findOne({
            where: { id: id },
            include: [Paciente]
        });

        if (!orden) {
            return res.status(404).send('Orden no encontrada');
        }

        // Obtener los detalles y los exámenes asociados
        const detalles = await Detalle.findAll({
            where: { ordenId: orden.id},
            include: [Examen]
        });

        if (!detalles.length) {
            return res.status(404).send('Detalles no encontrados');
        }

        // Crear el documento PDF con márgenes
        const doc = new PDFDocument({ 
            bufferPages: true, 
            size: 'A4', 
            margins: { top: 50, bottom: 50, left: 50, right: 50 },
            alignments: 'center' 
        });
        const filename = `informe_${req.params.id}_${Date.now()}.pdf`;

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`
        });

        doc.pipe(res);

        const fechaActual = new Date();
        const fecha = fechaActual.toLocaleDateString();
        const hora = fechaActual.toLocaleTimeString();

        // Encabezado del documento
        doc
            .fontSize(20)
            .text(`INFORME DE RESULTADOS DE LABORATORIO`, { align: 'center' })
            .moveDown()
            .fontSize(14);

            doc.text(`PACIENTE: ${orden.Paciente.nombre} ${orden.Paciente.apellido}`, { continued: true });
            doc.text(`DNI: ${orden.Paciente.dni}`, { align: 'right' });
    
            // Escribir el número de orden y la fecha en la misma línea
            doc.text(`N° ORDEN: ${orden.id}`, { continued: true });
            doc.text(`FECHA: ${fecha} HORA: ${hora}`, { align: 'right' });
            doc.moveDown();

        // Tabla de resultados
        for (const detalle of detalles) {
            const resultados = await Resultado.findAll({
                where: { detalleId: detalle.id },
                include: [{ model: Determinacion, include: [Referencia] }]
            });

            doc
                .fontSize(14)
                .text(`EXAMEN: ${detalle.Examen.nombre}`, { align: 'left' })
                .moveDown();

            const table = {
                headers: ['Determinación', 'Valor', 'Medida', 'Referencia'],
                rows: []
            };

            for (const resultado of resultados) {
                const determinacion = resultado.Determinacion;
                const referencias = determinacion.Referencia;
                const valor = resultado.valor;

                let referenciaTexto = '';
                for (const referencia of referencias) {
                    if (referencia.edad == null && referencia.sexo == null) {
                        referenciaTexto += `Valor Max: ${referencia.max} - Valor Min: ${referencia.min}\n`;
                    } else if (referencia.edad != null) {
                        referenciaTexto += `En ${referencia.edad}, Valor Max: ${referencia.max} - Valor Min: ${referencia.min}\n`;
                    } else if (referencia.sexo != null) {
                        referenciaTexto += `En sexo ${referencia.sexo}, Valor Max: ${referencia.max} - Valor Min: ${referencia.min}\n`;
                    } else {
                        referenciaTexto += `En ${referencia.edad} y sexo ${referencia.sexo}, Valor Max: ${referencia.max} - Valor Min: ${referencia.min}\n`;
                    }
                }

                table.rows.push([
                    determinacion.dato,
                    valor,
                    determinacion.medida,
                    referenciaTexto
                ]);
            }

            doc.table(table, {
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                    doc.font('Helvetica').fontSize(10);
                }
            });
        }

        doc.end();
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error del servidor');
    }
};
