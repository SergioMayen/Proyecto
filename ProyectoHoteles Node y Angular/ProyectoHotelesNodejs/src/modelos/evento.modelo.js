'use strict'

const moongose = require('mongoose')
const Schema = moongose.Schema;

var eventoSchema = Schema({
    nombre: String,
    descripcion: String,
    hora: Date,
    fecha: Date,
    idTipoEvento: {type: Schema.Types.ObjectId, ref:'tipoEvento'},
    idHotel: {type: Schema.Types.ObjectId , ref: 'hotel'}
})

module.exports = moongose.model('evento', eventoSchema)