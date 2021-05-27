'use strict'

const Hotel = require('../modelos/hotel.modelo');

function AgregarHotel(req, res) {
    var params = req.body;
    var hotelModel = new Hotel();
    if (req.usuario.rol === 'AdminApp') {
        if (params.nombre && params.direccion && params.telefono && params.descripcion && params.idAdministrador) {
            hotelModel.nombre = params.nombre;
            hotelModel.direccion = params.direccion;
            hotelModel.telefono = params.telefono;
            hotelModel.descripcion = params.descripcion;
            hotelModel.idAdministrador = params.idAdministrador;
            hotelModel.save((err, hotelGuardado) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion de Hotel' })
                if (!hotelGuardado) return res.status(500).send({ mensaje: 'error al guardar el hotel' })
                return res.status(200).send(hotelGuardado)
            })
        } else {
            res.status(500).send({ mensaje: 'Rellene los datos necesarios para completar el formulario' })
        }
    } else {
        res.status(500).send({ mensaje: 'no tiene los permisos necesarios' })
    }

}

function obtenerHotel(req, res) {
    Hotel.find().populate('idAdministrador', 'nombre usuario').exec((err, hotelEncontrado) => {
        console.log(err);
        if (err) res.status(500).send({ mensaje: 'error en la peticion' })
        if (!hotelEncontrado) return res.status(500).send({ mensaje: 'error al obtener los hoteles' })
        return res.status(200).send({ hotelEncontrado });
    })
}

function agregarHabitacion(req, res) {
    var hotelId = req.params.hotelId;
    var params = req.body;
    if (req.usuario.rol === 'AdminApp') {
        Hotel.findByIdAndUpdate(hotelId, { $push: { habitaciones: { numero: params.numero, camas: params.camas, estado: params.estado, precio: params.precio } } },
            { new: true, useFindAndModify: false }, (err, habitacionAgregada) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!habitacionAgregada) return res.status(500).send({ mensaje: 'error al guardar la habitacion' })
                return res.status(200).send({ habitacionAgregada })
            })
    } else {
        return res.status(500).send({ mensaje: 'no posee los permisos necesarios' })
    }
}

function editarHabitacion(req, res) {
    var hotelId = req.body.hotelId;
    var habitacionId = req.body.idHabitacion;
    var params = req.body;
    Hotel.findByIdAndUpdate({ _id: hotelId, "habitaciones._id": habitacionId }, { "habitaciones.$.numero": params.numero, "habitaciones.$.camas": params.camas, "habitaciones.$.estado": params.estado, "habitaciones.$.precio": params.precio }
        , { new: true, useFindAndModify: false }, (err, habitacionEditada) => {
            if (err) return res, status(500).send({ mensaje: 'erro en la peticion' })
            if (!habitacionEditada) return res.status(500).send({ mensaje: 'no se a podido editar la habitacion' })
            return res.status(200).send({ habitacionEditada })
        })
}

function editarHotel(req, res) {
    var idHotel = req.params.idHotel;
    var params = req.body;
    if (req.usuario.rol === "AdminApp") {
        Hotel.findByIdAndUpdate(idHotel, params, { new: true, useFindAndModify: false }, (err, hotelEditado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
            if (!hotelEditado) return res.status(500).send({ mensaje: 'no se pudo actualizar el hotel' })
            return res.status(200).send({ hotelEditado })
        })
    }
}

function eliminarHotel(req, res) {
    var idHotel = req.params.idHotel;
    if (req.usuario.rol === "Clinete") return res.status(500).send({ mensaje: 'no posee los permisos necesarios' })
    if (req.usuario.rol === "AdminApp") {
        Hotel.findByIdAndDelete(idHotel, (err, hotelEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
            if (!hotelEliminado) return res.status(500).send({ mensaje: 'no se pudo actualizar el hotel' })
            return res.status(200).send({ hotelEliminado })
        })
    }
}


function buscarHotel(req, res) {
    var nombreHotel = req.body.nombreHotel;
    Hotel.findOne({ nombre: nombreHotel }, (err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!hotelEncontrado) return res.status(500).send({ mensaje: 'hotel no encontrado' })
        return res.status(200).send({ hotelesEncontrados })
    })
}

function buscarHotelId(req, res) {
    var IdHotel = req.params.IdHotel;
    if (req.usuario.rol === "cliente") return res.status(500).send({ mensaje: "no tienes los permisos necesarios" })
    Hotel.findById(IdHotel, (err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!hotelEncontrado) return res.status(500).send({ mensaje: 'hotel no encontrado' })
        return res.status(200).send({ hotelEncontrado })

    })
}

function obtenerHoteles(req, res) {
    Hotel.find((err, hotelesEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!hotelesEncontrados) return res.status(500).send({ mensaje: 'error en la consulta de Hoteles' })
        return res.status(200).send({ hotelesEncontrados })
    })
}

function obtenerHabitacion(req, res) {
    var idHotel = req.params.idHotel;
    Hotel.findById(idHotel ,(err, habitacionEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de habitacion' });
        if (!habitacionEncontrada) return res.status(500).send({ mensaje: 'Error al obtener la habitacion' });
        return res.status(200).send({ hab: habitacionEncontrada.habitaciones })
    })
}

module.exports = {
    AgregarHotel,
    obtenerHotel,
    agregarHabitacion,
    editarHabitacion,
    buscarHotel,
    obtenerHoteles,
    editarHotel,
    buscarHotelId,
    eliminarHotel,
    obtenerHabitacion

}
