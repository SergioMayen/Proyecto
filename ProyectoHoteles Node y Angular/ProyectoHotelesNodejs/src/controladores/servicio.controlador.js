'use strict'

const Servicio = require('../modelos/servicio.modelo');

 function agregarServicio(req, res){
    var params = req.body;
    var servicioModel= new Servicio();
    if (params.nombre && params.descripcion && params.precio && params.idHotel ){
        servicioModel.nombre = params.nombre;
        servicioModel.descripcion = params.descripcion;
        servicioModel.precio = params.precio;
        servicioModel.idHotel = params.idHotel;
        servicioModel.save((err, servicioGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'error en la peticion de servicio'})
            if(!servicioGuardado) res.status(500).send({mensaje: 'error al guardar el servicio'})
            return res.status(200).send({servicioGuardado})
        })
    }else{
        res.status(500).send({mensaje: 'Debe completar todos los campos'})
    }
}

function editarServicio(req, res){
    var params = req.body;
    if(req.usuario.rol === 'AdminHotel'){
        Servicio.findByIdAndUpdate(req.servicio.sub, params,{new: true, useFindAndModify: false}, (err, servicioActualizado)=>{
            if(err) return res.status(500).send({mensaje: 'error en la peticion'})
            if(!servicioActualizado) return res.status(500).send({mensaje: 'no se a podido actualizar el servicio'})
            return res.status(200).send({servicioActualizado})
        })
    }
}

function serviciosHotel(req,res){
    var idHotelVar = req.params.idHotel;  
    Servicio.find({idHotel: idHotelVar}, (err, serviciosEncontrados)=>{
        if(err) return res.status(500).send({mensaje:'error en la peticion'})
        if(!serviciosEncontrados) return res.status(500).send({mensaje: 'Sercivio no encontrado'})
        return res.status(200).send({serviciosEncontrados})
    })}

module.exports = {
    agregarServicio,
    editarServicio,
    serviciosHotel
}