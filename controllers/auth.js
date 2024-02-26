const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models').Usuario;
const Paciente= require('../models').Paciente;
const miClaveSecreta= 'mi clave super secreta para todo';


exports.login = async (req, res) => {
    const usuario= await Usuario.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!usuario) {
        res.render("./",{
            codigo: 'error',
            mensaje: 'Usuario o contraseña incorrectos'
        });
    }
    const passwordIsValid = await bcrypt.compareSync(
        req.body.password,
        usuario.password
    );
    if (!passwordIsValid) {
        res.render("./",{
            codigo: 'error',
            mensaje: 'Usuario o contraseña incorrectos'
        });
    }
    const token = jwt.sign({ user: usuario.email }, miClaveSecreta, {
        expiresIn: 86400 // 24 hours
    });
    req.session.usuario= usuario.email;
    req.session.rol= usuario.rolId;
    req.session.token= token;
    res.redirect(301, "/usuarios/");
};

exports.formLogin = async (req, res) => {
    res.render("./login", {
        title: 'Login'
    })
}

exports.loginPacientes= async (req, res)=> {
    const paciente= await Paciente.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!paciente) {
        res.render("/login",{
            codigo: 'error',
            mensaje: 'Usuario o contraseña incorrectos'
        });
    }
    const passwordIsValid = await bcrypt.compareSync(
        req.body.password,
        paciente.password
    );
    if (!passwordIsValid) {
        res.render("/login",{
            codigo: 'error',        
            mensaje: 'Usuario o contraseña incorrectos'
        });
    }
    const token = jwt.sign({ user: paciente.email }, miClaveSecreta, {
        expiresIn: 86400 // 24 hours
    });
    req.session.usuario= paciente.email;
    req.session.rol= 4;
    req.session.token= token;
    res.redirect(301, "/pacientes/perfil");
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.render("./",{
        codigo:'success',
        mensaje:"Sesion terminada",
    });
}
