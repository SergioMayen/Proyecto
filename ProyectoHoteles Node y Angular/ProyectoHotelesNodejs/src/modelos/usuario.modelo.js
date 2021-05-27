'use strict'

const moongose = require('mongoose')
var Schema = moongose.Schema;

var usuarioSchema = Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    password: String,
    rol: String,
    imagen: String
})

module.exports = moongose.model('usuario', usuarioSchema);