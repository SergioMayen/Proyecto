'use strict'
const TipoEvento = require('../modelos/tipoEvento.modelo');
const { param } = require('../routes/evento.ruta');

function agregarTipoEvento(req, res){
    var params = req.body;
    var tipoEventoModel = new TipoEvento();
    if(params.nombre){
        tipoEventoModel.nombre = params.nombre;
        tipoEventoModel.save((err, tipoEventoGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'error en la peticion'})
            if(!tipoEventoGuardado) return res.status(500).send({mensaje: 'no se pudo guardar el tipo de evento'})
            return res.status(200).send(tipoEventoGuardado)
        })
    }
}

module.exports = {
    agregarTipoEvento
}