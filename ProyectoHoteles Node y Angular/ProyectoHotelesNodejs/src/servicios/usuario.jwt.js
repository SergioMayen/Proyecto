'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'claveAdmin'

exports.createToken = function(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        usuario: usuario.usuario,
        contraseña: usuario.contraseña,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().day(10, 'day').unix()

    }
    return jwt.encode(payload, secret);
}