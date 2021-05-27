'use strict'
const bcrypt = require('bcrypt-nodejs')
const Usuario = require('../modelos/usuario.modelo')
const usuarioModel = require('../modelos/usuario.modelo')
const jwt = require('../servicios/usuario.jwt')

function registroAdminApp(req, res) {
    var usuarioModel = new Usuario();
    var usuario = "AdminApp";
    var rol = "AdminApp";
    var password = "12345"
    usuarioModel.usuario = usuario;
    usuarioModel.rol = rol;
    usuarioModel.password = password;
    Usuario.find({
        $or: [
            { usuario: usuarioModel.usuario },
        ]
    }).exec((err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "error en la peticion del usuario" })
        if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
            return console.log('Ya hay un administrador')
        } else
            bcrypt.hash(password, null, null, (err, contraseñaEncriptada) => {
                usuarioModel.password = contraseñaEncriptada;
                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) return console.log('error al guardar al administrador')
                    if (usuarioGuardado) {
                        console.log(usuarioGuardado)
                    } else {
                        console.log('no se ha podido registrar al administrador')
                    }
                })
            })
    })
}

function RegistroUser(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    console.log(params)
    if (params.nombre && params.apellido && params.usuario && params.password) {
        usuarioModel.nombre = params.nombre;
        usuarioModel.apellido = params.apellido;
        usuarioModel.usuario = params.usuario;
        usuarioModel.password = params.password;
        usuarioModel.rol = 'cliente';
        usuarioModel.imagen = null;
        Usuario.find({
            $or: [
                { usuario: usuarioModel.usuario },
                { password: usuarioModel.password }
            ]
        }).exec((err, usuarioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "error en la peticion" });
            if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: "el usuario ya existe" })
            } else {
                bcrypt.hash(params.password, null, null, (err, contraseñaEncriptada) => {
                    usuarioModel.password = contraseñaEncriptada;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (usuarioGuardado) {
                            res.status(200).send(usuarioGuardado)
                        } else {
                            res.status(404).send({ mensaje: 'no se a podido registrar el usuario' })
                        }
                    })
                })
            }
        })
    }
}

function RegistroAdminHotel(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    if (params.nombre && params.apellido && params.usuario && params.password) {
        usuarioModel.nombre = params.nombre;
        usuarioModel.apellido = params.apellido;
        usuarioModel.usuario = params.usuario;
        usuarioModel.password = params.password;
        usuarioModel.rol = 'AdminHotel';
        usuarioModel.imagen = null;
        Usuario.find({
            $or: [
                { usuario: usuarioModel.usuario },
                { password: usuarioModel.password }
            ]
        }).exec((err, usuarioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "error en la peticion" });
            if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: "el usuario ya existe" })
            } else {
                bcrypt.hash(params.password, null, null, (err, contraseñaEncriptada) => {
                    usuarioModel.password = contraseñaEncriptada;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (usuarioGuardado) {
                            res.status(200).send(usuarioGuardado)
                        } else {
                            res.status(404).send({ mensaje: 'no se a podido registrar el usuario' })
                        }
                    })
                })
            }
        })
    }
}

function login(req, res) {
    var params = req.body;
    Usuario.findOne({ usuario: params.usuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, contraseñaCorrecta) => {
                if (contraseñaCorrecta) {
                    if (params.obtenerToken === 'true') {
                        return res.status(200).send({ token: jwt.createToken(usuarioEncontrado) })
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send(usuarioEncontrado)
                    }
                } else {
                    return res.status(400).status({ mensaje: 'el usuario no se podido identificar' })
                }
            })
        } else {
            return res.status(404).send({ mensaje: 'el usuario no se a podido encontrar' })
        }
    })
}

function editarUsuario(req, res) {
    var params = req.body;
    delete params.password;
    if (req.usuario.rol === 'cliente', 'AdminHotel') {
        delete params.rol;
        Usuario.findByIdAndUpdate(req.usuario.sub, params, { new: true, useFindAndModify: false }, (err, usuarioActualizado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la petición' });
            if (!usuarioActualizado) return res.status(500).send({ mensaje: 'nos se podido actualizar el usuario' })
            return res.status(200).send({ usuarioActualizado })
        })
    } else {
        return res.status(500).send({ mensaje: 'no tiene los permisos para editar al usuario' })
    }
}

function eliminarUsuario(req, res) {
    if (req.usuario.rol === 'cliente', 'AdminHotel') {
        Usuario.findByIdAndDelete(req.usuario.sub, (err, usuarioEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la petición 1' });
            if (!usuarioEliminado) return res.status(500).send({ mensaje: 'no se ha podido eliminar el usuario' });
            return res.status(200).send({ usuarioEliminado });
        })
    } else {
        return res.status(500).send({ mensaje: 'El administrador no puede realizar esta accion' })
    }
}

function obtenerUsuarios(req, res) {
    if(req.usuario.rol === "AdminApp")
    Usuario.find({ rol: 'cliente' }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!usuarioEncontrado) return res.status((500)).send({ mensaje: 'usuarios no encontrados' })
        return res.status(200).send({ usuarioEncontrado })
    })
    else{
      return res.status(500).send({mensaje: 'no puede realizar esta accion'})
    }
}

function obtenerGerentes(req, res) {
    if(req.usuario.rol === "AdminApp")
    Usuario.find({ rol: 'AdminHotel' }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!usuarioEncontrado) return res.status((500)).send({ mensaje: 'usuarios no encontrados' })
        return res.status(200).send({ usuarioEncontrado })
    })
    else{
      return res.status(500).send({mensaje: 'no puede realizar esta accion'})
    }
}



module.exports = {
    registroAdminApp,
    RegistroUser,
    RegistroAdminHotel,
    login,
    editarUsuario,
    eliminarUsuario,
    obtenerUsuarios,
    obtenerGerentes
}