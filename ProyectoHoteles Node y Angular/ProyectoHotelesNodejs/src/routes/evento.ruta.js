'use trict'
const express = require('express')
const eventoControlado = require('../controladores/evento.controlador')
const md_autentification = require('../middlewares/usuario.authenticated')

var api = express.Router();

api.post('/agregarEvento', eventoControlado.agregarEvento);
api.put('/editarEvento', eventoControlado.editarEvento);
api.get('/eventosHotel/:idHotel',md_autentification.ensureAuth, eventoControlado.eventosHotel)

module.exports = api;
