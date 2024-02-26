const jwt= require('jsonwebtoken');
const miSecretKey= 'mi clave super secreta para todo';
const Usuario= require('../models').Usuario;
const Rol = require('../models').Rol;

exports.verificaToken= async (req, res, next) => {
    if(req.user){
        next();
    }
    const token= req.session.token;
    if(token){
        jwt.verify(token, miSecretKey, async (err, user) => {
            if (err) {
                res.render("./",{
                    mensaje: 'Token inválido. Por favor inicia sesión de nuevo.',
                });
            } else{
                req.user = user;
                next();
            }
        });
    } else {
        res.render("./",{
            mensaje: 'No hay token. Por favor inicia sesión de nuevo.',
        });
    }
};

exports.esAdmin= async (req, res, next) => {
    console.log('Usuario: '+req.session.usuario);
    console.log('Rol: '+req.session.rol);
    console.log('Token: '+ req.session.token);
    if(req.session.usuario && req.session.token && req.session.rol === 1){
            next();
    }else{
        res.render("./",{
        mensaje:"Acceso denegado, el usuario no tiene permiso de acceso",
        });
    } 
}

