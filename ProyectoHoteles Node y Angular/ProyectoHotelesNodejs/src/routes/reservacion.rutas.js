'use strict'

const express = require('express')
const reservacionControlador = require('../controladores/reservaciones.controlador')
const md_autentification = require('../middlewares/usuario.authenticated')

var api = express.Router();

api.post('/agregarReservacion',md_autentification.ensureAuth, reservacionControlador.agregarReservacion)

module.exports = api;