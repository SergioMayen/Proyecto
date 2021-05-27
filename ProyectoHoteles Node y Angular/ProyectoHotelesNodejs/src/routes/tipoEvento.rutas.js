'use strict'

const express = require('express')
const tipoEventoControlador = require('../controladores/tipoEvento.controlador')
const md_autentification = require('../middlewares/usuario.authenticated')

var api = express.Router();

api.post('/agregarTipoEvento', tipoEventoControlador.agregarTipoEvento)

module.exports = api;
