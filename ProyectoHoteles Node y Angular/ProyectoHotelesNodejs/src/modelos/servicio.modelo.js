'use strict'

const moongose = require('mongoose')
var Schema = moongose.Schema;

var servicioSchema = Schema({
    nombre: String,
    descripcion: String,
    precio: String,
    idHotel: {type: Schema.Types.ObjectId, ref:'hotel'}
})

module.exports = moongose.model('servicio', servicioSchema)