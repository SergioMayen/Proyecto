'use strict'
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const RegistrarAdminApp = require('./src/controladores/usuario.controlador');
const usuarioRuta = require('./src/routes/usuario.rutas');
const hotelRuta = require('./src/routes/hotel.rutas')
const reservacionRuta = require('./src/routes/reservacion.rutas')
const TipoEventoRuta = require('./src/routes/tipoEvento.rutas')
const eventoRuta = require('./src/routes/evento.ruta')
const servicioRuta = require('./src/routes/servicio.rutas')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors());

RegistrarAdminApp.registroAdminApp();

app.use('/api',usuarioRuta);
app.use('/api',hotelRuta);
app.use('/api',reservacionRuta);
app.use('/api', TipoEventoRuta);
app.use('/api',eventoRuta);
app.use('/api',servicioRuta);

module.exports = app;