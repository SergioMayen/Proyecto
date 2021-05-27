'use strict'

const moongose = require('mongoose')
const Schema = moongose.Schema;

var tipoEventoSchema = Schema({
    nombre: String
})

module.exports = moongose.model('tipoEvento', tipoEventoSchema)