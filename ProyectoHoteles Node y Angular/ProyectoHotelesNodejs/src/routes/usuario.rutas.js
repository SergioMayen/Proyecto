'use strict'
const express = require('express')
const usuarioControlador = require('../controladores/usuario.controlador')
const md_autentification = require('../middlewares/usuario.authenticated')

var api = express.Router();

api.post('/RegistroUser', usuarioControlador.RegistroUser);
api.post('/RegistroAdminHotel',usuarioControlador.RegistroAdminHotel)
api.post('/login',usuarioControlador.login);
api.put('/editarUsuario',md_autentification.ensureAuth, usuarioControlador.editarUsuario);
api.delete('/eliminarUsuario',md_autentification.ensureAuth, usuarioControlador.eliminarUsuario);
api.get('/obtenerUsuarios',md_autentification.ensureAuth, usuarioControlador.obtenerUsuarios);
api.get('/obtenerGerentes',md_autentification.ensureAuth, usuarioControlador.obtenerGerentes);
module.exports = api;