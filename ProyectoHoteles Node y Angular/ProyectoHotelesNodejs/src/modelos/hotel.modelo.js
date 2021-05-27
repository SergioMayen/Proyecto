'use strict'
const moongose = require('mongoose')
const Schema = moongose.Schema;

var hotelSchema = Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    descripcion: String,
    popularidad: String,
    habitaciones: [{
        numero: Number,
        camas: Number,
        estado: Boolean,
        precio: Number
    }],
    idAdministrador: {type: Schema.Types.ObjectId, ref:'usuario'}
})

module.exports = moongose.model('hotel', hotelSchema);