'use strict'

const moongose = require('mongoose')
const Schema = moongose.Schema;

var facturaSchema = Schema({
    idUsario: {type: Schema.Types.ObjectId, ref:'usuario'},
    idHotel: {type: Schema.Types.ObjectId, ref:'hotel'},
    idHabitacion: {type: Schema.Types.ObjectId, ref:'habitacion'},
    idServicio: {type: Schema.Types.ObjectId, ref:'servicio'},
    total: Number
})

module.exports = moongose.model('factura',facturaSchema)