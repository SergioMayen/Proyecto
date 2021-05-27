'use strict'

const moongose = require('mongoose')
const Schema = moongose.Schema;

var resercionSchema = Schema({
    idUsuario: {type: Schema.Types.ObjectId, ref:'usuario'},
    fechaLlegada: Date,
    fechaSalida: Date,
    idServicio: [{type: Schema.Types.ObjectId, ref:'servicio'}],
    idHabitacion: {type: Schema.Types.ObjectId, ref:'hotel'},
    idHotel: {type: Schema.Types.ObjectId, ref:'hotel'}
})

module.exports = moongose.model('reservacion', resercionSchema)