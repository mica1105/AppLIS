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
                const error = new Error('No hay token. Por favor inicia sesión de nuevo.');
                error.status = 401; // Código de estado HTTP para "Forbidden"
                next(error);
            } else{
                req.user = user;
                next();
            }
        });
    } else {
        const err = new Error('No hay token. Por favor inicia sesión de nuevo.');
        err.status = 401; // Código de estado HTTP para "Forbidden"
        next(err);
    }
};

exports.esAdmin= async (req, res, next) => {
    if(req.session.usuario && req.session.token && req.session.rol === 1){
            next();
    }else{
        const err = new Error('Acceso denegado, el usuario no tiene permiso de acceso');
        err.status = 403; // Código de estado HTTP para "Forbidden"
        next(err);
    } 
}

exports.esTecnico= async (req, res, next) => {
    if(req.session.usuario && req.session.token && req.session.rol === 2){
            next();
    }else{
        const err = new Error('Acceso denegado, el usuario no tiene permiso de acceso');
        err.status = 403; // Código de estado HTTP para "Forbidden"
        next(err);
    } 
}

exports.esBioquico= async (req, res, next) => {
    if(req.session.usuario && req.session.token && req.session.rol === 3){
            next();
    }else{
        const err = new Error('Acceso denegado, el usuario no tiene permiso de acceso');
        err.status = 403; // Código de estado HTTP para "Forbidden"
        next(err);
    } 
}

exports.esTecOBioq= async (req, res, next) => {
    if(req.session.usuario && req.session.token && (req.session.rol === 2 || req.session.rol === 3)){
            next();
    }else{
        const err = new Error('Acceso denegado, el usuario no tiene permiso de acceso');
        err.status = 403; // Código de estado HTTP para "Forbidden"
        next(err);
    } 
}

