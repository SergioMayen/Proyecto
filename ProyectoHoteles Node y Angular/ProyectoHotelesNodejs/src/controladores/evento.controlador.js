'use strict'
const eventoModelo = require('../modelos/evento.modelo');
const Evento = require('../modelos/evento.modelo');

function agregarEvento(req, res){
    var params = req.body;
    var eventoModel = new Evento();
    if(req.params.rol === 'AdminApp') return res.status(500).send({mensaje: 'no tiene los permisos necesarios'})
    if(params.nombre && params.descripcion && params.hora && 
        params.fecha && params.idTipoEvento && params.idHotel){
        eventoModel.nombre = params.nombre;
        eventoModel.descripcion = params.descripcion;
        eventoModel.hora = params.hora;
        eventoModel.fecha = params.fecha;
        eventoModel.idTipoEvento = params.idTipoEvento;
        eventoModel.idHotel = params.idHotel;
        eventoModel.save((err, eventoGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'error en la peticion de evento'})
            if(!eventoGuardado) return res.status(500).send({mensaje: 'error al guardar el evento'})
            return res.status(200).send({eventoGuardado})
        })
    }else{
        res.status(500).send({mensaje: 'Debe completar todos los campos'})
    }
}

function editarEvento(req, res){
    var params = req.body;
    if (req.usuario.rol === 'AdminHotel') {
        Evento.findByIdAndUpdate(req.evento.sub, params,{new: true, useFindAndModify: false},(err, eventoEditado)=>{
            if(err) return res.status(500).send({mensaje: 'error en la peticion'})
            if(!eventoEditado) return res.status(500).send({mensaje: 'no se a podido editar el evento'})
            return res.status(200).send({eventoEditado})
        })
    }
}

function eventosHotel(req, res){
    var idHotelVar = req.params.idHotel;  
    Evento.find({idHotel: idHotelVar}, (err, eventosEncontrados)=>{
        if(err) return res.status(500).send({mensaje:'error en la peticion'})
        if(!eventosEncontrados) return res.status(500).send({mensaje: 'Eventos no encontrado'})
        return res.status(200).send({eventosEncontrados})
    })

}

module.exports = {
    agregarEvento,
    editarEvento,
    eventosHotel
}