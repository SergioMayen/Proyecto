'use strict'

const Reservacion = require('../modelos/reservacion.modelo')

function agregarReservacion(req, res){
    var reservacionModel = new Reservacion();
    var params = req.body; 
    if(params.idAdministrador && params.fechaLlegada && params.fechaSalida && params.idServicio && params.idHabitacion && params.idHotel){
        reservacionModel.idAdministrador = params.idAdministrador;
        console.log(params)

        if (fechaLlegada.getTime() > reservationFound[i].fechaLlegada.getTime() &&  fechaLlegada.getTime() > reservationFound[i].fechaSalida.getTime() ||
        fechaLlegada.getTime() < reservationFound[i].fechaLlegada.getTime() && fechaSalida.getTime() < reservationFound[i].fechaLlegada.getTime()) {
            reservacionModel.fechaLlegada = params.fechaLlegada;
            reservacionModel.fechaSalida = params.fechaSalida; 
            reservacionModel.idServicio = params.idServicio;
            reservacionModel.idHabitacion = params.idHabitacion;
            reservacionModel.idHotel = params.idHotel;
            reservacionModel.save((err, reservacionGuardada)=>{
                if(err) return res.status(500).send({mensaje: 'error en la peticion'})
                if(!reservacionGuardada) return res.status(500).send({mensaje: 'no se guardo la reservacion'})
                console.log(params)

                return res.status(200).send({reservacionGuardada})
                
            }) 
        }
    
            
    }
}





module.exports = {
    agregarReservacion
}