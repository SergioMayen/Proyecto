'use strict'

const express = require('express')
const servicioControlador = require('../controladores/servicio.controlador')
const md_autentification = require('../middlewares/usuario.authenticated')

var api = express.Router();

api.post('/agregarServicio', servicioControlador.agregarServicio);
api.put('/editarServicio', servicioControlador.editarServicio);
api.get('/serviciosHotel/:idHotel',md_autentification.ensureAuth, servicioControlador.serviciosHotel)

module.exports = api;