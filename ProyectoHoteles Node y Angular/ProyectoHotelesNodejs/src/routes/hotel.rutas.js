'use strict'
const express = require('express');
const hotelControlador = require('../controladores/hotel.controlador')
const md_autentification = require('../middlewares/usuario.authenticated')
var api = express.Router();

api.post('/AgregarHotel',md_autentification.ensureAuth, hotelControlador.AgregarHotel);
api.get('/obtenerHotel', hotelControlador.obtenerHotel);
api.put('/agregarHabitacion/:hotelId',md_autentification.ensureAuth, hotelControlador.agregarHabitacion);
api.put('/editarHabitacion', hotelControlador.editarHabitacion);
api.get('/buscarHotel/:nombreHotel', hotelControlador.buscarHotel);
api.get('/obtenerHoteles', hotelControlador.obtenerHoteles);
api.put('/editarHotel/:idHotel',md_autentification.ensureAuth,hotelControlador.editarHotel);
api.get('/buscarHotelId/:IdHotel',md_autentification.ensureAuth,hotelControlador.buscarHotelId);
api.delete('/eliminarHotel/:idHotel',md_autentification.ensureAuth, hotelControlador.eliminarHotel);
api.get('/obtenerHabitacion/:idHotel',md_autentification.ensureAuth, hotelControlador.obtenerHabitacion)

module.exports = api;